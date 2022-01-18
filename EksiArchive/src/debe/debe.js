"use strict";

const requestPage = require("../user/user").requestPage;
const archiveEntry = require("../entry/entry").archiveEntry;
const getEntryIDsFromDebe = require("./formatDebe").getEntryIDsFromDebe;
const generalHelpers = require("../utils/generalHelpers");
const config = require("../../../config");

const getDebe = () => {
    // resolve array with entry ids
    return new Promise((resolve,reject)=>{
        requestPage('/debe').then(html => {
            resolve(getEntryIDsFromDebe(html));
        }, err=> {
            reject(err);
        });
    });
};

const archiveDebeEntries = (comment) => {
    return new Promise((resolve,reject)=>{
        console.time(generalHelpers.colorfulOutput('dunun en begenilen entryleri', 'green'));
        getDebe().then(async entryIdArray => {
            console.log(`debede '${entryIdArray.length}' tane entry var`);

            const batchEntryIds = generalHelpers.groupBy(entryIdArray, config.entry.threads);

            for (const key of Object.keys(batchEntryIds)) {
                const batchArchive = await Promise.all(batchEntryIds[key].map(entryID => {
                    return archiveEntry(entryID, comment).then(val => {
                        return val;
                    }, rej => {
                        return `'${entryID}' - ${rej}`;
                    });
                }));

                batchArchive.forEach(value => console.log(value));
            }

            console.timeEnd(generalHelpers.colorfulOutput('dunun en begenilen entryleri', 'green'));
            resolve('debedeki tum entryler bitti.');

        }, err => {
            reject(err);
        })
    });
}

module.exports.archiveDebeEntries = archiveDebeEntries;
