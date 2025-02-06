import * as GridSize from '../gridSize.js';
import { describe, it, expect } from 'vitest';

describe('calculateGridSize', () => {
  const testCases = [
    {
      input: 0,
      expected: { rows: 0, columns: 0 },
      description: 'should handle zero items'
    },
    {
      input: 1,
      expected: { rows: 1, columns: 1 },
      description: 'should handle single item'
    },
    {
      input: 2,
      expected: { rows: 1, columns: 2 },
      description: 'should handle two items'
    },
    {
      input: 3,
      expected: { rows: 1, columns: 3 },
      description: 'should handle three items (max width)'
    },
    {
      input: 4,
      expected: { rows: 2, columns: 3 },
      description: 'should handle four items (2 rows, 3 columns)'
    },
    {
      input: 5,
      expected: { rows: 2, columns: 3 },
      description: 'should handle five items (2 rows, 3 columns)'
    },
    {
      input: 6,
      expected: { rows: 2, columns: 3 },
      description: 'should handle six items (2 rows, 3 columns)'
    },
    {
      input: 7,
      expected: { rows: 3, columns: 3 },
      description: 'should handle seven items (3 rows, 3 columns)'
    }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      const result = GridSize.calculateGridSize(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('calculateRowAndColumn', () => {
  const gridWidth = 3;
  const testCases = [
    {
      input: { index: 0, gridWidth },
      expected: { row: 0, column: 0 },
      description: 'should calculate first item position'
    },
    {
      input: { index: 1, gridWidth },
      expected: { row: 0, column: 1 },
      description: 'should calculate second item position'
    },
    {
      input: { index: 2, gridWidth },
      expected: { row: 0, column: 2 },
      description: 'should calculate third item position'
    },
    {
      input: { index: 3, gridWidth },
      expected: { row: 1, column: 0 },
      description: 'should calculate fourth item position (start of second row)'
    },
    {
      input: { index: 4, gridWidth },
      expected: { row: 1, column: 1 },
      description: 'should calculate fifth item position'
    },
    {
      input: { index: 5, gridWidth },
      expected: { row: 1, column: 2 },
      description: 'should calculate sixth item position'
    },
    {
      input: { index: 6, gridWidth },
      expected: { row: 2, column: 0 },
      description: 'should calculate seventh item position (start of third row)'
    }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      const result = GridSize.calculateRowAndColumn(
        input.index,
        input.gridWidth
      );
      expect(result).toEqual(expected);
    });
  });

  it('should work with different grid widths', () => {
    const gridWidth = 4;
    const result = GridSize.calculateRowAndColumn(5, gridWidth);
    expect(result).toEqual({ row: 1, column: 1 });
  });
});
