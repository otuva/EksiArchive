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

module.exports.groupBy = groupBy;