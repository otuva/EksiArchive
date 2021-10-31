const https = require("https");

const config = require("../../../config");
const database = require("../database");
const format = require("./formatEntry");
const {colorfulOutput} = require("../utils/generalHelpers");


const requestEntry = (entryID) => {
    // send http request for entry
    // resolve html string of the response
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path: `/entry/${entryID}`,
            method: 'GET',
            headers: config.requestHeaders
        }

        const req = https.request(options, async res => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                if (res.statusCode === 429) console.error(colorfulOutput('istek eksisozluk limitine takildi. biraz bekleyip tekrar deneyin.', 'red'));
                return reject(new Error(`statusCode=${res.statusCode}`));
            }

            let resBody = '';

            // get data
            res.on('data', d => {
                resBody += d;
            });

            // resolve on end
            res.on('end', () => {
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

const getEntry = (entryID) => {
    // sleep time & force are used here
    // db query gets made here
    // call requestEntry, return entry object
    return new Promise(async (resolve, reject)=> {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const timeStr = `[${today.toUTCString()}]`;

        console.time(`${timeStr} - entry '${entryID}'`);
        const matchError = /<h1 title="web5">büyük başarısızlıklar sözkonusu<\/h1>/;
        database.checkSingleEntryID(entryID).then(state=>{
            // entry does NOT exist or force option is used
            if (!state || config.entry.force) {
                if (state) console.log('entry zaten arsivde ama "--force" secenegi kullanildi');
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

const archiveEntry = (entryID) => {
    // call getEntry then add resolved entry object to database
    return new Promise((resolve,reject)=> {
        getEntry(entryID).then((val)=>{
            database.addEntry(val).then(value => {
                resolve(value);
            }, error => {
                reject(error);
            });
        }, (err)=> {
            reject(err);
        });
    });
};

module.exports.archiveEntry = archiveEntry;
