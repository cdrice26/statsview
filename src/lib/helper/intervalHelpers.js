import {
  oneSampTInterval,
  oneSampZInterval,
  twoSampTInterval,
  twoSampVarInterval,
  twoSampZInterval
} from '../stats/intervals';

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

export const getColumnNames = (col, col2) => {
  if (col2 === null || col2 === undefined) return col;
  else return col + ' and ' + col2;
};

export const getIntervalText = (
  confidence = 0.95,
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
