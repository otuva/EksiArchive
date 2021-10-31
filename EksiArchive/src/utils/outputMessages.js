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

tr = {
    success: {
        entry: {
            archived: "Entry arsivlendi."
        }
    },

    error: {
        emptyFlag: "Arsiv argumanlari bos olamaz."
    },

    info: {
        usage: "Kullanim"
    }
}

en = {
    success: {
        entry: {
            archived: "Entry is archived."
        }
    },

    error: {
        emptyFlag: "Archive arguments can not be empty."
    },

    info: {
        usage: "Usage"
    }
}

module.exports.banner = banner;
