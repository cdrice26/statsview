import { getData } from '../stats/getData';
import { occurrencesOf } from './count';
import { calculateRowAndColumn, calculateGridSize } from './gridSize';
import { getUnique } from './unique';

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

export const getXCol = (sourceData, hasHeaders, xCol) =>
  xCol != null ? getData(sourceData, xCol, hasHeaders, 'Quantitative') : null;

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

export const generateChartLayout = (title, chartType, data) => ({
  title: title,
  height: 400,
  width: 850,
  grid: chartType === 'pie' ? calculateGridSize(data.length) : {}
});
