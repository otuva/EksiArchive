const dbOps = require("./dbOps");

const init = () => {
    dbOps.init();
    console.log("database olusturuldu.");
}

module.exports.init = init;