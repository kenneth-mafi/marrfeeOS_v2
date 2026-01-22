const sqlite3 = require("sqlite3").verbose();

function openDb(dbPath){
    return new sqlite3.Database(dbPath);
}

module.exports = {openDb};