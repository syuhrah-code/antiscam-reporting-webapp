const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Error opening database", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEST NOT NULL,
    description TEXT NOT NULL,
    scam_type TEXT NOT NULL,
    contact_info TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP)` );
module.exports = db;