// Get the data from sourceTable
export const getData = (sourceTable, col, hasHeaders, type) => {
  // Find out which column we are taking stats of - the title should equal col
  // if we have headers, otherwise the index is at the end of the name
  let colNum = -1;
  if (hasHeaders) {
    for (let i = 0; i < sourceTable[0].length; i++) {
      if (sourceTable[0][i] == col) colNum = i;
    }
  } else {
    colNum = parseInt(col.split(' ')[col.split(' ').length - 1]);
  }
  // If we don't have said column, we can't take stats - return an empty list
  if (colNum == -1) return [];
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

// Get the data from sourceTable, for all columns
// Only categorical is supported since this is only used for the X2IndTest
export const getFullData = (sourceTable, hasHeaders) => {
  let data = [];

  // Put the correct number of columns into data
  sourceTable[0].forEach((item) => {
    data.push([]);
  });

  // Populate those columns with the correct values, omitting the first one if it's a header
  for (let i = hasHeaders ? 1 : 0; i < sourceTable.length; i++) {
    for (let j = 0; j < sourceTable[i].length; j++) {
      data[j].push(sourceTable[i][j]);
    }
  }

  return data;
};

// Convert a string using common values for true and false to a bit (1 or 0)
const bitVal = (str) => {
  if (
    str == 'Yes' ||
    str == 'yes' ||
    str == 'True' ||
    str == 'true' ||
    str == 'Y' ||
    str == 'y' ||
    str == 'T' ||
    str == 't' ||
    str == '1'
  )
    return 1;
  return 0;
};
