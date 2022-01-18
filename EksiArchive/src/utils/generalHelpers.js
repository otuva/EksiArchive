"use strict";

const groupBy = (array, N) => {
    const arrLen = array.length;
    const maxObjectKeys = Math.ceil(arrLen/N)-1;
    // N -= 1;
    let object = {};
    let objectKey=0;
    let batchArray = [];
    let allTime=0;

    let current=1;

    array.forEach(val => {
        // console.log(val);
        batchArray.push(val);

        // if limit reach or array end
        if (current === N || (objectKey === maxObjectKeys && allTime === arrLen-1)) {
            // add array as object key&value and reset values
            object[objectKey] = batchArray;
            batchArray = [];
            objectKey++;
            current=0;
        }
        allTime++;
        current++;

    });
    return object;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const colorfulOutput = (string, color) => {
    switch (color) {
        //red, green, yellow, blue, magenta, cyan, random, anything else = (colorless)
        case 'red':
            return `\x1b[31m${string}\x1b[0m`;
        case 'green':
            return `\x1b[32m${string}\x1b[0m`;
        case 'yellow':
            return `\x1b[33m${string}\x1b[0m`;
        case 'blue':
            return `\x1b[34m${string}\x1b[0m`;
        case 'magenta':
            return `\x1b[35m${string}\x1b[0m`;
        case 'cyan':
            return `\x1b[36m${string}\x1b[0m`;
        case 'random':
            const val = Math.floor(Math.random() * (37 - 31) + 31);
            return `\x1b[${val}m${string}\x1b[0m`;
        default:
            return string;
    }
}

const apostropheEscape = (string) => {
    return string.replace(/'/g, "''");
};

module.exports.groupBy = groupBy;
module.exports.sleep = sleep;
module.exports.colorfulOutput = colorfulOutput;
module.exports.apostropheEscape = apostropheEscape;
