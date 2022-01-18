"use strict";

const cheerio = require("cheerio");
const entryFormatter = require("../entry/formatEntry");

// for page crawl
const returnEntryObjectArray = (html, initial=false) => {
    // initial argument is used here to decide how many pages of entries there will be

    const entryArray = [];
    const $ = cheerio.load(html);
    const entries = $('div[class="topic-item"]');

    entries.each((num, tag)=> {
        const entry = $(tag);

        const title = entry.find('h1').text().trim();
        const attributes = entry.find('li').attr();
        const content = entry.find('div').html().trim();
        const date = entry.find('a[class="entry-date permalink"]').text();

        const entryObject = entryFormatter.formatEntry(title, attributes, content, date);
        entryArray.push(entryObject);
    });

    // for consecutive pages
    if (initial) {
        const numberOfPages=$('small').text().trim();
        return [numberOfPages, entryArray];
    }
    return entryArray;
}

module.exports.returnEntryObjectArray = returnEntryObjectArray;
