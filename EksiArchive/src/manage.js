const dbOps = require("./database");

const init = () => {
    dbOps.init();
    console.log("database olusturuldu.");
}

module.exports.init = init;
