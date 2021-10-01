const sqlite3 = require("sqlite3").verbose();

const init = () => {
    const db = new sqlite3.Database('../.database.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });

    const query = `CREATE TABLE IF NOT EXISTS data (
                   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                   username TEXT NOT NULL,
                   entry_id INTEGER NOT NULL,
                   date_created TEXT NOT NULL,
                   time_created TEXT NOT NULL,
                   date_modified TEXT,
                   time_modified TEXT,
                   favorites INTEGER,
                   body TEXT
                   );`;

    db.get(query);

    db.close();
};

const addEntry = (entry) => {

};

module.exports.init = init;