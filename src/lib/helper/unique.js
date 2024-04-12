/**
 * Function to get an array of all the unique items in another array
 * @param {*} arr
 * @returns an array of the unique items in arr
 */
export const getUnique = (arr) => {
    let unique = [];
    arr.forEach((item) => {
        if (!unique.includes(item)) unique.push(item);
    });
    return unique;
};

/**
 * Function to get an array of all the unique items in a matrix (2d array)
 * @param {*} matrix
 * @returns an array of the unique items in arr
 */
export const getUniqueFromMatrix = (matrix) => {
    let unique = [];
    matrix.forEach((item) => {
        item.forEach((thing) => {
            if (!unique.includes(thing)) unique.push(thing);
        });
    });
    return unique;
};
