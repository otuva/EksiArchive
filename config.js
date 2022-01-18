"use strict";

const path = require('path');

const databaseFilePath = path.join(process.cwd(), 'database.db');

// add option for random user agent on
const requestHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
}

// default options for flags
const entry = {
    sleep: 0, // delay between requests (ms)
    force: false,  // add existent entry
    threads: 5, // how many concurrent requests
    default_comment: "save entry now"
}

const user = {
    default_comment: function(nick, mode) {
        if (mode==="fav") {
            return `save user favs: ${nick}`;
        }
        else if (mode==="entry") {
            return `save user entries: ${nick}`;
        }
    }
}

const debe = {
    default_comment: "debe"
}

const banner = {
    enabled: true,
    color: "random" //red, green, yellow, blue, magenta, cyan, random, anything else = (colorless)
}

module.exports.databaseFilePath = databaseFilePath;
module.exports.requestHeaders = requestHeaders;
module.exports.entry = entry;
module.exports.user = user;
module.exports.debe = debe;
module.exports.banner = banner;
