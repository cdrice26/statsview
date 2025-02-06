import { getUnique, getUniqueFromMatrix } from '../helper/unique';
import { occurrencesOf } from '../helper/count';
import init, {
  variance_test,
  anova_1way_test,
  regression_test,
  one_samp_t_test,
  two_samp_t_test,
  matched_pairs_t_test,
  one_samp_z_test,
  two_samp_z_test,
  chi2_gof_test,
  chi2_ind_test
} from 'statmaster';

await init();

/**
 * Chi-Squared Goodness-of-Fit Test
 * @param {Array} data - The raw data (not counts!)
 * @param {Array} testAgainst - The expected counts, as an array
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const X2GOFTest = (data, testAgainst, alpha) => {
  if (data != undefined && testAgainst != undefined && alpha != undefined) {
    // Convert the raw data to counts
    const unique = getUnique(data);
    const obsCounts = unique.map((item) => occurrencesOf(data, item));

    // Parse the expCounts string
    const expCounts = testAgainst.map((item) => parseFloat(item));

    // Validate the expected counts
    if (obsCounts.length != expCounts.length) return null;

    const result = chi2_gof_test(obsCounts, expCounts);

    return {
      pValue: result.p,
      testStatistic: result.x2
    };
  }
};

/**
 * Chi-Squared Independence Test
 * @param {Array} data - The raw data (not counts!)
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const X2IndTest = (data, alpha) => {
  if (data != undefined && alpha != undefined) {
    // Convert the raw data to counts
    const unique = getUniqueFromMatrix(data);
    let obsCounts = [];
    for (let i = 0; i < data.length; i++) {
      obsCounts.push(unique.map((item) => occurrencesOf(data[i], item)));
    }

    const result = chi2_ind_test(obsCounts);

    return {
      pValue: result.p,
      testStatistic: result.x2,
      expected: result?.exp
    };
  }
};

/**
 * 2-Sample Variance Test
 * @param {Array} data - The raw data for column 1
 * @param {Array} data2 - The raw data for column 2
 * @param {'two-sided' | 'less' | 'greater'} tails - two-sided, less, greater
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const Samp2VarTest = (data, data2, tails, alpha) => {
  if (
    data != undefined &&
    data2 != undefined &&
    tails != undefined &&
    alpha != undefined
  ) {
    const result = variance_test(
      data.map((item) => parseFloat(item)),
      data2.map((item) => parseFloat(item)),
      tails
    );
    return {
      pValue: result.p,
      testStatistic: result.f
    };
  }
};

/**
 * 2-Sample T-Test
 * @param {Array} data - The raw data for column 1
 * @param {Array} data2 - The raw data for column 2
 * @param {'two-sided' | 'less' | 'greater'} tails - two-sided, less, greater
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const Samp2TTest = (data, data2, tails, alpha) => {
  if (
    data != undefined &&
    data2 != undefined &&
    tails != undefined &&
    alpha != undefined
  ) {
    const result = two_samp_t_test(data, data2, 0, tails);
    return {
      pValue: result.p,
      testStatistic: result.t
    };
  }
};

/**
 * Matched Pairs T-Test
 * @param {Array} data - The raw data for column 1
 * @param {Array} data2 - The raw data for column 2
 * @param {'two-sided' | 'less' | 'greater'} tails - two-sided, less, greater
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const MPTTest = (data, data2, tails, alpha) => {
  if (
    data != undefined &&
    data2 != undefined &&
    tails != undefined &&
    alpha != undefined
  ) {
    const result = matched_pairs_t_test(data, data2, 0, tails);
    return {
      pValue: result.p,
      testStatistic: result.t
    };
  }
};

/**
 * 1-Way ANOVA Test
 * @param {Array} data - The raw data
 * @returns an object with pValue and testStatistic
 */
export const ANOVATest = (data) => {
  if (data != undefined) {
    const result = anova_1way_test(data);
    return {
      pValue: result.p,
      testStatistic: result.f
    };
  }
};

/**
 * Linear Regression Test
 * @param {Array} x - The raw data for x
 * @param {Array} y - The raw data for y
 * @returns an object with pValue and testStatistic
 */
export const LinearRegressionTest = (x, y) => {
  if (x != undefined && y != undefined) {
    const result = regression_test(
      x.map((item) => parseFloat(item)),
      y.map((item) => parseFloat(item))
    );
    return {
      pValue: result.p,
      testStatistic: result.f
    };
  }
};

/**
 * 1-Sample T-Test
 * @param {Array} data - The raw data
 * @param {'two-sided' | 'less' | 'greater'} tails - two-sided, less, greater
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const Samp1TTest = (data, testAgainst, tails, alpha) => {
  if (
    data != undefined &&
    testAgainst != undefined &&
    tails != undefined &&
    alpha != undefined
  ) {
    const result = one_samp_t_test(data, tails, testAgainst);
    return {
      pValue: result.p,
      testStatistic: result.t
    };
  }
  return null;
};

/**
 * 2-Sample Z-Test
 * @param {Array} data - The raw data for column 1
 * @param {Array} data2 - The raw data for column 2
 * @param {'two-sided' | 'less' | 'greater'} tails - two-sided, less, greater
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const Samp2ZTest = (data, data2, tails, alpha) => {
  if (
    data != undefined &&
    data2 != undefined &&
    tails != undefined &&
    alpha != undefined
  ) {
    const result = one_samp_z_test(data, tails, 0);
    return {
      pValue: result.p,
      testStatistic: result.z
    };
  }
};

/**
 * 1-Sample Z-Test
 * @param {Array} data - The raw data for column 1
 * @param {'two-sided' | 'less' | 'greater'} tails - two-sided, less, greater
 * @param {*} alpha - The significance level
 * @returns an object with pValue and testStatistic
 */
export const Samp1ZTest = (data, testAgainst, tails, alpha) => {
  if (
    data != undefined &&
    testAgainst != undefined &&
    tails != undefined &&
    alpha != undefined
  ) {
    const result = one_samp_z_test(data, tails, testAgainst);
    return {
      pValue: result.p,
      testStatistic: result.z
    };
  }
};
