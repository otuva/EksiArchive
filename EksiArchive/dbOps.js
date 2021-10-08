const sqlite3 = require("sqlite3").verbose();

// testing purposes.
// if this is main double dot
// otherwise it's from main.js. so single dot
// change this to const dbFile
let dbFile;
if (require.main === module) {
    dbFile = '../testDatabase.db';
}
else {
    dbFile = './testDatabase.db';
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

const returnAppropriateQueryString = (entry) => {
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
    return query;
};

const addMultipleEntries = (arr) => {
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });

    arr.forEach(entry => {
        const query = returnAppropriateQueryString(entry);
        db.get(query);
    });

    db.close()
};

const addEntry = (entry) => {
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });

    const query = returnAppropriateQueryString(entry);
    db.get(query);

    db.close()
};

const entryIdExists = (rawEntryID) => {
    // '\x1b[33m%s\x1b[0m'
    return new Promise((resolve, reject) => {
        // console.time(`\x1b[33m entry id '${rawEntryID}' \x1b[0m`);

        const entryID = parseInt(rawEntryID, 10);

        if (typeof entryID === 'number' && !isNaN(entryID)) {
            const db = new sqlite3.Database(dbFile, (err) => {
                if (err) {
                    reject(err.message);
                }
            });
            const query = `SELECT id FROM data WHERE entry_id=${entryID};`;

            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                if (rows[0]) {
                    resolve(true)
                }
                else {
                    resolve(false);
                }
            });

            db.close();
        }
        else {
            reject('entry id sayi olmali');
        }
        // console.timeEnd(`\x1b[33m entry id '${rawEntryID}' \x1b[0m`);
    });
};
// entryIdExists('4215').then(value => {
//     console.log(value);
// }, err=> {
//     console.error(err);
// });

module.exports.init = init;
module.exports.addEntry = addEntry;
module.exports.addMultipleEntries = addMultipleEntries;
module.exports.entryIdExists = entryIdExists;