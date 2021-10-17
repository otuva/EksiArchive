const argv = require('minimist')(process.argv.slice(2));

// const userOps = require("./EksiArchive/userOps");
const inputValidate = require("./EksiArchive/utils/inputValidate");
const manage = require("./EksiArchive/manage");
const config = require("./config");

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
            manage.init();
        }
        else if (argv._[0] === 'help') {
            console.log("yardim mod");
        }
        else if (argv._[0] === 'version') {
            console.log("v0.1");
        }
        else {
            console.error("Yanlis kullanim. Dogrusu:"+firstFlags);
        }
    }
    else {
        try {
            console.log(argv);
            if (typeof argv.sleep === 'number') {
                config.entry.sleep = argv.sleep;
            }
            // if (typeof argv.force === 'boolean') {
            //     config.entry.force = argv.force;
            // }

            if (argv.e) {
                if (typeof argv.e === 'string' || typeof argv.e === 'number') {
                    const id = inputValidate.isInputEntryLink(argv.e.toString());
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
                if (typeof argv.p === 'string') {
                    if (inputValidate.isPageArgumentValid(argv.p)) {
                        console.log(`arsivlenecek sayfa: ${argv.p}`);
                        const values = argv.p.split(",");
                        const user = values[0].replace(/ /g, '-');
                        userOps.archiveEntriesInAPage(user, values[1]);
                    }
                    else {
                        console.error('kullanici ya da sayfa gecerli degil.' + 'insert hata here');
                    }
                }
                else {
                    console.error('sayfa kismi bos olamaz');
                }

            }
            else if (argv.u) {
                if (typeof argv.u === 'string') {
                    if (inputValidate.isUserValid(argv.u)) {
                        const user = argv.u.replace(/ /g, '-');
                        console.log(`arsivlenecek kullanici: ${user}`)
                        userOps.archiveUser(user);
                    }
                    else {
                        console.error('kullanici gecerli degil')
                    }
                }
                else {
                    console.error('kullanici bos olamaz');
                }
            }
            else {
                console.log(`bilinmeyen flag. dogru kullanim:`+arguments);
            }
        }
        catch (e) {
            console.error(`bir seyler kirildi. ${e}`);
        }
    }
}