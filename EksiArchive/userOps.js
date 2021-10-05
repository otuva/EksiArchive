const https = require('https');
const formatOps = require('./formatOps');
const dbOps = require("./dbOps");

// send http request for entry
// resolve html string of the response
const requestEntry = entryID => {
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

// get requested entry format and return
const getEntry = async (id) => {
    return new Promise(async (resolve, reject)=> {
        const matchError = /<h1 title="web5">büyük başarısızlıklar sözkonusu<\/h1>/;
        // const entryHttp = requestEntry(id);
        requestEntry(id).then((val)=>{
            if (val.match(matchError)) {
                return reject(new Error('eksi sozluk hata dondurdu'));
            }
            else {
                resolve(formatOps.html2entry(val));
            }
        }, (err)=>{
            console.error(`hata: ${err}`);
            return reject(new Error('eksi sozluk hata dondurdu'));
        })

    });
}

const archiveEntry = async (entryID) => {
    console.time(`entry '${entryID}'`);
    await getEntry(entryID).then((val)=>{
        dbOps.addEntry(val);
        // console.table(val);
        // console.log();
        console.log('ok. entry arsivlendi');
        console.timeEnd(`entry '${entryID}'`);
    }, (err)=> {
        console.error(err);
    });

};

module.exports.getEntry = getEntry;
module.exports.requestEntry = requestEntry;
module.exports.archiveEntry = archiveEntry;