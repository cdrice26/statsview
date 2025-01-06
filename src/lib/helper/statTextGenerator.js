import {
  mean,
  std,
  median,
  iqr,
  min,
  max,
  range,
  rSquared,
  correlationCoefficient
} from '../stats/stats';
import { getData } from '../stats/getData';

const generateStatText = (props, sourceBlock) => {
  let statText = '';
  switch (props.statType) {
    case 'Mean':
      statText = 'Mean';
      break;
    case 'StDev':
      statText = 'Standard Deviation';
      break;
    case 'Median':
      statText = 'Median';
      break;
    case 'IQR':
      statText = 'IQR';
      break;
    case 'Min':
      statText = 'Minimum';
      break;
    case 'Max':
      statText = 'Maximum';
      break;
    case 'Range':
      statText = 'Range';
      break;
    case 'R-Squared':
      statText = 'R-Squared';
      break;
    case 'Correlation Coefficient':
      statText = 'Correlation Coefficient';
      break;
    default:
      return 'Configuration Required';
  }

  if (props.sources != null && props.col != null) {
    statText += ` of ${props.col}${props.col2 ? ` vs. ${props.col2}` : ''}: `;
    switch (props.statType) {
      case 'Mean':
        statText += mean(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'StDev':
        statText += std(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'Median':
        statText += median(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'IQR':
        statText += iqr(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'Min':
        statText += min(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'Max':
        statText += max(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'Range':
        statText += range(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'R-Squared':
        statText += rSquared(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ),
          getData(
            sourceBlock.content,
            props.col2,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      case 'Correlation Coefficient':
        statText += correlationCoefficient(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ),
          getData(
            sourceBlock.content,
            props.col2,
            sourceBlock.hasHeaders,
            'Quantitative'
          )
        );
        break;
      default:
        return 'Configuration Required';
    }
  } else {
    statText += ': Source Configuration Required';
  }

  return statText;
};

export default generateStatText;
