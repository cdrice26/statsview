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

/**
 * Generates a descriptive text representation of a statistical calculation.
 *
 * @param {Object} props - Configuration object for the statistical text generation.
 * @param {string} [props.statType] - The type of statistical calculation to perform.
 *                                   Supported types: 'Mean', 'StDev', 'Median', 'IQR',
 *                                   'Min', 'Max', 'Range', 'R-Squared', 'Correlation Coefficient'.
 * @param {string} [props.col] - The primary column name for statistical calculation.
 * @param {string} [props.col2] - The secondary column name for comparative statistics
 *                                 (used in R-Squared and Correlation Coefficient).
 * @param {string} [props.sources] - The source block ID containing the data for the calculation.
 * @param {Object} sourceBlock - The data source block containing content and header information.
 * @param {Array<Array<string>>} sourceBlock.content - The raw data content.
 * @param {boolean} sourceBlock.hasHeaders - Indicates whether the data has header rows.
 *
 * @returns {string} A human-readable string describing the statistical calculation,
 *                   including the statistic type and its calculated value.
 *                   Returns 'Configuration Required' or 'Source Configuration Required'
 *                   if insufficient information is provided.
 *
 * @example
 * // Returns "Mean of Age: 25.5"
 * generateStatText(
 *   { statType: 'Mean', col: 'Age' },
 *   { content: [['Name', 'Age'], ['John', '25'], ['Jane', '26']], hasHeaders: true }
 * )
 */
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
          ).map((x) => Number(x))
        );
        break;
      case 'StDev':
        statText += std(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'Median':
        statText += median(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'IQR':
        statText += iqr(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'Min':
        statText += min(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'Max':
        statText += max(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'Range':
        statText += range(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'R-Squared':
        statText += rSquared(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x)),
          getData(
            sourceBlock.content,
            props.col2,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
        );
        break;
      case 'Correlation Coefficient':
        statText += correlationCoefficient(
          getData(
            sourceBlock.content,
            props.col,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x)),
          getData(
            sourceBlock.content,
            props.col2,
            sourceBlock.hasHeaders,
            'Quantitative'
          ).map((x) => Number(x))
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
