import init, {
  one_samp_t_interval,
  two_samp_t_interval,
  one_samp_z_interval,
  two_samp_z_interval,
  two_samp_var_interval
} from 'statmaster';

await init();

/**
 * Calculates a one-sample t-interval (confidence interval for the population mean)
 * @param {number[]} data - An array of numeric sample data
 * @param {number} alpha - The significance level (e.g., 0.05 for 95% confidence interval)
 * @returns {[number, number]} A tuple containing the lower and upper bounds of the confidence interval
 */
export const oneSampTInterval = (data, alpha) =>
  data !== undefined && alpha !== undefined
    ? one_samp_t_interval(data, alpha)
    : null;

/**
 * Calculates a two-sample t-interval (confidence interval for the difference between two population means)
 * @param {number[]} data - An array of numeric data for the first sample
 * @param {number[]} data2 - An array of numeric data for the second sample
 * @param {number} alpha - The significance level (e.g., 0.05 for 95% confidence interval)
 * @returns {[number, number]} A tuple containing the lower and upper bounds of the confidence interval
 */
export const twoSampTInterval = (data, data2, alpha) =>
  data !== undefined && data2 !== undefined && alpha !== undefined
    ? two_samp_t_interval(data, data2, alpha)
    : null;

/**
 * Calculates a one-sample z-interval (confidence interval for the population mean when population standard deviation is known)
 * @param {number[]} data - An array of numeric sample data
 * @param {number} alpha - The significance level (e.g., 0.05 for 95% confidence interval)
 * @returns {[number, number]} A tuple containing the lower and upper bounds of the confidence interval
 */
export const oneSampZInterval = (data, alpha) =>
  data !== undefined && alpha !== undefined
    ? one_samp_z_interval(data, alpha)
    : null;

/**
 * Calculates a two-sample z-interval (confidence interval for the difference between two population means when population standard deviations are known)
 * @param {number[]} data - An array of numeric data for the first sample
 * @param {number[]} data2 - An array of numeric data for the second sample
 * @param {number} alpha - The significance level (e.g., 0.05 for 95% confidence interval)
 * @returns {[number, number]} A tuple containing the lower and upper bounds of the confidence interval
 */
export const twoSampZInterval = (data, data2, alpha) =>
  data !== undefined && data2 !== undefined && alpha !== undefined
    ? two_samp_z_interval(data, data2, alpha)
    : null;

/**
 * Calculates a two-sample variance interval (confidence interval for the ratio of population variances)
 * @param {number[]} data - An array of numeric data for the first sample
 * @param {number[]} data2 - An array of numeric data for the second sample
 * @param {number} alpha - The significance level (e.g., 0.05 for 95% confidence interval)
 * @returns {[number, number]} A tuple containing the lower and upper bounds of the confidence interval
 */
export const twoSampVarInterval = (data, data2, alpha) =>
  data !== undefined && data2 !== undefined && alpha !== undefined
    ? two_samp_var_interval(data, data2, alpha)
    : null;
