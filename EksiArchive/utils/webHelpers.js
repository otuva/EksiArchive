const https = require("https");
// const htmlStrings = require("../../tests/utils/htmlStrings");

const getTotalEntryPagesOfAnUser = user => {
    return new Promise((resolve, reject) => {
        const matchPageNum = /(?<=data-pagecount=")\d+(?=")/;
        if (typeof user === 'string' || typeof user === 'number') {
            const options = {
                hostname: 'eksisozluk.com',
                port: 443,
                path: `/basliklar/istatistik/${user}/son-entryleri?p=2`,
                method: 'GET'
            }

            const req = https.request(options, res => {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error(`statusCode=${res.statusCode}`));
                }
                let resBody = '';
                res.on('data', d => {
                    resBody += d;
                });
                res.on('end', () => {
                    try {
                        const pages = resBody.match(matchPageNum);
                        if (pages == null) {
                            resolve(1);
                        }
                        else {
                            resolve(pages);
                        }
                    }
                    catch (e) {
                        return reject(new Error(`islem hata yakaladi: ${e}`));
                    }

                });
            });
            req.on('error', (err) => {
                // This is not a "Second reject", just a different sort of failure
                reject(err);
            });
            req.end();
        }
        else {
            return reject(new Error('kullanici bos olamaz'));
        }
    });
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports.getTotalEntryPagesOfAnUser = getTotalEntryPagesOfAnUser;
module.exports.sleep = sleep;

// const returnEntriesFromHtml = html => {
//     const matchEntryList = /class="topic-list"/;
//     const matchFooter = /id="site-footer"/;
//     const matchEntryID = /(?<=\/entry\/)\d+/g;
//
//     const listBegin = html.match(matchEntryList);
//     const listEnd = html.match(matchFooter);
//
//     if (listBegin !== null && listEnd !== null) {
//         const entryListHTML = html.slice(listBegin.index, listEnd.index);
//         return entryListHTML.match(matchEntryID);
//     }
//     else {
//         throw new Error('verilen html\'den entry listesi bulunamadi');
//     }
// };

// getTotalEntryPagesOfAnUser('summer-son').then(value => {
//     console.log(`simdi value: '${value}'`)
// }, err => {
//     console.error(`hata oldu ${err}`)
// })
// const myArray = ['12354', '4215', '5326', '64367', '64267'];
//
// const returnPromise = (entry) => {
//     return new Promise((resolve,reject)=> {
//         const randSecond = Math.random()*500
//         console.log(`entry: '${entry}' basladi`);
//         console.time(entry);
//         setTimeout(()=> {
//             console.timeEnd(entry);
//             resolve('ok');
//             // console.log('\n')
//             // return 'ok';
//         },randSecond);
//     });
// };
//
// myArray.forEach(async (val) => {
//     returnPromise(val).then();
// });

// const myFunc = async () => {
//     const entryArray = returnEntriesFromHtml(htmlStrings.entryList)
//     Promise.all()
// }
// const entryIdArray = ['12354', '4215', '5326', '64367', '64267'];
// const myfunc = async () => {
//     const entryArray = await Promise.all(entryIdArray.map(async (val)=> {
//         return await returnPromise(val);
//     }));
//
//     console.log(entryArray)
// };
//
// myfunc();
// let user='onur'
// let page=2;
// console.time();
// console.timeEnd(`\x1b[36mkullanici: '${user}', sayfa: '${page}'\x1b[0m`);
// module.exports.getTotalEntryPagesOfAnUser = getTotalEntryPagesOfAnUser;
//const matchPageNum