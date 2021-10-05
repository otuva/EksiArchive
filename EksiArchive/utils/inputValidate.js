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
module.exports.isInputEntryLink = isInputEntryLink;