import statistics from '@stdlib/stats';
import { std } from './stats';
import { getUnique, getUniqueFromMatrix } from '../helper/unique';
import { occurrencesOf } from '../helper/count';
import init, { variance_test, anova_1way_test } from 'statmaster';

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

    const result = statistics.chi2gof(obsCounts, expCounts, {
      alpha: parseFloat(alpha)
    });

    return {
      pValue: result.pValue,
      testStatistic: result.statistic
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

    const result = statistics.chi2test(obsCounts, {
      alpha: parseFloat(alpha)
    });

    return {
      pValue: result.pValue,
      testStatistic: result.statistic,
      expected: result?.expected
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
    console.log(result);
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
    const result = statistics.ttest2(data, data2, {
      alpha: parseFloat(alpha),
      alternative: tails
    });
    return {
      pValue: result.pValue,
      testStatistic: result.statistic
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
    const result = statistics.ttest(data, data2, {
      alpha: parseFloat(alpha),
      alternative: tails
    });
    return {
      pValue: result.pValue,
      testStatistic: result.statistic
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
      pValue: result.pValue,
      testStatistic: result.statistic
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
    const result = statistics.ttest(data, {
      mu: parseFloat(testAgainst),
      alpha: parseFloat(alpha),
      alternative: tails
    });
    return {
      pValue: result.pValue,
      testStatistic: result.statistic
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
    const result = statistics.ztest2(data, data2, std(data), std(data2), {
      alpha: parseFloat(alpha),
      alternative: tails
    });
    return {
      pValue: result.pValue,
      testStatistic: result.statistic
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
    const result = statistics.ztest(data, std(data), {
      mu: parseFloat(testAgainst),
      alpha: parseFloat(alpha),
      alternative: tails
    });
    return {
      pValue: result.pValue,
      testStatistic: result.statistic
    };
  }
};
