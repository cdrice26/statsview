import * as Unique from '../unique';
import { describe, it, expect } from 'vitest';

describe('getUnique', () => {
  const testCases = [
    {
      input: [1, 2, 2, 3, 4, 4, 5],
      expected: [1, 2, 3, 4, 5],
      description: 'should return unique items from an array of numbers'
    },
    {
      input: ['apple', 'banana', 'apple', 'cherry', 'banana'],
      expected: ['apple', 'banana', 'cherry'],
      description: 'should return unique items from an array of strings'
    },
    {
      input: [],
      expected: [],
      description: 'should return an empty array when input is empty'
    },
    {
      input: [1, '1', true, false, 1, '1', true],
      expected: [1, '1', true, false],
      description: 'should handle arrays with mixed types'
    },
    {
      input: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
      expected: [3, 1, 4, 5, 9, 2, 6],
      description: 'should preserve the order of first occurrence'
    }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      const result = Unique.getUnique(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('getUniqueFromMatrix', () => {
  const testCases = [
    {
      input: [
        [1, 2, 3],
        [3, 4, 5],
        [5, 6, 1]
      ],
      expected: [1, 2, 3, 4, 5, 6],
      description: 'should return unique items from a matrix of numbers'
    },
    {
      input: [
        ['apple', 'banana'],
        ['banana', 'cherry'],
        ['cherry', 'date']
      ],
      expected: ['apple', 'banana', 'cherry', 'date'],
      description: 'should return unique items from a matrix of strings'
    },
    {
      input: [],
      expected: [],
      description: 'should return an empty array when input is empty'
    },
    {
      input: [
        [1, 'a', true],
        ['a', 2, false],
        [true, 3, 'b']
      ],
      expected: [1, 'a', true, 2, false, 3, 'b'],
      description: 'should handle matrices with mixed types'
    },
    {
      input: [
        [3, 1, 4],
        [1, 5, 9],
        [2, 6, 5]
      ],
      expected: [3, 1, 4, 5, 9, 2, 6],
      description: 'should preserve the order of first occurrence'
    }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      const result = Unique.getUniqueFromMatrix(input);
      expect(result).toEqual(expected);
    });
  });
});
