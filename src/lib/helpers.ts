// src/lib/helpers.ts
export const sleep = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const parseInput = (input: string): number[] =>
  input
    .trim()
    .split(/[\s,]+/)
    .map((s) => Number(s))
    .filter((n) => !isNaN(n));

export const randomArray = (n = 7, max = 50) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * max) + 1);

export const clamp = (v: number, a: number, b: number) =>
  Math.max(a, Math.min(b, v));