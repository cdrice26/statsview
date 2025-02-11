/**
 * Extracts data from a specific column in a source table.
 *
 * @param {Array<Array<string>>} sourceTable - The input table of data.
 * @param {string} col - The column name or index to extract.
 * @param {boolean} hasHeaders - Indicates whether the table has a header row.
 * @param {string} type - The type of data to extract ('Quantitative', 'Binary', or 'Categorical').
 * @returns {Array<number|string>} An array of extracted values from the specified column.
 */
export const getData = (sourceTable, col, hasHeaders, type) => {
  // Find out which column we are taking stats of - the title should equal col
  // if we have headers, otherwise the index is at the end of the name
  let colNum = -1;
  if (hasHeaders) {
    for (let i = 0; i < sourceTable[0].length; i++) {
      if (sourceTable[0][i] == col) colNum = i;
    }
  } else {
    colNum = parseInt(col?.split(' ')[col?.split(' ').length - 1]);
  }
  // If we don't have said column, we can't take stats - return an empty list
  if (colNum == -1 || colNum == undefined || colNum == null) return [];
  // Put the values of the column into a list as numbers and return it
  let returnList = [];
  for (let i = 0; i < sourceTable.length; i++) {
    if (i == 0 && hasHeaders) i++;
    returnList.push(
      type == 'Quantitative'
        ? parseFloat(sourceTable[i][colNum])
        : type == 'Binary'
        ? bitVal(sourceTable[i][colNum])
        : sourceTable[i][colNum]
    );
  }
  return returnList;
};

/**
 * Extracts data from all columns in a source table.
 *
 * @param {Array<Array<string>>} sourceTable - The input table of data.
 * @param {boolean} hasHeaders - Indicates whether the table has a header row.
 * @param {string} [type='Categorical'] - The type of data to extract ('Quantitative', 'Binary', or 'Categorical').
 * @returns {Array<Array<number|string>>} A 2D array of extracted values from all columns.
 */
export const getFullData = (sourceTable, hasHeaders, type = 'Categorical') => {
  let data = [];

  // Put the correct number of columns into data
  sourceTable[0].forEach((item) => {
    data.push([]);
  });

  // Populate those columns with the correct values, omitting the first one if it's a header
  for (let i = hasHeaders ? 1 : 0; i < sourceTable.length; i++) {
    for (let j = 0; j < sourceTable[i].length; j++) {
      data[j].push(
        type == 'Quantitative'
          ? parseFloat(sourceTable[i][j])
          : type == 'Binary'
          ? bitVal(sourceTable[i][j])
          : sourceTable[i][j]
      );
    }
  }

  return data;
};

/**
 * Converts a string representation to a binary value (1 or 0).
 *
 * @param {string} str - The input string to convert.
 * @returns {number} 1 for truthy values, 0 for falsy values.
 * @private
 */
export const bitVal = (str) => {
  if (
    str.toLowerCase() == 'yes' ||
    str.toLowerCase() == 'true' ||
    str.toLowerCase() == 'y' ||
    str.toLowerCase() == 't' ||
    str == '1'
  )
    return 1;
  return 0;
};
