const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "finance.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("✅ Connected to SQLite");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        otp TEXT,
        otpExpiry INTEGER
    )
    `);

     db.run(`
        CREATE TABLE IF NOT EXISTS expenses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        expenseDate TEXT NOT NULL
        )
`   );
});

module.exports = db;