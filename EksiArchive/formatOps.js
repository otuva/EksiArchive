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

const apostropheEscape = (string) => {
    return string.replace(/'/g, "''");
};

// write tests for this func
const contentFormatter = (string) => {
    string = string.trim()
    string = apostropheEscape(string);
    return string;
};

const html2entry = (rawHtml) => {
    if (typeof rawHtml === 'string' && rawHtml.length !== 0) {
        try {
            // get title
            const matchTitle = /(?<=data-title=").*?(?="\s)/;
            const title = apostropheEscape(rawHtml.match(matchTitle)[0]);

            // get only user entry not (if exists) pinned message
            const matchEntrySection = /id="entry-item-list"/;
            const index = rawHtml.match(matchEntrySection).index;
            const html = rawHtml.slice(index);

            // regex for entry data
            const matchEntryID = /(?<=data-id=")\d+(?="\s)/;
            const matchAuthor = /(?<=data-author=")[\w\s]+(?="\s)/;
            // <div class="(?:content|content content-expanded)">\s.*\s+<\/div>
            // (?<=<div class="(?:content|content content-expanded)">\s).*?(?=\s+<\/div>) -> use this
            // (?<=<div class="(?:content|content content-expanded)">).*?(?=<\/div>)
            const matchContent = /(?<=<div class="(?:content|content content-expanded)">\s+).*?(?=\s+<\/div>)/;
            const matchEksiSeyler = /(?<=data-seyler-slug=")[\w-]+(?="\s)/;
            const matchEntryDate = /(?<=<a class="entry-date permalink" href="\/entry\/\d+">).*?(?=<\/a>)/;
            const matchFavCount = /(?<=data-favorite-count=")\d+(?="\s)/

            //variables
            const id = html.match(matchEntryID)[0];
            const author = html.match(matchAuthor)[0];
            const content = contentFormatter(html.match(matchContent)[0]);
            const inEksiSeyler = (() => {
                // regex match. if not found return false
                const match = html.match(matchEksiSeyler);
                return match != null;
            })();
            const dateTime = dateTimeFormatter(html.match(matchEntryDate)[0]);
            const favCount = html.match(matchFavCount)[0];

            // return entry object
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
        }
        catch (e) {
            console.error(e);
        }
    }
    else {
        throw new Error("html can't be empty");
    }
};

const returnEntryIDsFromHTML = html => {
    const matchEntryList = /class="(?:topic-list|topic-list partial)"/;
    const matchFooter = /id="site-footer"/;
    const matchEntryID = /(?<=\/entry\/)\d+/g;

    const listBegin = html.match(matchEntryList);
    const listEnd = html.match(matchFooter);

    if (listBegin !== null && listEnd !== null) {
        const entryListHTML = html.slice(listBegin.index, listEnd.index);
        if (entryListHTML.match(matchEntryID) !== null) {
            return entryListHTML.match(matchEntryID);
        }
        else {
            throw new Error('verilen html\'den entry listesi bulunamadi');
        }
    }
    else {
        throw new Error('verilen html\'den entry listesi bulunamadi');
    }
};

module.exports.html2entry = html2entry;
module.exports.contentFormatter = contentFormatter;
module.exports.dateTimeFormatter = dateTimeFormatter;
module.exports.returnEntryIDsFromHTML = returnEntryIDsFromHTML;