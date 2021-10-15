const argv = require('minimist')(process.argv.slice(2));

const userOps = require("./EksiArchive/userOps");
// const formatOps = require("./EksiArchive/formatOps");
// const dbOps = require("./EksiArchive/dbOps");
const utils = require("./EksiArchive/utils/inputValidate");

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
            console.error('\x1b[31m%s\x1b[0m', "You can't use other flags with first flags. Disregarding other flags.")
        }
        if (argv._[0] === 'init') {
            console.log("Database has been initialized.")
        }
        else if (argv._[0] === 'help') {
            console.log("yardim mod");
        }
        else {
            console.error("Yanlis kullanim. Dogrusu:"+firstFlags);
        }
    }
    else {
        // console.log();
        // console.table(argv)
        if (Object.keys(argv).length === 2) {
            if (argv.e) {
                if (typeof argv.e === 'string' || typeof argv.e === 'number') {
                    const id = utils.isInputEntryLink(argv.e.toString());
                    // console.log(id);
                    // console.log(typeof id);
                    console.log(`arsivlenecek entry: ${id}`);
                    userOps.archiveEntry(id).then();
                }
                else {
                    console.error('entry kismi bos olamaz.');
                }
            }
            else if (argv.p) {
                if (utils.isPageArgumentValid(argv.p)) {
                    console.log(`arsivlenecek sayfa: ${argv.p}`);
                    const values = argv.p.split(",");
                    const user = values[0].replace(/ /g, '-');
                    userOps.archiveEntriesInAPage(user, values[1]);
                }
                else {
                    throw Error('kullanici ya da sayfa gecerli degil.' +
                        'insert hata here');
                }
                //
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