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
  ANOVATest
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
        props.testType !== null && props.testType !== undefined
          ? props.testType.includes('TTest')
            ? 'Quantitative'
            : props.testType.includes('ZTest')
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
    if (props.testType === 'X2GOFTest') {
      return X2GOFTest(data, props.testData.expCounts, props.testData.alpha);
    } else if (props.testType === 'X2IndTest') {
      return X2IndTest(
        getFullData(sourceBlock.content, sourceBlock.hasHeaders),
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
        getFullData(sourceBlock.content, sourceBlock.hasHeaders)
      );
    }
  }
};

/**
 * @deprecated This function is deprecated and may be removed in future releases.
 * @param {Array} data - The first set of data for the test.
 * @param {Array} data2 - The second set of data for the test, if applicable.
 * @param {Object} props - The properties containing test configuration.
 * @param {Object} sourceBlock - The block containing the source data.
 * @returns {Object|boolean} The test results object or a boolean indicating if test parameters are valid.
 */
export const getTestResultsOld = (data, data2, props, sourceBlock) =>
  (data !== null && data !== undefined) || props.testType === 'X2IndTest'
    ? props.testType == 'X2GOFTest'
      ? X2GOFTest(data, props.testData.expCounts, props.testData.alpha)
      : props.testType == 'X2IndTest'
      ? X2IndTest(
          getFullData(sourceBlock.content, sourceBlock.hasHeaders),
          props.testData.alpha
        )
      : props.testType == '2SampTTest'
      ? Samp2TTest(data, data2, props.testData.tails, props.testData.alpha)
      : props.testType == 'MPTTest'
      ? MPTTest(data, data2, props.testData.tails, props.testData.alpha)
      : props.testType == '1SampTTest'
      ? Samp1TTest(
          data,
          props.testData.testAgainst,
          props.testData.tails,
          props.testData.alpha
        )
      : props.testType == '2SampZTest'
      ? Samp2ZTest(data, data2, props.testData.tails, props.testData.alpha)
      : props.testType == '1SampZTest'
      ? Samp1ZTest(
          data,
          props.testData.testAgainst,
          props.testData.tails,
          props.testData.alpha
        )
      : props.testType == '2SampVarTest'
      ? Samp2VarTest(data, data2, props.testData.tails, props.testData.alpha)
      : null
    : null;

/**
 * Generates the text for a test block based on the given properties and test results.
 * @param {Object} props - The properties of the test block
 * @param {Object} testResults - The results of the test
 * @param {Object} sourceBlock - The block containing the source data
 * @returns {string} The text for the test block
 */
export const generateTestText = (props, testResults, sourceBlock) =>
  // Check to make sure there's sources and a testType, otherwise we won't be able to render results
  props.sources != null && props.testType != null && testResults != null
    ? `
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
            .replace('VarTest', 'Variance Test')
            .replace('1WayANOVA', '1- Way ANOVA ')

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

        Random Sample: ${props.testData.rand}<br>
        Large Counts: ${
          props.testType == 'X2GOFTest'
            ? props.testData.expCounts.every((x) => x > 5)
            : props.testType == 'X2IndTest'
            ? testResults.expected._buffer.every((x) => x > 5)
            : props.testType.includes('TTest') ||
              props.testType.includes('VarTest')
            ? props.col
              ? getData(
                  sourceBlock.content,
                  props.col,
                  sourceBlock.hasHeaders,
                  'Quantitative'
                ).length > 30 &&
                (props.col2
                  ? getData(
                      sourceBlock.content,
                      props.col2,
                      sourceBlock.hasHeaders,
                      'Quantitative'
                    ).length > 30
                  : true)
              : sourceBlock.content.length > 30
            : props.testType == '1SampZTest'
            ? getData(
                sourceBlock.content,
                props.col,
                sourceBlock.hasHeaders,
                'Binary'
              ).filter((x) => x == 1).length > 10 &&
              getData(
                sourceBlock.content,
                props.col,
                sourceBlock.hasHeaders,
                'Binary'
              ).filter((x) => x == 0).length > 10
            : props.testType == '2SampZTest'
            ? getData(
                sourceBlock.content,
                props.col,
                sourceBlock.hasHeaders,
                'Binary'
              ).filter((x) => x == 1).length > 10 &&
              getData(
                sourceBlock.content,
                props.col,
                sourceBlock.hasHeaders,
                'Binary'
              ).filter((x) => x == 0).length > 10 &&
              getData(
                sourceBlock.content,
                props.col2,
                sourceBlock.hasHeaders,
                'Binary'
              ).filter((x) => x == 1).length > 10 &&
              getData(
                sourceBlock.content,
                props.col2,
                sourceBlock.hasHeaders,
                'Binary'
              ).filter((x) => x == 0).length > 10
            : null
        }<br><br>

        Alternative: ${toTitleCase(props.testData.tails)}<br><br>

        Test Statistic: ${testResults.testStatistic}<br>
        P-Value: ${testResults.pValue}<br><br>

        Because the p-value is ${
          testResults.pValue < props.testData.alpha ? 'less' : 'greater'
        } than the significance level of 
        ${props.testData.alpha}, there is ${
        testResults.pValue < props.testData.alpha ? '' : 'no '
      }significant evidence to reject the null 
        hypothesis and accept that ${props.testData.ha}

  `
    : 'Configuration Required';
