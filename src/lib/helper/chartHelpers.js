import { getData } from '../stats/getData';
import { occurrencesOf } from './count';
import { calculateRowAndColumn, calculateGridSize } from './gridSize';
import { getUnique } from './unique';

/**
 * Rotates source data into an object with columns as keys and their respective data as values.
 *
 * @param {Array<Array<string>>|null} sourceData - The source data table.
 * @param {string[]} cols - Array of column names to extract.
 * @param {Object} sourceBlock - Configuration object for the data source.
 * @param {boolean} sourceBlock.hasHeaders - Indicates whether the source data has headers.
 * @param {string} sourceBlock.dataType - Type of data ('Quantitative', 'Categorical', 'Binary').
 * @returns {Object|null} Rotated data object or null if source data is invalid.
 */
export const rotateData = (sourceData, cols, sourceBlock) =>
  sourceData !== null && sourceData !== undefined
    ? Object.fromEntries(
        cols?.map((col) => [
          col,
          getData(
            sourceData,
            col,
            sourceBlock?.hasHeaders,
            sourceBlock?.dataType
          )
        ]) ?? []
      )
    : null;

/**
 * Extracts the X column data for quantitative charts.
 *
 * @param {Array<Array<string>>} sourceData - The source data table.
 * @param {boolean} hasHeaders - Indicates whether the source data has headers.
 * @param {string} xCol - The column name to use as the X axis.
 * @returns {Array<string|number>|null} Extracted X column data or null if no column is specified.
 */
export const getXCol = (sourceData, hasHeaders, xCol) =>
  xCol != null ? getData(sourceData, xCol, hasHeaders, 'Quantitative') : null;

/**
 * Generates chart data based on the source block, chart type, and rotated data.
 *
 * @param {Object} sourceBlock - Configuration object for the data source.
 * @param {string} sourceBlock.dataType - Type of data ('Quantitative', 'Categorical', 'Binary').
 * @param {string} chartType - Type of chart to generate ('scatter', 'line', 'pie', 'bar', 'histogram').
 * @param {Object} rotatedData - Rotated data object with columns as keys.
 * @param {Array<Object>} x - X-axis data (used for scatter and line charts).
 * @returns {Array<Object>|Object} An array of chart data configurations.
 */
export const generateChartData = (sourceBlock, chartType, rotatedData, x) =>
  sourceBlock?.dataType === 'Quantitative'
    ? chartType === 'scatter' || chartType === 'line'
      ? Object.entries(rotatedData).map((d) => ({
          x: x,
          y: d[1],
          name: d[0],
          type: 'scatter',
          mode: chartType === 'line' ? 'lines' : 'markers'
        }))
      : Object.entries(rotatedData).map((x) => ({
          x: x[1],
          name: x[0],
          type: chartType ?? 'histogram'
        }))
    : sourceBlock?.dataType === 'Categorical' ||
      sourceBlock?.dataType === 'Binary'
    ? Object.entries(rotatedData).map((d, idx) => ({
        [chartType === 'pie' ? 'labels' : 'x']: getUnique(d[1]),
        [chartType === 'pie' ? 'values' : 'y']: getUnique(d[1]).map((x) =>
          occurrencesOf(d[1], x)
        ),
        name: d[0],
        type: chartType ?? 'bar',
        domain:
          chartType === 'pie'
            ? calculateRowAndColumn(
                idx,
                calculateGridSize(Object.keys(rotatedData).length).columns
              )
            : {}
      }))
    : {};

/**
 * Generates a layout configuration for a chart.
 *
 * @param {string} title - The title of the chart.
 * @param {string} chartType - Type of chart being generated.
 * @param {Array<Object>} data - The chart data configuration.
 * @returns {Object} A chart layout configuration object.
 */
export const generateChartLayout = (title, chartType, data) => ({
  title: title,
  height: 400,
  width: 850,
  grid: chartType === 'pie' ? calculateGridSize(data.length) : {}
});
