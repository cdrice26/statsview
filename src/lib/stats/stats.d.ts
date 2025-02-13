/**
 * Calculates the arithmetic mean (average) of a list of numbers.
 * @param list An array of numbers to calculate the mean from.
 * @returns The arithmetic mean of the input list.
 */
export declare function mean(list: number[]): number;

/**
 * Calculates the standard deviation of a list of numbers.
 * @param list An array of numbers to calculate the standard deviation from.
 * @returns The standard deviation of the input list.
 */
export declare function std(list: number[]): number;

/**
 * Calculates the median (middle value) of a list of numbers.
 * @param list An array of numbers to find the median from.
 * @returns The median value of the input list.
 */
export declare function median(list: number[]): number;

/**
 * Calculates the mode (most frequently occurring value) of a list of numbers.
 * @param list An array of numbers to find the mode from.
 * @returns The mode value of the input list.
 * @throws {Error} If the input list is empty.
 */
export declare function mode(list: number[]): number;

/**
 * Finds the minimum value in a list of numbers.
 * @param list An array of numbers to find the minimum from.
 * @returns The smallest number in the input list.
 */
export declare function min(list: number[]): number;

/**
 * Finds the maximum value in a list of numbers.
 * @param list An array of numbers to find the maximum from.
 * @returns The largest number in the input list.
 */
export declare function max(list: number[]): number;

/**
 * Calculates the range of a list of numbers (difference between max and min).
 * @param list An array of numbers to calculate the range from.
 * @returns The range of the input list.
 */
export declare function range(list: number[]): number;

/**
 * Calculates the Interquartile Range (IQR) of a list of numbers.
 * @param list An array of numbers to calculate the IQR from.
 * @returns The Interquartile Range of the input list.
 */
export declare function iqr(list: number[]): number;

/**
 * Calculates the Pearson correlation coefficient between two lists of numbers.
 * @param list1 First array of numbers.
 * @param list2 Second array of numbers.
 * @returns The Pearson correlation coefficient (r), or null if lists have different lengths.
 */
export declare function correlationCoefficient(
  list1: number[],
  list2: number[]
): number | null;

/**
 * Calculates the coefficient of determination (R-squared) between two lists of numbers.
 * @param list1 First array of numbers.
 * @param list2 Second array of numbers.
 * @returns The R-squared value (coefficient of determination).
 * @throws {Error} If the input lists have different lengths.
 */
export declare function rSquared(list1: number[], list2: number[]): number;

/**
 * Applies a specified statistical function to a list of numbers.
 * @param list An array of numbers to apply the statistic to.
 * @param statName The name of the statistic to calculate.
 * @returns The calculated statistic, or null if the statistic name is invalid.
 */
export declare function applyStatistic(
  list: number[],
  statName: string
): number | null;
