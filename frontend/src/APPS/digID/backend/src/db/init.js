const fs = require("fs");
const path = require("path");
const { openDb } = require("./index");

const DB_PATH = process.env.DB_PATH;

function run(db, sql){
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => (err ? reject(err) : resolve()));
    });
}

async function initDb() {
  const db = openDb(DB_PATH);
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  const statements = schema
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);

  try {
    for (const stmt of statements) {
      await run(db, stmt);
    }
  } finally {
    db.close();
  }
}

module.exports = { initDb };