const crypto = require("crypto");

const DEFAULT_ROUNDS = 120_000;
const KEYLEN = 32;      // 32 bytes = 256-bit
const DIGEST = "sha256";

function makeSalt(bytes = 16) {
  return crypto.randomBytes(bytes).toString("hex");
}

function hashSecret(password, salt, iters = DEFAULT_ROUNDS) {
  return crypto.pbkdf2Sync(password, salt, iters, KEYLEN, DIGEST).toString("hex");
}

function verifySecret(password, salt, iters, expectedHash) {
  const actual = hashSecret(password, salt, iters);

  const a = Buffer.from(actual, "hex");
  const b = Buffer.from(expectedHash, "hex");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

// deterministic <-- apparently thats what we call this
function hashDeterministic(input) {
  return crypto.createHash("sha256").update(String(input), "utf8").digest("hex");
}

module.exports = {
  DEFAULT_ROUNDS,
  makeSalt,
  hashSecret,
  verifySecret,
  hashDeterministic,
};
