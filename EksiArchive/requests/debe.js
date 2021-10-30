const requestPage = require("./user").requestPage;
const archiveEntry = require("./entry").archiveEntry;
const getEntryIDsFromDebe = require("../format/formatDebe").getEntryIDsFromDebe;
const utils = require("../utils/generalHelpers");
const config = require("../../config");

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

const archiveDebeEntries = () => {
    return new Promise((resolve,reject)=>{
        console.time(utils.colorfulOutput('dunun en begenilen entryleri', 'green'));
        getDebe().then(async entryIdArray => {
            console.log(`debede '${entryIdArray.length}' tane entry var`);

            const batchEntryIds = utils.groupBy(entryIdArray, config.entry.threads);

            for (const key of Object.keys(batchEntryIds)) {
                const batchArchive = await Promise.all(batchEntryIds[key].map(entryID => {
                    return archiveEntry(entryID).then(val => {
                        return val;
                    }, rej => {
                        return `'${entryID}' - ${rej}`;
                    });
                }));

                batchArchive.forEach(value => console.log(value));
            }

            console.timeEnd(utils.colorfulOutput('dunun en begenilen entryleri', 'green'));
            resolve('debedeki tum entryler bitti.');

        }, err => {
            reject(err);
        })
    });
}

module.exports.archiveDebeEntries = archiveDebeEntries;
