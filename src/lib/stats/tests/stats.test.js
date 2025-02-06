import * as Stats from '../stats';
import { describe, it, expect } from 'vitest';

describe('mean', () => {
  it('should have a functional mean', () => {
    const list = [1, 2, 3, 4, 5];
    const result = Stats.mean(list);
    expect(result).toBe(3);
  });
});

describe('std', () => {
  it('should have a functional std', () => {
    const list = [1, 2, 3, 4, 5];
    const result = Stats.std(list);
    expect(result).toBeCloseTo(1.41421, 3);
  });
});

describe('median', () => {
  it('should have a functional median', () => {
    const list = [1, 2, 3, 3, 4, 5];
    const result = Stats.median(list);
    expect(result).toBe(3);
  });
});

describe('min', () => {
  it('should have a functional min', () => {
    const list = [1, 2, 3, 4, 5];
    const result = Stats.min(list);
    expect(result).toBe(1);
  });
});

describe('max', () => {
  it('should have a functional max', () => {
    const list = [1, 2, 3, 4, 5];
    const result = Stats.max(list);
    expect(result).toBe(5);
  });
});

describe('range', () => {
  it('should have a functional range', () => {
    const list = [1, 2, 3, 4, 5];
    const result = Stats.range(list);
    expect(result).toBe(4);
  });
});

describe('iqr', () => {
  it('should have a functional iqr', () => {
    const list = [1, 2, 3, 4, 5];
    const result = Stats.iqr(list);
    expect(result).toBe(3);
  });
});

describe('correlationCoefficient', () => {
  it('should have a functional correlationCoefficient', () => {
    const list1 = [1, 2, 3, 4, 5];
    const list2 = [2, 3, 4, 5, 6];
    const result = Stats.correlationCoefficient(list1, list2);
    expect(result).toBeCloseTo(0.99999, 3);
  });
});

describe('rSquared', () => {
  it('should have a functional rSquared', () => {
    const list1 = [1, 2, 3, 4, 5];
    const list2 = [2, 3, 4, 5, 6];
    const result = Stats.rSquared(list1, list2);
    expect(result).toBeCloseTo(0.99999, 3);
  });
});
