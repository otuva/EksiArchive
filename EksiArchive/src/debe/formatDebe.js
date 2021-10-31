const cheerio = require('cheerio');

const getEntryIDsFromDebe = (markup) => {
    const $ = cheerio.load(markup);
    const links = $('a');

    const idArray = []

    const matchId = /(?<=\/entry\/)\d+/

    links.each((num, link)=> {
        idArray.push($(link).attr().href.match(matchId)[0]);
    });

    return idArray;
};

module.exports.getEntryIDsFromDebe = getEntryIDsFromDebe;
