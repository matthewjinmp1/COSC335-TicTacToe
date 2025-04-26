import { add } from "../src/main.js";

setTimeout(null, 10000)

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('add', () => {
  test('adds numbers', () => {
    expect(add(2, 3)).toBe(5);
  })

  test('adds numbers', () => {
    expect(add(7, 5)).toBe(12);
  })
});
