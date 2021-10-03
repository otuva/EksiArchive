const sqlite3 = require("sqlite3").verbose();

// testing purposes.
// if this is main double dot
// otherwise it's from main.js. so single dot
// change this to const dbFile
let dbFile;
if (require.main === module) {
    dbFile = '../database.db';
}
else {
    dbFile = './database.db';
}

const init = () => {
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            return console.error(err.message);
        }
        // console.log('Connected to the SQlite database.');
    });

    const query = `CREATE TABLE IF NOT EXISTS data (
                   id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                   entry_id INTEGER NOT NULL,
                   title TEXT NOT NULL,
                   author TEXT NOT NULL,
                   content TEXT NOT NULL,
                   date_created TEXT NOT NULL,
                   time_created TEXT NOT NULL,
                   date_modified TEXT,
                   time_modified TEXT,
                   favorite_count INTEGER NOT NULL,
                   in_eksi_seyler TEXT NOT NULL
                   );`;

    db.get(query);

    db.close();
};

const addEntry = (entry) => {
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            return console.error(err.message);
        }
        // console.log('Connected to the SQlite database.');
    });

    //                    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    //                    entry_id INTEGER NOT NULL,
    //                    title TEXT NOT NULL,
    //                    author TEXT NOT NULL,
    //                    content TEXT NOT NULL,
    //                    date_created TEXT NOT NULL,
    //                    time_created TEXT NOT NULL,
    //                    date_modified TEXT,
    //                    time_modified TEXT,
    //                    favorite_count INTEGER NOT NULL,
    //                    in_eksi_seyler TEXT NOT NULL

    let query;

    if (entry.dateModified != null && entry.timeModified == null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}','${entry.dateModified}',${entry.timeModified},${entry.favCount},'${entry.inEksiSeyler}');`
    }
    else if (entry.dateModified == null && entry.timeModified != null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}',${entry.dateModified},'${entry.timeModified}',${entry.favCount},'${entry.inEksiSeyler}');`
    }
    else if (entry.dateModified == null && entry.timeModified == null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}',${entry.dateModified},${entry.timeModified},${entry.favCount},'${entry.inEksiSeyler}');`
    }
    else if (entry.dateModified != null && entry.timeModified != null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}','${entry.dateModified}','${entry.timeModified}',${entry.favCount},'${entry.inEksiSeyler}');`
    }

    db.get(query);

    db.close()
};

module.exports.init = init;
module.exports.addEntry = addEntry;