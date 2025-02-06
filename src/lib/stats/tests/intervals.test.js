import * as Intervals from '../intervals';
import init from 'statmaster';
import { describe, beforeAll, it, expect } from 'vitest';

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

describe('one_samp_t_interval', () => {
  it('should have a functional one_samp_t_interval', () => {
    const data = [1, 2, 3, 4, 5];
    const alpha = 0.05;
    const result = Intervals.oneSampTInterval(data, alpha);
    expect(result).not.toBeNull();
    expect(result[0]).toBeCloseTo(1.036757, 3);
    expect(result[1]).toBeCloseTo(4.963243, 3);
  });
});

describe('one_samp_z_interval', () => {
  it('should have a functional one_samp_z_interval', () => {
    const data = [1, 2, 3, 4, 5];
    const alpha = 0.05;
    const result = Intervals.oneSampZInterval(data, alpha);
    expect(result).not.toBeNull();
    expect(result[0]).toBeCloseTo(1.6141, 3);
    expect(result[1]).toBeCloseTo(4.3859, 3);
  });
});

describe('two_samp_t_interval', () => {
  it('should have a functional two_samp_t_interval', () => {
    const data = [1, 2, 3, 4, 5];
    const data2 = [2, 3, 4, 5, 6];
    const alpha = 0.05;
    const result = Intervals.twoSampTInterval(data, data2, alpha);
    expect(result).not.toBeNull();
    expect(result[0]).toBeCloseTo(-3.306004, 3);
    expect(result[1]).toBeCloseTo(1.306004, 3);
  });
});

describe('two_samp_z_interval', () => {
  it('should have a functional two_samp_z_interval', () => {
    const data = [1, 2, 3, 4, 5];
    const data2 = [2, 3, 4, 5, 6];
    const alpha = 0.05;
    const result = Intervals.twoSampZInterval(data, data2, alpha);
    expect(result).not.toBeNull();
    expect(result[0]).toBeCloseTo(-2.959964, 3);
    expect(result[1]).toBeCloseTo(0.959964, 3);
  });
});

describe('two_samp_var_interval', () => {
  it('should have a functional two_samp_var_interval', () => {
    const data = [1, 2, 3, 4, 5];
    const data2 = [2, 3, 4, 5, 6];
    const alpha = 0.05;
    const result = Intervals.twoSampVarInterval(data, data2, alpha);
    expect(result).not.toBeNull();
    expect(result[0]).toBeCloseTo(0.1041175, 3);
    expect(result[1]).toBeCloseTo(9.60453, 2);
  });
});
