/**
 * Calculates the arithmetic mean (average) of a list of numbers.
 * @param {number[]} list - An array of numbers to calculate the mean from.
 * @returns {number} The arithmetic mean of the input list.
 */
export const mean = (list) => {
  let mean = 0;
  list.forEach((item) => (mean += item));
  mean /= list.length;
  return mean;
};

/**
 * Calculates the standard deviation of a list of numbers.
 * @param {number[]} list - An array of numbers to calculate the standard deviation from.
 * @returns {number} The standard deviation of the input list.
 */
export const std = (list) => {
  const mn = mean(list);
  const squares = list.map((item) => Math.pow(mn - item, 2));
  let sum = 0;
  squares.forEach((item) => (sum += item));
  sum /= squares.length;
  return Math.sqrt(sum);
};

/**
 * Calculates the median (middle value) of a list of numbers.
 * @param {number[]} list - An array of numbers to find the median from.
 * @returns {number} The median value of the input list.
 */
export const median = (list) => {
  const values = [...list].sort((a, b) => a - b);
  const half = Math.floor(values.length / 2);
  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2;
};

/**
 * Calculates the mode (most frequently occurring value) of a list of numbers.
 * @param {number[]} list - An array of numbers to find the mode from.
 * @returns {number} The mode value of the input list.
 * @throws {Error} If the input list is empty.
 */
export const mode = (list) => {
  const values = [...list];
  const counts = {};
  values.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(counts));
  const modeKeys = Object.keys(counts).filter(
    (key) => counts[key] === maxCount
  );
  return Number(modeKeys[0]);
};

/**
 * Finds the minimum value in a list of numbers.
 * @param {number[]} list - An array of numbers to find the minimum from.
 * @returns {number} The smallest number in the input list.
 */
export const min = (list) => {
  let min = list[0];
  for (let i = 1; i < list.length; i++) if (list[i] < min) min = list[i];
  return min;
};

/**
 * Finds the maximum value in a list of numbers.
 * @param {number[]} list - An array of numbers to find the maximum from.
 * @returns {number} The largest number in the input list.
 */
export const max = (list) => {
  let max = list[0];
  for (let i = 1; i < list.length; i++) if (list[i] > max) max = list[i];
  return max;
};

/**
 * Calculates the range of a list of numbers (difference between max and min).
 * @param {number[]} list - An array of numbers to calculate the range from.
 * @returns {number} The range of the input list.
 */
export const range = (list) => {
  return max(list) - min(list);
};

/**
 * Calculates the Interquartile Range (IQR) of a list of numbers.
 * @param {number[]} list - An array of numbers to calculate the IQR from.
 * @returns {number} The Interquartile Range of the input list.
 */
export const iqr = (list) => {
  const values = [...list].sort((a, b) => a - b);
  const medianIndex = list.length / 2;
  const q1 = median(
    values.slice(
      0,
      Math.floor(medianIndex) == medianIndex
        ? medianIndex
        : Math.floor(medianIndex)
    )
  );
  const q3 = median(
    values.slice(
      Math.floor(medianIndex) == 0 ? medianIndex : Math.ceil(medianIndex),
      values.length
    )
  );
  return q3 - q1;
};

/**
 * Calculates the Pearson correlation coefficient between two lists of numbers.
 * @param {number[]} list1 - First array of numbers.
 * @param {number[]} list2 - Second array of numbers.
 * @returns {number} The Pearson correlation coefficient (r).
 * @throws {Error} If the input lists have different lengths.
 */
export const correlationCoefficient = (list1, list2) => {
  // Validate input lists have the same length
  if (list1.length !== list2.length) {
    return null;
  }

  const n = list1.length;

  // Calculate means
  const mean1 = mean(list1);
  const mean2 = mean(list2);

  // Calculate covariance and standard deviations
  let covariance = 0;
  let sumSquaredDiff1 = 0;
  let sumSquaredDiff2 = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = list1[i] - mean1;
    const diff2 = list2[i] - mean2;

    covariance += diff1 * diff2;
    sumSquaredDiff1 += diff1 * diff1;
    sumSquaredDiff2 += diff2 * diff2;
  }

  // Calculate correlation coefficient
  return covariance / Math.sqrt(sumSquaredDiff1 * sumSquaredDiff2);
};

/**
 * Calculates the coefficient of determination (R-squared) between two lists of numbers.
 * @param {number[]} list1 - First array of numbers.
 * @param {number[]} list2 - Second array of numbers.
 * @returns {number} The R-squared value (coefficient of determination).
 * @throws {Error} If the input lists have different lengths.
 */
export const rSquared = (list1, list2) => {
  const r = correlationCoefficient(list1, list2);
  return r * r;
};

export const applyStatistic = (list, statName) => {
  switch (statName.toLowerCase()) {
    case 'mean':
      return mean(list);
    case 'stdev':
      return std(list);
    case 'median':
      return median(list);
    case 'mode':
      return mode(list);
    case 'iqr':
      return iqr(list);
    case 'range':
      return range(list);
    case 'min':
      return min(list);
    case 'max':
      return max(list);
    default:
      return null;
  }
};
