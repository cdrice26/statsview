import { DataFrame } from '../DataFrame';

import { describe, expect, test, beforeEach } from 'vitest';

describe('DataFrame', () => {
  let testData: string[][];
  let testLabels: string[];
  let dataFrame: DataFrame;

  beforeEach(() => {
    testData = [
      ['1', '10', 'A'],
      ['2', '', 'B'],
      ['3', '20', ''],
      ['4', '15', 'C'],
      ['4', '15', 'C'] // Duplicate row
    ];
    testLabels = ['ID', 'Value', 'Category'];
    dataFrame = new DataFrame(testData, testLabels);
  });

  test('constructor creates DataFrame with correct data and labels', () => {
    expect(dataFrame).toBeDefined();
  });

  test('fillEmpty replaces empty cells with specified value', () => {
    const result = dataFrame.fillEmpty('Value', '0');
    expect(result.data[1][1]).toBe('0');
    expect(result.data[2][1]).toBe('20');
  });

  test('fillEmptyStat fills empty cells with statistical value', () => {
    const result = dataFrame.fillEmptyStat('Value', 'mean');
    expect(result.data[1][1]).toBe('15');
  });

  test('removeRowsWithEmptyValues removes rows with empty cells', () => {
    const result = dataFrame.removeRowsWithEmptyValues();
    expect(result.data.length).toBe(3);
  });

  test('removeDuplicates removes duplicate rows', () => {
    const result = dataFrame.removeDuplicates();
    expect(result.data.length).toBe(4);
  });

  test('removeRowsWhere removes rows based on condition', () => {
    const result = dataFrame.removeRowsWhere('Category', '=', 'B');
    expect(result.data.length).toBe(4);
    expect(result.data.every((row) => row[2] !== 'B')).toBe(true);
  });

  test('replaceWithStat replaces values based on condition', () => {
    const parsedValues = dataFrame.data.map((row) => parseFloat(row[1]));
    const numericValues = parsedValues.filter((val) => !isNaN(val));
    const meanValue =
      numericValues.reduce((a, b) => a + b, 0) / numericValues.length;

    const result = dataFrame.replaceWithStat('Value', '>', '10', 'mean');

    result.data.forEach((row) => {
      const value = parseFloat(row[1]);
      if (!isNaN(value) && value > 10) {
        expect(row[1]).toBe(meanValue.toString());
      }
    });
  });

  test('replaceWithValue replaces values based on condition', () => {
    const result = dataFrame.replaceWithValue('Value', '>', '10', '100');

    result.data.forEach((row) => {
      const value = parseFloat(row[1]);
      if (!isNaN(value) && value > 10) {
        expect(row[1]).toBe('100');
      }
    });

    // Verify other values remain unchanged
    expect(result.data[0][1]).toBe('10'); // Value less than or equal to 10
    expect(result.data[1][1]).toBe(''); // Empty value
  });

  test('round method rounds numeric values in a column', () => {
    // Add some floating-point values to test rounding
    dataFrame = new DataFrame(
      [
        ['1', '10.456', 'A'],
        ['2', '20.789', 'B'],
        ['3', '15.123', 'C']
      ],
      testLabels
    );

    const result = dataFrame.round('Value', 2);

    result.data.forEach((row) => {
      const value = parseFloat(row[1]);
      if (!isNaN(value)) {
        expect(row[1]).toMatch(/^\d+\.\d{2}$/);
      }
    });

    // Specific rounding checks
    expect(result.data[0][1]).toBe('10.46');
    expect(result.data[1][1]).toBe('20.79');
    expect(result.data[2][1]).toBe('15.12');
  });
});
