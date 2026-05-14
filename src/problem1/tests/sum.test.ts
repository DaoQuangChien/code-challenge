import { describe, test, expect } from "vitest";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "@/sum";

const testCases = [
  { n: 5, expected: 15 },
  { n: 10, expected: 55 },
  { n: 1, expected: 1 },
  { n: 0, expected: 0 },
];

describe("Sum to N implementations", () => {
  test("Implementation A: Iterative", () => {
    testCases.forEach(({ n, expected }) => {
      expect(sum_to_n_a(n)).toBe(expected);
    });
  });

  test("Implementation B: Mathematical", () => {
    testCases.forEach(({ n, expected }) => {
      expect(sum_to_n_b(n)).toBe(expected);
    });
  });

  test("Implementation C: Recursive", () => {
    testCases.forEach(({ n, expected }) => {
      expect(sum_to_n_c(n)).toBe(expected);
    });
  });
});
