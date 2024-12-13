const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./games.db', (err) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(
            `CREATE TABLE IF NOT EXISTS games (
                id TEXT PRIMARY KEY,
                name TEXT,
                difficulty TEXT,
                gameState TEXT,
                board TEXT,
                createdAt TEXT,
                updatedAt TEXT
            )`,
            (err) => {
                if (err) {
                    console.error('Error:', err.message);
                }
            }
        );
    }
});

module.exports = db;
