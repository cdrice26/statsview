/**
 * Calculates the grid layout for a given number of items.
 *
 * @param {number} n - The total number of items to be placed in the grid.
 * @returns {Object} An object containing the number of rows and columns.
 * @property {number} rows - The number of rows in the grid.
 * @property {number} columns - The number of columns in the grid (max 3).
 */
export const calculateGridSize = (n) => {
  const maxWidth = 3;
  const columns = Math.min(n, maxWidth);
  const rows = Math.ceil(n / columns);
  return { rows, columns };
};

/**
 * Calculates the row and column position for an item in a grid.
 *
 * @param {number} index - The index of the item in the grid.
 * @param {number} gridWidth - The width (number of columns) of the grid.
 * @returns {Object} An object containing the row and column positions.
 * @property {number} row - The row position of the item.
 * @property {number} column - The column position of the item.
 */
export const calculateRowAndColumn = (index, gridWidth) => {
  const row = Math.floor(index / gridWidth);
  const column = index % gridWidth;
  return { row, column };
};
