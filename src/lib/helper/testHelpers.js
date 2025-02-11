import { getData, getFullData } from '../stats/getData';
import {
  X2GOFTest,
  X2IndTest,
  Samp2TTest,
  MPTTest,
  Samp1TTest,
  Samp2ZTest,
  Samp1ZTest,
  Samp2VarTest,
  ANOVATest,
  LinearRegressionTest
} from '../stats/tests';
import toTitleCase from './toTitleCase';

/**
 * Retrieves the data for a specific column from the source block.
 *
 * @param {Object} props - The properties containing test type information.
 * @param {Object} sourceBlock - The block containing the source data.
 * @param {string} column - The name or index of the column to retrieve data from.
 * @returns {Array|null} The data for the specified column, or null if not found.
 */
export const getColumnData = (props, sourceBlock, column) =>
  sourceBlock !== null &&
  sourceBlock !== undefined &&
  column !== null &&
  column !== undefined
    ? getData(
        sourceBlock.content,
        column,
        sourceBlock.hasHeaders,
        props.testType !== null &&
          (props.testType !== undefined || props.intervalType !== undefined)
          ? props?.testType?.includes('TTest') ||
            props?.intervalType?.includes('TInterval') ||
            props?.intervalType?.includes('VarInterval') ||
            props?.testType?.includes('Regression') ||
            props?.testType?.includes('ANOVA')
            ? 'Quantitative'
            : props?.testType?.includes('ZTest') ||
              props?.intervalType?.includes('ZInterval')
            ? 'Binary'
            : 'Categorical'
          : null
      )
    : null;

/**
 * Runs the specified statistical test on the given data.
 *
 * @param {Array} data - The data to run the test on
 * @param {Array} data2 - The second dataset for the Samp2TTest, Samp2ZTest, Samp2VarTest, and MPTTest
 * @param {Object} props - The object containing all the test data and parameters
 * @param {Object} sourceBlock - The block containing the source data
 * @returns {Object} The results of the test
 */
export const getTestResults = (data, data2, props, sourceBlock) => {
  if (
    (data !== null && data !== undefined) ||
    props.testType === 'X2IndTest' ||
    props.testType === '1WayANOVATest'
  ) {
    try {
      if (props.testType === 'X2GOFTest') {
        return X2GOFTest(data, props.testData.expCounts, props.testData.alpha);
      } else if (props.testType === 'X2IndTest') {
        return X2IndTest(
          props.cols.map((col) => getColumnData(props, sourceBlock, col)),
          props.testData.alpha
        );
      } else if (props.testType === '2SampTTest') {
        return Samp2TTest(
          data,
          data2,
          props.testData.tails,
          props.testData.alpha
        );
      } else if (props.testType === 'MPTTest') {
        return MPTTest(data, data2, props.testData.tails, props.testData.alpha);
      } else if (props.testType === '1SampTTest') {
        return Samp1TTest(
          data,
          props.testData.testAgainst,
          props.testData.tails,
          props.testData.alpha
        );
      } else if (props.testType === '2SampZTest') {
        return Samp2ZTest(
          data,
          data2,
          props.testData.tails,
          props.testData.alpha
        );
      } else if (props.testType === '1SampZTest') {
        return Samp1ZTest(
          data,
          props.testData.testAgainst,
          props.testData.tails,
          props.testData.alpha
        );
      } else if (props.testType === '2SampVarTest') {
        return Samp2VarTest(
          data,
          data2,
          props.testData.tails,
          props.testData.alpha
        );
      } else if (props.testType === '2SampTTest') {
        return Samp2TTest(
          data,
          data2,
          props.testData.tails,
          props.testData.alpha
        );
      } else if (props.testType === 'MPTTest') {
        return MPTTest(data, data2, props.testData.tails, props.testData.alpha);
      } else if (props.testType === '1WayANOVATest') {
        return ANOVATest(
          props.cols.map((col) => getColumnData(props, sourceBlock, col))
        );
      } else if (props.testType === 'RegressionTest') {
        return LinearRegressionTest(data, data2);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};

/**
 * Generates the text for a test block based on the given properties and test results.
 * @param {Object} props - The properties of the test block
 * @param {Object} testResults - The results of the test
 * @returns {string} The text for the test block
 */
export const generateTestText = (props, testResults) => {
  // Check to make sure there's sources and a testType, otherwise we won't be able to render results
  if (
    props.sources !== null &&
    props.sources !== undefined &&
    props.testType !== null &&
    props.testType !== undefined &&
    testResults !== null &&
    testResults !== undefined
  )
    return `
        <strong> ${
          // Replace the value name with the actual name of the test and render it
          props.testType
            .replace('X2', 'Chi-Squared ')
            .replace('GOF', 'Goodness of Fit ')
            .replace('Ind', 'Independence ')
            .replace('Samp', '-Sample ')
            .replace('TTest', 'T-Test')
            .replace('ZTest', 'Z-Test')
            .replace('MP', 'Matched Pairs ')
            .replace('Var', 'Variance ')
            .replace('1WayANOVA', '1-Way ANOVA ')
            .replace('Regression', 'Regression ')

          // Print the identifiers for the column/table we're dealing with
        } for ${
      props.testType == 'X2IndTest'
        ? ''
        : props.col +
          (props.testType.includes('2Samp') || props.testType.includes('MP')
            ? ` vs. ${props.col2} `
            : '') +
          ' of '
    } ${props.sources}<br><br>
        
        </strong>${
          // Chi-Squared GOF test: print the expected counts
          props.testType == 'X2GOFTest'
            ? `Expected Counts: ${props.testData.expCounts}<br><br>`
            : ''
        }

        Null Hypothesis: ${props.testData.h0}<br>
        Alternative Hypothesis: ${props.testData.ha}<br><br>

        ${
          !props.testType.includes('ANOVA') &&
          !props.testType.includes('Regression') &&
          !props.testType.includes('X2')
            ? `Alternative: ${toTitleCase(props.testData.tails)}<br><br>`
            : ''
        }

        Test Statistic: ${testResults.testStatistic}<br>
        P-Value: ${testResults.pValue}

        ${
          props?.testData?.showConclusion
            ? `<br><br>Because the p-value is ${
                testResults.pValue < props.testData.alpha ? 'less' : 'greater'
              } than the significance level of 
        ${props.testData.alpha}, there is ${
                testResults.pValue < props.testData.alpha ? '' : 'no '
              }significant evidence to reject the null 
        hypothesis and accept that ${props.testData.ha}`
            : ''
        }

  `;
  else return 'Configuration Required';
};
