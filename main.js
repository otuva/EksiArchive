const argv = require('minimist')(process.argv.slice(2));

// const userOps = require("./EksiArchive/userOps");
const entry = require("./EksiArchive/requests/entry");
const userPage = require("./EksiArchive/requests/user");
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
        else if (argv._[0] === 'debe') {
            // userOps.archiveEntriesInAPage('/debe');
            console.log('debe sonra implemente edilecek');
        }
        else {
            console.error("Yanlis kullanim. Dogrusu:"+firstFlags);
        }
    }
    else {
        try {
            // console.log(argv);
            if (typeof argv.sleep === 'number') config.entry.sleep = argv.sleep;
            if (typeof argv.force === 'boolean') config.entry.force = argv.force;

            if ((argv.e || argv.entry) && !(argv.e && argv.entry)) {
                if (argv.entry) argv.e = argv.entry;
                if (typeof argv.e === 'string' || typeof argv.e === 'number') {
                    const id = inputValidate.isInputEntryLink(argv.e.toString());
                    console.log(`arsivlenecek entry: ${id}`);
                    entry.archiveEntry(id);
                }
                else {
                    console.error('entry kismi bos olamaz.');
                }
            }
            else if ((argv.u || argv.user) && !(argv.u && argv.user)) {
                if (argv.user) argv.u = argv.user;

                if (typeof argv.u === 'string') {
                    if (inputValidate.isUserPageValid(argv.u)) {

                        const values = argv.u.split(",");
                        const user = values[0].replace(/ /g, '-');

                        if (values.length === 1) {
                            console.log(`arsivlenecek kullanici: ${user}`)

                            userPage.archiveConsecutiveEntryPages(`/son-entryleri?nick=${user}`).then(val => {
                                console.log(val);
                            }, err => {
                                console.error(err);
                            });

                        }
                        else {
                            console.log(`kullanici: ${user} - arsivlenecek sayfa: ${values[1]}`);
                            userPage.archiveEntryPage(`/son-entryleri?nick=${user}&p=${values[1]}`).then(val => {
                                console.log(val);
                            }, err => {
                                console.error(err);
                            });
                        }
                    }
                    else {
                        console.error('kullanici veya sayfa gecerli degil')
                    }
                }
                else {
                    console.error('kullanici bos olamaz');
                }
            }
            else if ((argv.f || argv.favorite) && !(argv.f && argv.favorite)) {
                if (argv.favorite) argv.f = argv.favorite;

                if (typeof argv.f === 'string') {
                    if (inputValidate.isUserPageValid(argv.f)) {

                        const values = argv.f.split(",");
                        const user = values[0].replace(/ /g, '-');

                        if (values.length === 1) {
                            console.log(`favorileri arsivlenecek kullanici: ${user}`)

                            userPage.archiveConsecutiveEntryPages(`/favori-entryleri?nick=${user}`).then(val => {
                                console.log(val);
                            }, err => {
                                console.error(err);
                            });
                        }
                        else {
                            console.log(`kullanici: ${user} - arsivlenecek favori sayfa: ${values[1]}`);
                            // userOps.archiveEntriesInAPage(`/basliklar/istatistik/${user}/favori-entryleri?p=${values[1]}`);
                            userPage.archiveEntryPage(`/favori-entryleri?nick=${user}&p=${values[1]}`).then(val => {
                                console.log(val);
                            }, err => {
                                console.error(err);
                            });
                        }
                    }
                    else {
                        console.error('kullanici veya sayfa gecerli degil')
                    }
                }
                else {
                    console.log('insert favori hatasi here');
                }
            }
            else {
                console.log(`bilinmeyen veya hatali flag kullanimi. dogru kullanim:`+arguments);
            }
        }
        catch (e) {
            console.error(`bir seyler kirildi. ${e}`);
        }
    }
}
