const banner = () => {
    console.log(`%c
_____________           .__   _____                .__    .__              
\\_   _____/  | __  _____|__| /  _  \\_______   ____ |  |__ |__|__  __ ____  
 |    __)_|  |/ / /  ___/  |/  /_\\  \\_  __ \\_/ ___\\|  |  \\|  \\  \\/ // __ \\ 
 |        \\    <  \\___ \\|  /    |    \\  | \\/\\  \\___|   Y  \\  |\\   /\\  ___/ 
/_______  /__|_ \\/____  >__\\____|__  /__|    \\___  >___|  /__| \\_/  \\___  >
        \\/     \\/     \\/           \\/            \\/     \\/              \\/ 

`, 'font-family: monospace');
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
        usage: "Kullanim"
    }
}