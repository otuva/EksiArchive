const dbOps = require("./db/db");

const init = () => {
    dbOps.init();
    console.log("database olusturuldu.");
}

module.exports.init = init;