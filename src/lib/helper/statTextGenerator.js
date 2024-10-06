import { mean, std, median, iqr, min, max, range } from '../stats/stats';
import { getData } from '../stats/getData';

const generateStatText = (props, sourceBlock) =>
  props.statType == 'Mean'
    ? 'Mean' +
      (props.sources != null // If there's a source
        ? ' of ' +
          props.col +
          ': ' +
          mean(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          ) // Display the mean
        : ': Source Configuration Required') // Otherwise notify that there is no source
    : props.statType == 'StDev'
    ? 'Standard Deviation' +
      (props.sources != null && props.col != null
        ? ' of ' +
          props.col +
          ': ' +
          std(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          )
        : ': Source Configuration Required')
    : props.statType == 'Median'
    ? 'Median' +
      (props.sources != null && props.col != null
        ? ' of ' +
          props.col +
          ': ' +
          median(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          )
        : ': Source Configuration Required')
    : props.statType == 'IQR'
    ? 'IQR' +
      (props.sources != null && props.col != null
        ? ' of ' +
          props.col +
          ': ' +
          iqr(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          )
        : ': Source Configuration Required')
    : props.statType == 'Min'
    ? 'Minimum' +
      (props.sources != null && props.col != null
        ? ' of ' +
          props.col +
          ': ' +
          min(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          )
        : ': Source Configuration Required')
    : props.statType == 'Max'
    ? 'Maximum' +
      (props.sources != null && props.col != null
        ? ' of ' +
          props.col +
          ': ' +
          max(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          )
        : ': Source Configuration Required')
    : props.statType == 'Range'
    ? 'Range' +
      (props.sources != null && props.col != null
        ? ' of ' +
          props.col +
          ': ' +
          range(
            getData(
              sourceBlock.content,
              props.col,
              sourceBlock.hasHeaders,
              'Quantitative'
            )
          )
        : ': Source Configuration Required')
    : 'Configuration Required';

export default generateStatText;
