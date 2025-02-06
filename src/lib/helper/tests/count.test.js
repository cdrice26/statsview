import * as Count from '../count';
import { describe, it, expect } from 'vitest';

describe('occurrencesOf', () => {
  const testCases = [
    {
      input: {
        arr: [1, 2, 2, 3, 4, 2, 5],
        item: 2
      },
      expected: 3,
      description: 'should count occurrences of a number in an array'
    },
    {
      input: {
        arr: ['apple', 'banana', 'apple', 'cherry', 'banana'],
        item: 'banana'
      },
      expected: 2,
      description: 'should count occurrences of a string in an array'
    },
    {
      input: {
        arr: [1, '1', true, false, 1, '1', true],
        item: 1
      },
      expected: 2,
      description: 'should count occurrences with strict equality (==)'
    },
    {
      input: {
        arr: [],
        item: 'anything'
      },
      expected: 0,
      description: 'should return 0 for an empty array'
    },
    {
      input: {
        arr: [null, undefined, NaN],
        item: null
      },
      expected: 1,
      description: 'should count occurrences of null'
    },
    {
      input: {
        arr: [{ id: 1 }, { id: 2 }, { id: 1 }],
        item: { id: 1 }
      },
      expected: 0,
      description: 'should not count object references (uses == comparison)'
    }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      const result = Count.occurrencesOf(input.arr, input.item);
      expect(result).toBe(expected);
    });
  });
});
