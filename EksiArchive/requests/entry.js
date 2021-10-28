const https = require("https");

const config = require("../../config");
// const webHelpers = require("../utils/webHelpers");
const database = require("../db/db");
const format = require("../format/format");


// let throttle = 2;

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
                    // console.error(`islem ${throttle*30/60} dakika sonra devam edecek`);
                    // await webHelpers.sleep(throttle*30000);
                    // throttle>=10 ? throttle=10 : throttle++;
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

// sleep time & force are used here
// db query gets made here
// call requestEntry, return entry object
const getEntry = (entryID) => {
    // get requested entry and return an entry object
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const timeStr = `[${today.toUTCString()}]`;

    return new Promise(async (resolve, reject)=> {
        console.time(`${timeStr} - entry '${entryID}'`);
        const matchError = /<h1 title="web5">büyük başarısızlıklar sözkonusu<\/h1>/;
        // const state = await dbOps.entryIdExists(id);
        database.entryIdExists(entryID).then(state=>{
            // entry does NOT exist or force option is used
            if (!state || config.entry.force) {
                if (state) {
                    console.log('entry zaten arsivde ama "--force" secenegi kullanildi');
                }
                setTimeout( ()=>{
                    requestEntry(entryID).then((html)=>{
                        if (html.match(matchError)) {
                            return reject(new Error('eksi sozluk hata dondurdu'));
                        }
                        else {
                            console.timeEnd(`${timeStr} - entry '${entryID}'`);
                            resolve(format.html2entry(html));
                        }
                    }, (err)=>{
                        return reject(new Error(`eksi sozluk hata dondurdu ${err}`));
                    });
                }, config.entry.sleep);
            }
            else {
                reject('entry zaten arsivde');
            }
        }, err=>{
            console.error(`database hatasi ${err}`);
        });
    });
}

// get single entry then add resolved entry object to database
const archiveEntry = (entryID) => {
    getEntry(entryID).then((val)=>{
        database.addEntry(val);
        // console.table(val);
        // console.log();
        console.log('ok. entry arsivlendi');
    }, (err)=> {
        console.error(err);
    });
};

module.exports.getEntry = getEntry;
module.exports.requestEntry = requestEntry;
module.exports.archiveEntry = archiveEntry;