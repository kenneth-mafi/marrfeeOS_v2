const { openDb } = require("../db");
const {
  DEFAULT_ROUNDS,
  makeSalt,
  hashSecret,
  verifySecret,
  hashDeterministic,
} = require("../crypto/hash");

const DB_PATH = process.env.DB_PATH;

// sqlite helpers
function run(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this); // contains lastID changes
    });
  });
}

function get(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function mapConstraintToField(errMsg) {
  const msg = String(errMsg || "");

  if (msg.includes("users.personNummerHash")) return "personNummer";
  if (msg.includes("users.userID")) return "userID";

  return null;
}

async function register(newUserData) {
  const db = openDb(DB_PATH);

  // Hash only required fields
  const emailHash = hashDeterministic(newUserData.email);
  const personNummerHash = hashDeterministic(newUserData.personNummer);

  // password
  const passwordSalt = makeSalt();
  const passwordRounds = DEFAULT_ROUNDS;
  const passwordHashValue = hashSecret(
    newUserData.password,
    passwordSalt,
    passwordRounds
  );

  const sql = `
    INSERT INTO users (
      userID, firstName, lastName, dateOfBirth, phoneNumber,
      emailHash, personNummerHash,
      passwordHash, passwordSalt, passwordRounds
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await run(db, sql, [
      newUserData.userID,
      newUserData.firstName,
      newUserData.lastName,
      newUserData.dateOfBirth,
      newUserData.phoneNumber,

      emailHash,
      personNummerHash,

      passwordHashValue,
      passwordSalt,
      passwordRounds,

    ]);

    return { success: true, userData: { userID: newUserData.userID, firstName: newUserData.firstName, lastName: newUserData.lastName } };
  } catch (err) { 
    //console.error("REGISTER INSERT ERROR:", err.message); 

    const field = mapConstraintToField(err.message);
    if (field) return { success: false, field };

    return false;
  } finally {
    db.close();
  }
}


/** 
 * Login with email + password.
 * Returns false if not valid.
 * Returns true with userID, firstName, LastName if valid.
*/
async function loginEmail(loginData) {
  const db = openDb(DB_PATH);

  try {
    const emailHash = hashDeterministic(loginData.email);

    const user = await get(
      db,
      `
      SELECT firstName, lastName, passwordHash, passwordSalt, passwordRounds
      FROM users
      WHERE emailHash = ?
      `,
      [emailHash]
    );

    if (!user) return false;

    const ok = verifySecret(
      loginData.password,
      user.passwordSalt,
      user.passwordRounds,
      user.passwordHash
    );

    if (!ok) return false;

    return { success: true, userData: { userID: user.userID, firstName: user.firstName, lastName: user.lastName } };
  } finally {
    db.close();
  }
}

async function setPin(data) {
  const db = openDb(DB_PATH);
  
  try {
    const user = await get(
      db,
      `SELECT pinHash FROM users WHERE userID = ?`,
      [data.userID]
    );

    if (!user) return false;

    // return false if theres already a pin for the user
    if(user.pinHash) return false;

    const pinSalt = makeSalt();
    const pinRounds = DEFAULT_ROUNDS;
    const pinHashValue = hashSecret(data.newPin, pinSalt, pinRounds);

      await run(
      db,
      `UPDATE users
       SET pinHash = ?, pinSalt = ?, pinRounds = ?
       WHERE userID = ?`,
      [pinHashValue, pinSalt, pinRounds, data.userID]
    );

    return { success: true };
  } catch (err) {
    
    console.error("ERROR SETTING PIN:", err.message);
    return false;
  } finally {
    db.close();
  }
}

async function loginPin(data) {
  const db = openDb(DB_PATH);

  try {
    const user = await get(
      db,
      `SELECT firstName, lastName, pinHash, pinSalt, pinRounds
       FROM users
       WHERE userID = ?`,
      [data.userID]
    );

    if (!user) return false;
    if (!user.pinHash || !user.pinSalt || !user.pinRounds) return false;

    const ok = verifySecret(
      data.pinCode,
      user.pinSalt,
      user.pinRounds,
      user.pinHash
    );

    if (!ok) return false;

    return { success: true, userData: { userID: user.userID, firstName: user.firstName, lastName: user.lastName }};
  } finally {
    db.close();
  }
}



module.exports = { register, loginEmail, setPin, loginPin };
