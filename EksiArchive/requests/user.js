// const https = require('https');


// unused functions below this line

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