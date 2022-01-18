"use strict";

const argv = require('minimist')(process.argv.slice(2));

const entry = require("./EksiArchive/src/entry/entry");
const userPage = require("./EksiArchive/src/user/user");
const debe = require("./EksiArchive/src/debe/debe");
const database = require("./EksiArchive/src/database");

const inputValidate = require("./EksiArchive/src/utils/inputValidate");
const outputMessages = require("./EksiArchive/src/utils/outputMessages");

const config = require("./config");

// help diyince ayri bos calistirinca ayri text yazdir
const arguments_output = `\n\t-e entry\n\t-u user`;
// const firstFlags = `\n\tinit\n\thelp\n\tversion`;

if (argv.banner === false) config.banner.enabled = false;
if (config.banner.enabled) argv["banner-color"] ? outputMessages.banner(argv["banner-color"]) : outputMessages.banner(config.banner.color);

// if empty
// console.log(argv) // debug
if (Object.keys(argv).length === 1 && argv._.length === 0) {
    console.log(`No arguments are provided.` + arguments_output);
}
else {
    if (typeof argv.sleep === 'number') config.entry.sleep = argv.sleep;
    if (typeof argv.force === 'boolean') config.entry.force = argv.force;
    if (typeof argv.threads === 'number') config.entry.threads = argv.threads;

    if (argv.comment === false) argv.comment = "-";

    try {
        if ((argv.h || argv.help) && !(argv.h && argv.help)) {
            console.log("yardim sayfasi");
        }
        else if (argv.version) console.log(config.EksiArchive.version);

        else if ((argv.e || argv.entry) && !(argv.e && argv.entry)) {
            if (argv.entry) argv.e = argv.entry;
            if (typeof argv.e === 'string' || typeof argv.e === 'number') {
                const id = inputValidate.isInputEntryLink(argv.e.toString());
                console.log(`arsivlenecek entry: ${id}`);
                const comment = argv.comment ? argv.comment : config.entry.default_comment;
                entry.archiveEntry(id, comment).then(val => {
                    console.log(val);
                }, err => {
                    console.error(err);
                });
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

                    const comment = argv.comment ? argv.comment : config.user.default_comment(values[0], "entry");

                    const user = values[0].replace(/ /g, '-');

                    if (values.length === 1) {
                        console.log(`arsivlenecek kullanici: ${user}`)


                        userPage.archiveConsecutiveEntryPages(`/son-entryleri?nick=${user}`, comment).then(val => {
                            console.log(val);
                        }, err => {
                            console.error(err);
                        });

                    }
                    else if ((values.length === 2)) {
                        console.log(`kullanici: ${user} - arsivlenecek sayfa: ${values[1]}`);
                        userPage.archiveEntryPage(`/son-entryleri?nick=${user}&p=${values[1]}`, comment).then(val => {
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

                    const comment = argv.comment ? argv.comment : config.user.default_comment(values[0], "fav");

                    const user = values[0].replace(/ /g, '-');

                    if (values.length === 1) {
                        console.log(`favorileri arsivlenecek kullanici: ${user}`)

                        userPage.archiveConsecutiveEntryPages(`/favori-entryleri?nick=${user}`, comment).then(val => {
                            console.log(val);
                        }, err => {
                            console.error(err);
                        });
                    }
                    else if (values.length === 2) {
                        console.log(`kullanici: ${user} - arsivlenecek favori sayfa: ${values[1]}`);
                        userPage.archiveEntryPage(`/favori-entryleri?nick=${user}&p=${values[1]}`, comment).then(val => {
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

        else if (argv.debe) {
            const comment = argv.comment ? argv.comment : config.debe.default_comment;
            debe.archiveDebeEntries(comment).then(val => {
                console.log(val);
            }, err => {
                console.error(err);
            });
        }

        else if (argv.init) database.init();

        else if (argv["list-colors"]) console.log("Kullanilabilecek banner renkleri:\n\tred, \n\tgreen, \n\tyellow, \n\tblue, \n\tmagenta, \n\tcyan, \n\trandom, \n\twhite");

        // else {
        //     console.log(`bilinmeyen veya hatali flag kullanimi. dogru kullanim:`+arguments);
        // }
    }
    catch (e) {
        console.error(`bir seyler kirildi. ${e}`);
    }
}
