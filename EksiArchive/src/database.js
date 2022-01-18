"use strict";

const sqlite3 = require("sqlite3").verbose();
const config = require("../../config");

// testing purposes.
// if this is main double dot
// otherwise it's from main.js. so single dot
// change this to const dbFile
let dbFile;
dbFile = config.databaseFilePath;

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
                   in_eksi_seyler TEXT NOT NULL,
                   comment TEXT NOT NULL
                   );`;

    db.get(query);

    db.close();
};

const returnAppropriateQueryString = (entry, comment) => {
    let query;
    if (entry.dateModified != null && entry.timeModified == null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler, comment)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}','${entry.dateModified}',${entry.timeModified},${entry.favCount},'${entry.inEksiSeyler}','${comment}');`
    }
    else if (entry.dateModified == null && entry.timeModified != null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler, comment)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}',${entry.dateModified},'${entry.timeModified}',${entry.favCount},'${entry.inEksiSeyler}','${comment}');`
    }
    else if (entry.dateModified == null && entry.timeModified == null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler, comment)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}',${entry.dateModified},${entry.timeModified},${entry.favCount},'${entry.inEksiSeyler}','${comment}');`
    }
    else if (entry.dateModified != null && entry.timeModified != null) {
        query = `INSERT INTO data (entry_id, title, author, content, date_created, time_created, date_modified, time_modified, favorite_count, in_eksi_seyler, comment)
                 VALUES(${entry.id},'${entry.title}','${entry.author}','${entry.content}','${entry.dateCreated}','${entry.timeCreated}','${entry.dateModified}','${entry.timeModified}',${entry.favCount},'${entry.inEksiSeyler}','${comment}');`
    }
    return query;
};

// --------------------------------------------------
// duplicate check
// --------------------------------------------------
const entryIdExists = (entryID, db) => {
    // instead of handling db in this function
    // expect db handle reference and manipulate that.
    // that'll avoid continuous handle creation
    return new Promise((resolve, reject) => {
        if (!isNaN(entryID)) {
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
        }
        else {
            reject('entry id sayi olmali');
        }
    });
};

const checkSingleEntryID = (entryID) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                reject(err.message);
            }
        });

        entryIdExists(entryID, db).then(state=>{
            resolve(state);
        }, err=> {
            reject(err);
        });

        db.close();
    });
};

const checkMultipleEntryIDs = (idArray, db) => {
    return new Promise(async (resolve, reject) => {
        const nonExistentEntryId = []
        for (let id of idArray) {
            await entryIdExists(id, db).then(state => {
                if (!state || config.entry.force) {
                    if (state) console.log(`'${id}' zaten arsivde ama "--force" secenegi kullanildi`);
                    nonExistentEntryId.push(id);
                }
            });
        }
        resolve(nonExistentEntryId);
    });
};




// --------------------------------------------------
// addition
// --------------------------------------------------
const addMultipleEntries = (arr, comment) => {
    return new Promise((resolve, reject) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const timeStr = `[${today.toUTCString()}]`;

        const db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                reject(err.message);
            }
        });

        const entryIDArray = arr.map(entry => entry.id);

        // const entryIDsWillBeAdded = checkMultipleEntryIDs(entryIDArray, db);
        checkMultipleEntryIDs(entryIDArray, db).then(entryIDsWillBeAdded => {
            arr.forEach(entry => {
                if (entryIDsWillBeAdded.includes(entry.id)) {
                    const query = returnAppropriateQueryString(entry, comment);
                    db.get(query);
                    console.log(`${timeStr} - '${entry.id}' arsive eklendi.`);
                }
                else console.log(`'${entry.id}' zaten arsivde.`);
            });
            resolve(`toplam ${entryIDsWillBeAdded.length} entry arsive eklendi`);
            db.close()
        });
    });
};

const addEntry = (entry, comment) => {
    return new Promise((resolve, reject)=> {
        const db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                reject(err.message);
            }
        });

        const query = returnAppropriateQueryString(entry, comment);
        db.get(query);

        resolve('ok. entry arsivlendi')
        db.close()
    });
};


module.exports.init = init;
module.exports.addEntry = addEntry;
module.exports.addMultipleEntries = addMultipleEntries;
module.exports.checkSingleEntryID = checkSingleEntryID;
