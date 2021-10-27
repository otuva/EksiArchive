const https = require('https');

// const format = require("../format/format");

const requestPage = (path) => {
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

requestPage('/favori-entryleri?nick=divit&p=1').then(markup => {
    // console.log(returnEntries(markup));
    console.log(markup);
});



// console.log(returnEntries(markup));

// const topic_length = topic_items.length;
// for (let i=0; i<topic_length; i++) {
//     console.log(Object.keys(topic_items.children));
// }
// console.log(Object.keys(topic_items[0].next.next))
// console.log(topic_items[0].next.next)
// topic_items.each((num,tag)=> {
//     console.log(Object.keys($(tag)));
//     console.log($(tag));
// });



// console.log(Object.keys(topic_items))