const cheerio = require("cheerio");

const utils = require("../utils/generalHelpers");

const dateTimeFormatter = (string) => {
    const dateTime = string.split(' ~ ')
    const dateRegex = /\d\d\.\d\d\.\d\d\d\d/;
    const timeRegex = /\d\d:\d\d/;

    const firstDateTimeElement = dateTime[0]
    const date_created = firstDateTimeElement.match(dateRegex)[0];
    const time_created = firstDateTimeElement.match(timeRegex)[0];

    if (dateTime.length === 1) {
        return [date_created, time_created, null, null];
    }
    else if (dateTime.length === 2) {
        const secondDateTimeElement = dateTime[1];
        const date_modified = (()=> {
            const match = secondDateTimeElement.match(dateRegex);
            if (match != null) {
                return match[0];
            }
            return null;
        })();
        const time_modified = (()=> {
            const match = secondDateTimeElement.match(timeRegex);
            if (match != null) {
                return match[0];
            }
            return null;
        })();

        return [date_created, time_created, date_modified, time_modified];
    }
};

const formatEntry = (title, info, content, date) => {
    title = utils.apostropheEscape(title);

    const id = info['data-id'];
    const author = info['data-author'];

    let inEksiSeyler;
    info['data-seyler-slug'] ? inEksiSeyler=true : inEksiSeyler=false;

    const favCount = info['data-favorite-count'];

    const dateTime = dateTimeFormatter(date);

    content = utils.apostropheEscape(content);

    return {
        id,
        title,
        author,
        content,
        inEksiSeyler,
        favCount,
        dateCreated: dateTime[0],
        timeCreated: dateTime[1],
        dateModified: dateTime[2],
        timeModified: dateTime[3]
    };
};

// const contentFormatter = (string) => {
//     string = string.trim()
//     string = utils.apostropheEscape(string);
//     return string;
// };

const singleEntryFormat = (html) => {
    const $ = cheerio.load(html);

    // instead of getting directly 'li' item
    // first get 'entry list' then get 'li' tag
    // by doing so you'd avoid getting pinned entry by eksisozluk if there is any
    const entry = $('ul[id="entry-item-list"]').find('li');

    const title = $('h1').text().trim();
    const attrb = entry[0].attribs;
    const content = entry.find('div').html().trim();
    const date = entry.find('a[class="entry-date permalink"]').text();

    return formatEntry(title, attrb, content, date);
};

module.exports.formatEntry = formatEntry;
module.exports.singleEntryFormat = singleEntryFormat;
// module.exports.contentFormatter = contentFormatter;
module.exports.dateTimeFormatter = dateTimeFormatter;
