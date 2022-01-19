"use strict";

const utils = require("./generalHelpers")

const banner = (color) => {
    console.log(`%c ${utils.colorfulOutput(`
_____________           .__   _____                .__    .__              
\\_   _____/  | __  _____|__| /  _  \\_______   ____ |  |__ |__|__  __ ____  
 |    __)_|  |/ / /  ___/  |/  /_\\  \\_  __ \\_/ ___\\|  |  \\|  \\  \\/ // __ \\ 
 |        \\    <  \\___ \\|  /    |    \\  | \\/\\  \\___|   Y  \\  |\\   /\\  ___/ 
/_______  /__|_ \\/____  >__\\____|__  /__|    \\___  >___|  /__| \\_/  \\___  >
        \\/     \\/     \\/           \\/            \\/     \\/              \\/ 

`, color)}`, 'font-family: monospace');
};

const tr = {
    success: {
        entry: {
            archived: "Entry arsivlendi."
        }
    },

    error: {
        emptyFlag: "Arsiv argumanlari bos olamaz."
    },

    info: {
        usage: `-Kullanim:
    -Arsiv Kullanimi:
        ·[AA]= 'AA' degeri opsiyonel
        -e, --entry        [https://eksisozluk.com/entry/]ENTRY_ID    Tek entry arsivle
        -u, --user         KULLANICI_ADI[,SAYFA]                      Kullanici entrylerini arsivle
        -f, --favorite     KULLANICI_ADI[,SAYFA]                      Kullanici favlarini arsivle
        --debe             Debedeki tum entryleri arsivle

    -Ayar Kullanimi:
        ·Bu ayarlar opsiyonel ve arsiv argumanlariyla kullanmak icindir.
        --sleep            MILISANIYE            Istekler arasinda bekleme suresi.
        --force            Arsivde olan entry'i tekrar arsivle.
        --threads          SAYI                  Paralel gidecek maksimum istek sayisi. (Default 5)
        --comment          Entry(ler) icin kullanilacak eklenme yorumu
        --no-comment       Eklenme yorumunu bos birak

    -Diger
        -h, --help         Bu yardim sayfasini goruntule
        --version          Uygulama versiyonunu goruntule
        --no-banner        Banner'i output etme
        --banner-color     Banner farkli renkte output et
        --list-colors      Kullanilabilecek banner renklerini listele
        --language         Kullanilacak dili degistir`
    }
}

const en = {
    success: {
        entry: {
            archived: "Entry is archived."
        }
    },

    error: {
        emptyFlag: "Archive arguments can not be empty."
    },

    info: {
        usage: `-Usage:
    -Archive Usage:
        ·[AA]= 'AA' is optional
        -e, --entry        [https://eksisozluk.com/entry/]ENTRY_ID    Archive a single entry
        -u, --user         USERNAME[,PAGE]                            Archive user entries
        -f, --favorite     USERNAME[,PAGE]                            Archive user favorites 
        --debe             Archive all entries in debe

    -Settings usage:
        ·These arguments are optional and for use with archive arguments.
        --sleep            MILLISECONDS          Delay between requests.
        --force            Re-archive existent entry.
        --threads          INTEGER               Max async requests. (Default is 5)
        --comment          Adding comment for entry(s)
        --no-comment       Do not add comment

    -Others
        -h, --help         Display this page
        --version          Output app's version
        --no-banner        Don't display banner
        --banner-color     Display banner with a different color
        --list-colors      List avaliable banner colors
        --language         Change app's language`
    }
}

module.exports.banner = banner;
module.exports.tr = tr;
module.exports.en = en;
