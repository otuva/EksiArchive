// databaseFileName = "database"
databaseFilePath = "/home/tfp/Programming/node/EksiArchive/database.db"
// get abs path from relative path

// random user agent on
requestHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
}

// default options for flags
entry = {
    sleep: 0, // delay between requests ms
    force: false,
    threads: 5, // how many concurrent requests
}


module.exports.databaseFilePath = databaseFilePath;
module.exports.requestHeaders = requestHeaders;
module.exports.entry = entry;
