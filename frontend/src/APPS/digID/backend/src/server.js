const path = require("path");

const backendRoot = path.resolve(__dirname, "..");
require("dotenv").config({ path: path.join(backendRoot, ".env") });

process.env.DB_PATH = path.resolve(
  backendRoot,
  process.env.DB_PATH || "digid.sqlite"
);

const app = require("./app");
const { initDb } = require("./db/init");

const PORT = process.env.PORT || 3000;

(async () => {
  await initDb(); // create tables if not existing

  app.listen(PORT, () => {
    console.log(`DigID backend running on http://localhost:${PORT}`);
  });
})();
