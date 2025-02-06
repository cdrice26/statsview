import { describe, it, expect, beforeAll } from 'vitest';
import init from 'statmaster';
import * as Tests from '../tests';

// Attempt to initialize WebAssembly before tests
beforeAll(async () => {
  try {
    await init();
  } catch (error) {
    console.error('WebAssembly initialization failed:', error);
    // Skip tests if initialization fails
    throw error;
  }
});

describe('X2GOFTest', () => {
  it('should have a functional X2GOFTest', () => {
    // Original frequencies: [30, 25, 20, 15, 25, 35]
    // Unique outcomes: [30.0, 25.0, 20.0, 15.0, 25.0, 35.0]
    const data = [
      ...Array(30).fill('30'), // 30 times 30.0
      ...Array(25).fill('25'), // 25 times 25.0
      ...Array(20).fill('20'), // 20 times 20.0
      ...Array(15).fill('15'), // 15 times 15.0
      ...Array(25).fill('252'), // 25 times 25.0
      ...Array(35).fill('35') // 35 times 35.0
    ];

    const testAgainst = [25.0, 25.0, 25.0, 25.0, 25.0, 25.0];
    const alpha = 0.05;
    const result = Tests.X2GOFTest(data, testAgainst, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.07524, 5);
    expect(result.testStatistic).toBeCloseTo(10, 5);
  });
});

describe('X2IndTest', () => {
  it('should have a functional X2IndTest', () => {
    const data = [
      [...Array(10).fill('A'), ...Array(20).fill('B'), ...Array(30).fill('C')],
      [...Array(15).fill('A'), ...Array(25).fill('B'), ...Array(20).fill('C')],
      [...Array(5).fill('A'), ...Array(10).fill('B'), ...Array(15).fill('C')]
    ];
    const alpha = 0.05;
    const result = Tests.X2IndTest(data, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.3746, 3);
    expect(result.testStatistic).toBeCloseTo(4.2395, 3);
  });
});

describe('Samp2VarTest', () => {
  it('should have a functional Samp2VarTest', () => {
    const data1 = [1, 2, 3, 4, 5];
    const data2 = [2, 3, 4, 5, 6];
    const tails = 'two-sided';
    const alpha = 0.05;
    const result = Tests.Samp2VarTest(data1, data2, tails, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(1, 3);
  });
});

describe('Samp2TTest', () => {
  it('should have a functional Samp2TTest', () => {
    const data1 = [1, 2, 3, 4, 5];
    const data2 = [2, 3, 4, 5, 6];
    const tails = 'two-sided';
    const alpha = 0.05;
    const result = Tests.Samp2TTest(data1, data2, tails, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.3466, 3);
  });
});

describe('MPTTest', () => {
  it('should have a functional MPTTest', () => {
    const data1 = [1, 2, 3, 4, 5];
    const data2 = [2, 5, 4, 7, 9];
    const tails = 'two-sided';
    const alpha = 0.05;
    const result = Tests.MPTTest(data1, data2, tails, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.01613, 3);
  });
});

describe('ANOVATest', () => {
  it('should have a functional ANOVATest', () => {
    const data = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6]
    ];
    const result = Tests.ANOVATest(data);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.3465, 3);
    expect(result.testStatistic).toBeCloseTo(1, 3);
  });
});

describe('LinearRegressionTest', () => {
  it('should have a functional LinearRegressionTest', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 30, 4, 50, 6];
    const result = Tests.LinearRegressionTest(x, y);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.7335, 3);
    expect(result.testStatistic).toBeCloseTo(0.1396, 3);
  });
});

describe('Samp1TTest', () => {
  it('should have a functional Samp1TTest', () => {
    const data = [1, 2, 3, 4, 5];
    const testAgainst = 0;
    const tails = 'two-sided';
    const alpha = 0.05;
    const result = Tests.Samp1TTest(data, testAgainst, tails, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.01324, 3);
  });
});

describe('Samp2ZTest', () => {
  it('should have a functional Samp2ZTest', () => {
    const data1 = [1, 2, 3, 4, 5];
    const data2 = [2, 3, 4, 5, 6];
    const tails = 'two-sided';
    const alpha = 0.05;
    const result = Tests.Samp2ZTest(data1, data2, tails, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.3173, 3);
  });
});

describe('Samp1ZTest', () => {
  it('should have a functional Samp1ZTest', () => {
    const data = [1, 2, 3, 4, 5];
    const testAgainst = 0;
    const tails = 'two-sided';
    const alpha = 0.05;
    const result = Tests.Samp1ZTest(data, testAgainst, tails, alpha);
    expect(result).not.toBeNull();
    expect(result.pValue).toBeCloseTo(0.00002209, 3);
  });
});
