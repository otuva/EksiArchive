const https = require("https");
// const htmlStrings = require("../../tests/utils/htmlStrings");

// const getTotalPagesOfPath = path => {
//     return new Promise((resolve, reject) => {
//         console.log(`${path}?p=2`);
//         const matchPageNum = /(?<=data-pagecount=")\d+(?=")/;
//         if (typeof path === 'string') {
//             const options = {
//                 hostname: 'eksisozluk.com',
//                 port: 443,
//                 path: `${path}?p=2`,
//                 method: 'GET'
//             }
//
//             const req = https.request(options, res => {
//                 if (res.statusCode < 200 || res.statusCode >= 300) {
//                     return reject(new Error(`statusCode=${res.statusCode}`));
//                 }
//                 let resBody = '';
//                 res.on('data', d => {
//                     resBody += d;
//                 });
//                 res.on('end', () => {
//                     try {
//                         const pages = resBody.match(matchPageNum);
//                         if (pages == null) {
//                             resolve(1);
//                         }
//                         else {
//                             resolve(parseInt(pages[0],10));
//                         }
//                     }
//                     catch (e) {
//                         return reject(new Error(`islem hata yakaladi: ${e}`));
//                     }
//
//                 });
//             });
//             req.on('error', (err) => {
//                 // This is not a "Second reject", just a different sort of failure
//                 reject(err);
//             });
//             req.end();
//         }
//         else {
//             return reject(new Error('kullanici bos olamaz'));
//         }
//     });
// };

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// module.exports.getTotalPagesOfPath = getTotalPagesOfPath;
module.exports.sleep = sleep;