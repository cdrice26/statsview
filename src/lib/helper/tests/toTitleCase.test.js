import { describe, it, expect } from 'vitest';
import toTitleCase from '../toTitleCase.js';

describe('toTitleCase', () => {
  const testCases = [
    {
      input: 'hello world',
      expected: 'Hello World',
      description: 'should convert a simple lowercase string to title case'
    },
    {
      input: 'HELLO WORLD',
      expected: 'Hello World',
      description: 'should convert an uppercase string to title case'
    },
    {
      input: 'hello WORLD',
      expected: 'Hello World',
      description: 'should handle mixed case input'
    },
    {
      input: '',
      expected: '',
      description: 'should handle empty string'
    },
    {
      input: 'a',
      expected: 'A',
      description: 'should handle single character'
    },
    {
      input: 'hello world of programming',
      expected: 'Hello World Of Programming',
      description: 'should handle multiple words'
    },
    {
      input: 'hello-world',
      expected: 'Hello-world',
      description: 'should not capitalize after hyphen'
    }
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      const result = toTitleCase(input);
      expect(result).toBe(expected);
    });
  });

  it('should throw an error for non-string input', () => {
    expect(() => toTitleCase(null)).toThrow();
    expect(() => toTitleCase(undefined)).toThrow();
    // @ts-ignore
    expect(() => toTitleCase(123)).toThrow();
  });
});
