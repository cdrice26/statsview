import { getData, getFullData } from '../stats/getData';
import {
  X2GOFTest,
  X2IndTest,
  Samp2TTest,
  MPTTest,
  Samp1TTest,
  Samp2ZTest,
  Samp1ZTest
} from '../stats/tests';

export const getColumnData = (props, sourceBlock, column) =>
  sourceBlock !== null && sourceBlock !== undefined
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

export const getTestResults = (data, data2, props, sourceBlock) =>
  data != null
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
      : null
    : null;
