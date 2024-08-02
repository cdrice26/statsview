export const calculateGridSize = (n) => {
  const maxWidth = 3;
  const columns = Math.min(n, maxWidth);
  const rows = Math.ceil(n / columns);
  return { rows, columns };
};

export const calculateRowAndColumn = (index, gridWidth) => {
  const row = Math.floor(index / gridWidth);
  const column = index % gridWidth;
  return { row, column };
};
