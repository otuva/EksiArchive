const https = require('https');
const _ = require('underscore');

const formatOps = require('./formatOps');
const dbOps = require("./dbOps");
// const utils = require("./utils/webHelpers");


// send http request for entry
// resolve html string of the response
const requestEntry = (entryID) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path: `/entry/${entryID}`,
            method: 'GET'
        }

        const req = https.request(options, res => {
            // reject bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
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

// const updateEntry = entryObj => {
//
// };
const returnEntryIDsFromHTML = html => {
    const matchEntryList = /class="topic-list"/;
    const matchFooter = /id="site-footer"/;
    const matchEntryID = /(?<=\/entry\/)\d+/g;

    const listBegin = html.match(matchEntryList);
    const listEnd = html.match(matchFooter);

    if (listBegin !== null && listEnd !== null) {
        const entryListHTML = html.slice(listBegin.index, listEnd.index);
        return entryListHTML.match(matchEntryID);
    }
    else {
        throw new Error('verilen html\'den entry listesi bulunamadi');
    }
};

// get requested entry format and return
const getEntry = async (id) => {
    return new Promise(async (resolve, reject)=> {
        console.time(`entry '${id}'`);
        const matchError = /<h1 title="web5">büyük başarısızlıklar sözkonusu<\/h1>/;
        // const entryHttp = requestEntry(id);

        // await utils.sleep(timeWait);

        requestEntry(id).then((val)=>{
            if (val.match(matchError)) {
                console.timeEnd(`entry '${id}'`);
                return reject(new Error('eksi sozluk hata dondurdu'));
            }
            else {
                console.timeEnd(`entry '${id}'`);
                resolve(formatOps.html2entry(val));
            }
        }, (err)=>{
            console.error(`hata: ${err}`);
            console.timeEnd(`entry '${id}'`);
            return reject(new Error('eksi sozluk hata dondurdu'));
        });
    });
}

const archiveEntriesInAPage = async (user, page) => {
    await getEntriesInAPage(user, page).then(entries => {
        dbOps.addMultipleEntries(entries);
        console.log('ok. sayfadaki tum entryler arsivlendi');
    }, err => {
        console.error(err);
    });

};

const getEntriesInAPage = (user, page) => {
    return new Promise( (resolve, reject) => {
        console.time(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path: `/basliklar/istatistik/${user}/son-entryleri?p=${page}`,
            method: 'GET'
        }

        const req = https.request(options, res => {
            // reject bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
                return reject(new Error(`statusCode=${res.statusCode}`));
            }
            let resBody = '';
            res.on('data', d => {
                resBody += d;
            });
            res.on('end',async () => {
                try {
                    const entryIdArray = returnEntryIDsFromHTML(resBody);

                    const batchEntryIds = _.groupBy(entryIdArray, (_v, i) => Math.floor(i / 5));

                    const entryArray = [];

                    for (const key of Object.keys(batchEntryIds)) {
                        console.log(key, batchEntryIds[key]);
                        const batchEntry = await Promise.all(batchEntryIds[key].map(async entryID => {
                            return await getEntry(entryID);
                        }));
                        console.log(batchEntry);
                        entryArray.push(...batchEntry);
                    }

                    // await Promise.all()

                    // const entryArray = await Promise.all(entryIdArray.map(async entryID => {
                    //     // await utils.sleep(3000);
                    //     return await getEntry(entryID);
                    // }));

                    console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
                    resolve(entryArray);
                }
                catch (e) {
                    console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
                    return reject(new Error(`hata olustu: ${e}`));
                }
            });
        });

        req.on('error', (err) => {
            // This is not a "Second reject", just a different sort of failure
            console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`)
            reject(err);
        });
        req.end();
    });
};

const archiveEntry = async (entryID) => {
    await getEntry(entryID).then((val)=>{
        dbOps.addEntry(val);
        // console.table(val);
        // console.log();
        console.log('ok. entry arsivlendi');
    }, (err)=> {
        console.error(err);
    });

};

//midyelerin-efendisi
// archiveEntriesInAPage('divit', '1').then();

module.exports.getEntry = getEntry;
module.exports.requestEntry = requestEntry;
module.exports.archiveEntry = archiveEntry;
module.exports.getEntriesInAPage = getEntriesInAPage;
module.exports.archiveEntriesInAPage = archiveEntriesInAPage;