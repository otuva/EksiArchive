const userOps = require("./EksiArchive/userOps");
const formatOps = require("./EksiArchive/formatOps");
const dbOps = require("./EksiArchive/dbOps");

// https://eksisozluk.com/entry/128646280

const archiveEntry = async (entryID) => {
    console.time(`entry '${entryID}'`);
    const entry = await userOps.getEntry(entryID);
    dbOps.addEntry(entry);
    console.timeEnd(`entry '${entryID}'`);
    // console.log(entry);
};

archiveEntry("128685687").then();
// dbOps.init();



// userOps.getEntry("22016689").then(value => {
//     console.log(value);
// });



// dateTimeFormatter("30.04.2014 09:48 ~ 09:59");
// dateTimeFormatter("23.08.2016 20:02");
// dateTimeFormatter("01.09.2014 23:55 ~ 02.09.2014 10:32");