/**
 * Checks to see how many times an item appears in an array
 * @param {*} arr - an array
 * @param {*} item - the thing you want to count instances of
 * @returns the number of times item appears in arr
 */
export const occurrencesOf = (arr, item) => {
  let count = 0;
  arr.forEach((thing) => {
    if (thing === item) count++;
  });
  return count;
};
