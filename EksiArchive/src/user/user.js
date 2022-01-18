"use strict";

const https = require('https');

const format = require("./formatUser");
const database = require("../database");
const utils = require("../utils/generalHelpers");
const config = require("../../../config");
const generalHelpers = require("../utils/generalHelpers");

const requestPage = (path) => {
    console.time(path);
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path,
            method: 'GET',
            headers: config.requestHeaders
        }

        const req = https.request(options, async res => {
            // reject bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                // console.log(res.headers);
                // if (res.statusCode === 429) {
                //     console.error('istekler eksisozluk limitine takildi. eger bu hatayi sik aliyorsaniz "--sleep <ms>" secenegi ile arsivlemeyi deneyin');
                //     console.error(`islem ${throttle*30/60} dakika sonra devam edecek`);
                //     await webHelpers.sleep(throttle*30000);
                //     throttle>=10 ? throttle=10 : throttle++;
                // }
                return reject(new Error(`statusCode=${res.statusCode}`));
            }

            let resBody = '';

            // get data
            res.on('data', d => {
                resBody += d;
            });

            // resolve on end
            res.on('end', () => {
                console.timeEnd(path);
                resolve(resBody);
            });
        });

        req.on('error', (err) => {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });

        req.end();
    });
};

const getEntryPage = (path) => {
    return new Promise(((resolve, reject) => {
        requestPage(path).then(html => {
            resolve(format.returnEntryObjectArray(html));
        }, err => {
            reject(err);
        });
    }));
};

const archiveInitialPage = (path, comment) => {
    return new Promise((resolve, reject)=> {
        requestPage(path).then(rawHTML => {
            const initialEntryObjectArray = format.returnEntryObjectArray(rawHTML, true);
            const totalEntries = initialEntryObjectArray[0].replace(/[()]/g,'');
            const entryObjectArray = initialEntryObjectArray[1];

            database.addMultipleEntries(entryObjectArray, generalHelpers.apostropheEscape(comment)).then(value => {
                console.log(value);
                resolve(totalEntries);
            }, err => {
                reject(err);
            });
        }, err => {
            reject(err);
        });
    });
};

const archiveEntryPage = (path, comment) => {
    return new Promise(((resolve, reject) => {
        getEntryPage(path).then(entries => {
            database.addMultipleEntries(entries, generalHelpers.apostropheEscape(comment)).then(value => {
                console.log(value);
                resolve('ok. sayfadaki tum entryler arsivlendi');
            }, err => {
                reject(err);
            });
        }, err => {
            reject(err);
        });
    }));
};

const archiveConsecutiveEntryPages = (path, comment) => {
    return new Promise((resolve, reject) => {
        console.time(utils.colorfulOutput(path, 'green'))
        archiveInitialPage(`${path}&p=1`, comment).then(async totalEntries => {
            const maxPageNum = Math.ceil(totalEntries/10);
            console.log(utils.colorfulOutput(`'${path}' toplam entry sayfasi ${maxPageNum}`, 'yellow'));

            // [2,N] array
            const pageArray = Array.from(Array(maxPageNum+1).keys());
            pageArray.shift()
            pageArray.shift()

            const batchPage = utils.groupBy(pageArray, config.entry.threads);

            for (const key of Object.keys(batchPage)) {
                const allPages = await Promise.all(batchPage[key].map(page => {
                    return archiveEntryPage(`${path}&p=${page}`, comment).then(val => {
                        return val;
                    }, rej => {
                        console.error(`reddedildi: ${rej}`);
                    });
                }));

                await utils.sleep(config.entry.sleep);

                allPages.forEach(val => console.log(val));
            }

            console.timeEnd(utils.colorfulOutput(path, 'green'))
            resolve(`'${path}' arsivlendi`);

        }, err=> {
            reject(err);
        });
    });
};

module.exports.requestPage = requestPage;
module.exports.archiveEntryPage = archiveEntryPage;
module.exports.archiveConsecutiveEntryPages = archiveConsecutiveEntryPages;



// --------------------------------
// unused functions below this line
// --------------------------------




// call getEntriesInAPage then add all to database
// const archiveEntriesInAPage = async (pagePath) => {
//     return new Promise(((resolve, reject) => {
//         getEntriesInAPage(pagePath).then(async entries => {
//             await dbOps.addMultipleEntries(entries);
//             return resolve('ok. sayfadaki tum entryler arsivlendi');
//         }, err => {
//             console.error(err);
//             reject(err);
//         });
//     }));
// };

// get entries batches of 5 then add resolved entry objects to an array.
// then return array
// const getEntriesInAPage = (pagePath) => {
//     return new Promise( (resolve, reject) => {
//         console.time(pagePath)
//         const options = {
//             hostname: 'eksisozluk.com',
//             port: 443,
//             path: pagePath,
//             method: 'GET',
//             headers: config.requestHeaders
//         }
//
//         const req = https.request(options, res => {
//             // reject bad status
//             if (res.statusCode < 200 || res.statusCode >= 300) {
//                 return reject(new Error(`statusCode=${res.statusCode}`));
//             }
//             let resBody = '';
//             res.on('data', d => {
//                 resBody += d;
//             });
//             res.on('end',async () => {
//                 try {
//                     const entryIdArray = formatOps.returnEntryIDsFromHTML(resBody);
//
//                     // const batchEntryIds = _.groupBy(entryIdArray, (_v, i) => Math.floor(i / 5));
//
//                     const batchEntryIds = utils.groupBy(entryIdArray, 5);
//
//                     const entryArray = [];
//
//                     for (const key of Object.keys(batchEntryIds)) {
//                         const batchEntry = await Promise.all(batchEntryIds[key].map(entryID => {
//                             return getEntry(entryID).then(entry => {
//                                 return entry;
//                             }, rej => {
//                                 console.error(`'${entryID}' - ${rej}`);
//                             });
//                         }));
//
//                         if (batchEntry.some(elem => elem!==undefined)) {
//                             const filteredBatchEntry = batchEntry.filter(element => element !== undefined);
//                             entryArray.push(...filteredBatchEntry);
//                         }
//                     }
//
//                     console.timeEnd(pagePath);
//                     resolve(entryArray);
//                 }
//                 catch (e) {
//                     return reject(new Error(`hata olustu: ${e}`));
//                 }
//             });
//         });
//
//         req.on('error', (err) => {
//             // This is not a "Second reject", just a different sort of failure
//             // console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
//             reject(err);
//         });
//         req.end();
//     });
// };



// multiple pages
// const archiveUser = (user, maxPage=3) => {
//     getTotalEntryPagesOfAnUser(user).then(async (pageNum) =>  {
//         console.time(`kullanici '${user}'`);
//         const pageNumberArray = [...Array(pageNum+1).keys()];
//         pageNumberArray.shift();
//         const batchPageNumbers = utils.groupBy(pageNumberArray, maxPage);
//
//         for (const key of Object.keys(batchPageNumbers)) {
//             await Promise.all(batchPageNumbers[key].map(page => {
//                 return archiveEntriesInAPage(user, page);
//             }));
//         }
//
//         console.timeEnd(`kullanici '${user}'`);
//     });
// };

//singlepage
// const archiveConsecutivePages = (path) => {
//     webHelpers.getTotalPagesOfPath(path).then(async (pageNum) =>  {
//         console.time(path);
//         const pageNumberArray = [...Array(pageNum+1).keys()];
//         pageNumberArray.shift();
//
//         // await pageNumberArray.reduce(async (memo, page) => {
//         //     await memo;
//         //     // await webHelpers.sleep(100);
//         //     await archiveEntriesInAPage(user, page);
//         // }, undefined);
//
//         for (const page of pageNumberArray) {
//             await archiveEntriesInAPage(`${path}?p=${page}`);
//         }
//
//         console.timeEnd(path);
//     });
// };
