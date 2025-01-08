import {
  oneSampTInterval,
  oneSampZInterval,
  twoSampTInterval,
  twoSampVarInterval,
  twoSampZInterval
} from '../stats/intervals';

/**
 * Calculates the confidence interval based on the specified interval type and data.
 *
 * @param {string} intervalType - The type of interval to calculate (e.g., '1SampTInterval', '2SampZInterval')
 * @param {number[]} data - The primary dataset for interval calculation
 * @param {number[]} data2 - The secondary dataset for two-sample intervals (null if no second column)
 * @param {number} confidenceLevel - The confidence level for the interval (e.g., 0.95 for 95% confidence)
 * @returns {number[]|null} The calculated confidence interval or null if invalid parameters
 */
export const getInterval = (intervalType, data, data2, confidenceLevel) => {
  const alpha = 1 - confidenceLevel;
  if (
    data !== null &&
    data !== undefined &&
    alpha !== null &&
    alpha !== undefined
  ) {
    if (intervalType === '1SampTInterval') return oneSampTInterval(data, alpha);
    else if (
      intervalType === '2SampTInterval' &&
      data2 !== null &&
      data2 !== undefined
    )
      return twoSampTInterval(data, data2, alpha);
    else if (
      intervalType === '2SampZInterval' &&
      data2 !== null &&
      data2 !== undefined
    )
      return twoSampZInterval(data, data2, alpha);
    else if (intervalType === '1SampZInterval')
      return oneSampZInterval(data, alpha);
    else if (
      intervalType === '2SampVarInterval' &&
      data2 !== null &&
      data2 !== undefined
    )
      return twoSampVarInterval(data, data2, alpha);
    else return null;
  } else {
    return null;
  }
};

/**
 * Retrieves the parameter description for a given interval type.
 *
 * @param {string} intervalType - The type of interval
 * @returns {string|null} A descriptive string of the parameter being estimated, or null if unknown
 */
export const getParameter = (intervalType) => {
  if (intervalType === '1SampTInterval') return 'mean of';
  else if (intervalType === '2SampTInterval')
    return 'difference between means of';
  else if (intervalType === '2SampZInterval')
    return 'difference between proportions of';
  else if (intervalType === '1SampZInterval') return 'proportion of';
  else if (intervalType === '2SampVarInterval') return 'ratio of variances of';
  else return null;
};

/**
 * Combines column names for interval description.
 *
 * @param {string} col - The primary column name
 * @param {string} [col2=null] - The secondary column name (optional)
 * @returns {string} Combined column name(s)
 */
export const getColumnNames = (col, col2) => {
  if (col2 === null || col2 === undefined) return col;
  else return col + ' and ' + col2;
};

/**
 * Generates a human-readable confidence interval description.
 *
 * @param {number} confidence - The confidence level
 * @param {string} intervalType - The type of interval being calculated
 * @param {string} col - The primary column name
 * @param {string} col2 - The secondary column name (null if no second column)
 * @param {number[]} interval - The calculated interval values
 * @returns {string} A formatted confidence interval description
 */
export const getIntervalText = (
  confidence,
  intervalType,
  col,
  col2,
  interval
) =>
  col !== null &&
  interval !== null &&
  confidence !== null &&
  col !== undefined &&
  interval !== undefined &&
  confidence !== undefined &&
  interval.length === 2
    ? `${Math.round(
        confidence * 100
      )}% confidence interval for the ${getParameter(
        intervalType
      )} ${getColumnNames(
        col,
        intervalType?.includes('2Samp') ? col2 : null
      )}: [${interval[0]}, ${interval[1]}]`
    : 'Configuration Required';
