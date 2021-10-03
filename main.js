const argv = require('minimist')(process.argv.slice(2));

const userOps = require("./EksiArchive/userOps");
const formatOps = require("./EksiArchive/formatOps");
const dbOps = require("./EksiArchive/dbOps");

// help diyince ayri bos calistirinca ayri text yazdir

const arguments = `\n\t-e entry\n\t-u user`;
const firstFlags = `\n\tinit\n\thelp\n\tversion`;

// if empty
if (Object.keys(argv).length === 1 && argv._.length === 0) {
    console.log(`No arguments are provided.` + arguments);
}
else {
    // if first flagless argument exists
    if (argv._[0]) {
        if (Object.keys(argv).length !==1) {
            console.log("You can't use other flags with first flags. Disregarding other flags.")
        }
        if (argv._[0] === 'init') {
            console.log("Database has been initialized.")
        }
        else if (argv._[0] === 'help') {
            console.log("yardim mod");
        }
        else {
            console.log("Yanlis kullanim. Dogrusu:"+firstFlags);
        }
    }
    else {
        // console.log();
        // console.table(argv)
        if (Object.keys(argv).length === 2) {
            if (argv.e) {
                console.log(`arsivlenecek entry: ${argv.e}`);
            }
            else if (argv.u) {
                console.log(`arsivlenecek kullanici: ${argv.u}`);
            }
            else {
                console.log(`bilinmeyen flag. dogru kullanim:`+arguments);
            }
        }
        else {
            console.log(`too many arguments. try with one flag only`+arguments);
        }
    }
}
// console.log();
// console.table(argv);

// https://eksisozluk.com/entry/128646280
// const archiveEntry = async (entryID) => {
//     console.time(`entry '${entryID}'`);
//     const entry = await userOps.getEntry(entryID);
//     dbOps.addEntry(entry);
//     console.timeEnd(`entry '${entryID}'`);
//     // console.log(entry);
// };
//
// archiveEntry("128685687").then();
// // dbOps.init();



// userOps.getEntry("22016689").then(value => {
//     console.log(value);
// });



// dateTimeFormatter("30.04.2014 09:48 ~ 09:59");
// dateTimeFormatter("23.08.2016 20:02");
// dateTimeFormatter("01.09.2014 23:55 ~ 02.09.2014 10:32");