// databaseFileName = "database"
databaseFilePath = "/home/tfp/Programming/node/EksiArchive/database.db"
// get abs path from relative path

// random user agent on
requestHeaders = {
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
}

// default options for flags
entry = {
    sleep: 0, // delay between requests ms
    // force: false
}

module.exports.databaseFilePath = databaseFilePath;
module.exports.requestHeaders = requestHeaders;
module.exports.entry = entry;