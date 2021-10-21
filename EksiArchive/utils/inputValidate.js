const isInputEntryLink = (string) => {
    const matchLink = /(?<=https:\/\/eksisozluk.com\/entry\/)\d+/;
    const entryId = string.match(matchLink);

    if (entryId == null) {
        return string;
    }
    else {
        return entryId[0];
    }
};

const isUserValid = (rawUser) => {
    const matchUser = /[\w -]+/;
    const userMatch = rawUser.match(matchUser);

    if (userMatch) {
        return userMatch[0]===rawUser;
    }
    else {
        return false;
    }
};

//  || ) {
//         const user = isUserValid(values[0]);
//         const page = !isNaN(values[1]);
//         // console.log(`verilen user '${user}'`);
//         // console.log(user);
//         // console.log(!!user);
//         return user && page;

const isUserPageValid = (string) => {
    const values = string.split(',');
    // const matchPageNum = /\d+/;
    const notEmptyValues = values.every(val => val !== '');
    if (values.length === 1 && notEmptyValues) {
        return isUserValid(values[0]);
    }
    else if (values.length === 2 && notEmptyValues) {
        const user = isUserValid(values[0]);
        const page = !isNaN(values[1]);

        return user && page;
    }
    else {
        return false;
    }
};

// console.log(isUserPageValid('divit,asd'));


module.exports.isInputEntryLink = isInputEntryLink;
module.exports.isUserPageValid = isUserPageValid;
module.exports.isUserValid = isUserValid;

