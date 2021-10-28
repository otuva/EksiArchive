const https = require('https');

const format = require("../format/format");
const database = require("../db/db");

const requestEntryPage = (path) => {
    console.time(path);
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'eksisozluk.com',
            port: 443,
            path,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
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
        requestEntryPage(path).then(html => {
            resolve(format.returnEntryObjectArray(html));
        }, err => {
            reject(err);
        });
    }));
};

const archiveEntryPage = (path) => {
    return new Promise(((resolve, reject) => {
        getEntryPage(path).then(entries => {
            database.addMultipleEntries(entries).then(value => {
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

module.exports.archiveEntryPage = archiveEntryPage;
