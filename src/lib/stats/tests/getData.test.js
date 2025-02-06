import * as DataGetters from '../getData';
import { describe, it, expect } from 'vitest';

describe('bitVal', () => {
  const testCases = [
    ['Yes', 1],
    ['yes', 1],
    ['True', 1],
    ['true', 1],
    ['Y', 1],
    ['y', 1],
    ['T', 1],
    ['t', 1],
    ['1', 1],
    ['No', 0],
    ['no', 0],
    ['False', 0],
    ['false', 0],
    ['N', 0],
    ['n', 0],
    ['F', 0],
    ['f', 0],
    ['0', 0],
    ['random', 0]
  ];

  testCases.forEach(([input, expected]) => {
    it(`should convert "${input}" to ${expected}`, () => {
      const result = DataGetters.bitVal(input?.toString());
      expect(result).toBe(expected);
    });
  });
});

describe('getData', () => {
  const sourceTable = [
    ['Name', 'Age', 'Height'],
    ['Alice', '25', '165'],
    ['Bob', '30', '180'],
    ['Charlie', '35', '175']
  ];

  it('should extract quantitative data with headers', () => {
    const result = DataGetters.getData(
      sourceTable,
      'Age',
      true,
      'Quantitative'
    );
    expect(result).toEqual([25, 30, 35]);
  });

  it('should extract categorical data with headers', () => {
    const result = DataGetters.getData(
      sourceTable,
      'Name',
      true,
      'Categorical'
    );
    expect(result).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('should extract data without headers by column index', () => {
    const sourceTableNoHeaders = [
      ['Alice', '25', '165'],
      ['Bob', '30', '180'],
      ['Charlie', '35', '175']
    ];
    const result = DataGetters.getData(
      sourceTableNoHeaders,
      'col 1',
      false,
      'Quantitative'
    );
    expect(result).toEqual([25, 30, 35]);
  });

  it('should return empty array for non-existent column', () => {
    const result = DataGetters.getData(
      sourceTable,
      'Weight',
      true,
      'Quantitative'
    );
    expect(result).toEqual([]);
  });

  it('should convert binary data correctly', () => {
    const binaryTable = [
      ['Name', 'Passed'],
      ['Alice', 'Yes'],
      ['Bob', 'No'],
      ['Charlie', 'Y']
    ];
    const result = DataGetters.getData(binaryTable, 'Passed', true, 'Binary');
    expect(result).toEqual([1, 0, 1]);
  });
});

describe('getFullData', () => {
  const sourceTable = [
    ['Name', 'Age', 'Height'],
    ['Alice', '25', '165'],
    ['Bob', '30', '180'],
    ['Charlie', '35', '175']
  ];

  it('should extract full data with headers in quantitative type', () => {
    const result = DataGetters.getFullData(sourceTable, true, 'Quantitative');
    expect(result).toEqual([
      [NaN, NaN, NaN],
      [25, 30, 35],
      [165, 180, 175]
    ]);
  });

  it('should extract full data without headers in categorical type', () => {
    const sourceTableNoHeaders = [
      ['Alice', '25', '165'],
      ['Bob', '30', '180'],
      ['Charlie', '35', '175']
    ];
    const result = DataGetters.getFullData(sourceTableNoHeaders, false);
    expect(result).toEqual([
      ['Alice', 'Bob', 'Charlie'],
      ['25', '30', '35'],
      ['165', '180', '175']
    ]);
  });

  it('should extract full data with binary type', () => {
    const binaryTable = [
      ['Name', 'Passed'],
      ['Alice', 'Yes'],
      ['Bob', 'No'],
      ['Charlie', 'Y']
    ];
    const result = DataGetters.getFullData(binaryTable, true, 'Binary');
    expect(result).toEqual([
      [0, 0, 0],
      [1, 0, 1]
    ]);
  });
});
