const https = require('https');
const formatOps = require('./formatOps');

// send http request for entry
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
    const entryHttp = await requestEntry(id);
    return formatOps.html2entry(entryHttp);
}

module.exports.getEntry = getEntry;
module.exports.requestEntry = requestEntry;