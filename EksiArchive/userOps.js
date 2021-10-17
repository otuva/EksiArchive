const https = require('https');
// const _ = require('underscore');

const formatOps = require('./formatOps');
const dbOps = require("./dbOps");
const utils = require("./utils/generalHelpers");
const webHelpers = require("./utils/webHelpers");
const config = require("../config");

let throttle = 2;
// send http request for entry
// resolve html string of the response
const requestEntry = (entryID) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path: `/entry/${entryID}`,
            method: 'GET',
            headers: config.requestHeaders
        }

        const req = https.request(options, async res => {
            // reject bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                // console.log(res.headers);
                if (res.statusCode === 429) {
                    console.error('istekler eksisozluk limitine takildi. eger bu hatayi sik aliyorsaniz "--sleep <ms>" secenegi ile arsivlemeyi deneyin');
                    console.error(`islem ${throttle*30} saniye sonra devam edecek`);
                    await webHelpers.sleep(throttle*30000);
                    throttle++;
                }
                return reject(new Error(`statusCode=${res.statusCode}`));
            }

            let resBody = '';

            // get data
            res.on('data', d => {
                resBody += d;
            });

            // resolve on end
            res.on('end', () => {
                // try {
                //     resBody += '\n';
                // } catch(e) {
                //     reject(e);
                // }
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

const returnEntryIDsFromHTML = html => {
    const matchEntryList = /class="topic-list"/;
    const matchFooter = /id="site-footer"/;
    const matchEntryID = /(?<=\/entry\/)\d+/g;

    const listBegin = html.match(matchEntryList);
    const listEnd = html.match(matchFooter);

    if (listBegin !== null && listEnd !== null) {
        const entryListHTML = html.slice(listBegin.index, listEnd.index);
        if (entryListHTML.match(matchEntryID) !== null) {
            return entryListHTML.match(matchEntryID);
        }
        else {
            throw new Error('verilen html\'den entry listesi bulunamadi');
        }
    }
    else {
        throw new Error('verilen html\'den entry listesi bulunamadi');
    }
};

// get requested entry and return entry object
const getEntry = async (id, sleepTime=0) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const timeStr = `[${today.toUTCString()}]`;

    return new Promise(async (resolve, reject)=> {
        console.time(`${timeStr} - entry '${id}'`);
        const matchError = /<h1 title="web5">büyük başarısızlıklar sözkonusu<\/h1>/;
        // const state = await dbOps.entryIdExists(id);
        dbOps.entryIdExists(id).then(state=>{
            if (state) {
                reject('entry zaten arsivde');
            }
            else {
                setTimeout( ()=>{
                    requestEntry(id).then((html)=>{
                        if (html.match(matchError)) {
                            // console.timeEnd(`entry '${id}' suresi`);
                            return reject(new Error('eksi sozluk hata dondurdu'));
                        }
                        else {
                            console.timeEnd(`${timeStr} - entry '${id}'`);
                            resolve(formatOps.html2entry(html));
                        }
                    }, (err)=>{
                        return reject(new Error(`eksi sozluk hata dondurdu ${err}`));
                    });
                }, sleepTime);
            }
        }, err=>{
            console.error(`database hatasi ${err}`);
        });
    });
}

// call getEntriesInAPage then add all to database
const archiveEntriesInAPage = async (user, page, sleepTime=0) => {
    return new Promise(((resolve, reject) => {
        getEntriesInAPage(user, page, sleepTime).then(async entries => {
            await dbOps.addMultipleEntries(entries);
            return resolve('ok. sayfadaki tum entryler arsivlendi');
        }, err => {
            console.error(err);
            reject(err);
        });
    }));
};

// get entries batches of 5 then add resolved entry objects to an array.
// then return array
const getEntriesInAPage = (user, page, sleepTime=0) => {
    return new Promise( (resolve, reject) => {
        console.time(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path: `/basliklar/istatistik/${user}/son-entryleri?p=${page}`,
            method: 'GET',
            headers: config.requestHeaders
        }

        const req = https.request(options, res => {
            // reject bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                // console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
                return reject(new Error(`statusCode=${res.statusCode}`));
            }
            let resBody = '';
            res.on('data', d => {
                resBody += d;
            });
            res.on('end',async () => {
                try {
                    const entryIdArray = returnEntryIDsFromHTML(resBody);

                    // const batchEntryIds = _.groupBy(entryIdArray, (_v, i) => Math.floor(i / 5));

                    const batchEntryIds = utils.groupBy(entryIdArray, 5);

                    const entryArray = [];

                    for (const key of Object.keys(batchEntryIds)) {
                        const batchEntry = await Promise.all(batchEntryIds[key].map(entryID => {
                            return getEntry(entryID, sleepTime).then(entry => {
                                return entry;
                            }, rej => {
                                console.error(`'${entryID}' - ${rej}`);
                            });
                        }));

                        if (batchEntry.some(elem => elem!==undefined)) {
                            const filteredBatchEntry = batchEntry.filter(element => element !== undefined);
                            entryArray.push(...filteredBatchEntry);
                        }
                    }

                    console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
                    resolve(entryArray);
                }
                catch (e) {
                    return reject(new Error(`hata olustu: ${e}`));
                }
            });
        });

        req.on('error', (err) => {
            // This is not a "Second reject", just a different sort of failure
            // console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
            reject(err);
        });
        req.end();
    });
};

// get single entry then add resolved entry object to database
const archiveEntry = async (entryID) => {
    getEntry(entryID).then((val)=>{
        dbOps.addEntry(val);
        // console.table(val);
        // console.log();
        console.log('ok. entry arsivlendi');
    }, (err)=> {
        console.error(err);
    });

};

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
const archiveUser = (user, sleepTime=0) => {
    webHelpers.getTotalEntryPagesOfAnUser(user).then(async (pageNum) =>  {
        console.time(`kullanici '${user}'`);
        const pageNumberArray = [...Array(pageNum+1).keys()];
        pageNumberArray.shift();

        // await pageNumberArray.reduce(async (memo, page) => {
        //     await memo;
        //     // await webHelpers.sleep(100);
        //     await archiveEntriesInAPage(user, page);
        // }, undefined);

        for (const page of pageNumberArray) {
            await archiveEntriesInAPage(user, page, sleepTime);
        }

        console.timeEnd(`kullanici '${user}'`);
    });
};


module.exports.getEntry = getEntry;
module.exports.requestEntry = requestEntry;
module.exports.archiveEntry = archiveEntry;
module.exports.getEntriesInAPage = getEntriesInAPage;
module.exports.archiveEntriesInAPage = archiveEntriesInAPage;
module.exports.archiveUser = archiveUser;