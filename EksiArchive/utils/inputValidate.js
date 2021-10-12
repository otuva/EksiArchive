const isInputEntryLink = (string) => {
    // https://eksisozluk.com/entry/128511324
    const matchLink = /(?<=https:\/\/eksisozluk.com\/entry\/)\d+/;
    const entryId = string.match(matchLink);

    if (entryId == null) {
        return string;
    }
    else {
        return entryId[0];
    }
};

const isPageArgumentValid = (string) => {
    const values = string.split(',');
    const matchUser = /[\w -]+/;
    const matchPageNum = /\d+/;
    if (values.length === 2) {
        const user = values[0].match(matchUser);
        const page = values[1].match(matchPageNum);
        // console.log(`verilen user '${user}'`);
        // console.log(user);
        // console.log(!!user);
        if (user && page) {
            // console.log(user[0]===values[0] && page[0]===values[1]);
            return user[0]===values[0] && page[0]===values[1];
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

module.exports.isInputEntryLink = isInputEntryLink;
module.exports.isPageArgumentValid = isPageArgumentValid;

