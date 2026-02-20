// src/algorithms/bubbleSort.ts
import { Step } from "./types";

export function bubbleSort(input: number[]): Step[] {
  const a = [...input];
  const steps: Step[] = [];
  const n = a.length;

  steps.push({ type: "compare", indices: [0, 0], message: `Starting Bubble Sort on ${n} items.` });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        message: `Comparing ${a[j]} (index ${j}) and ${a[j + 1]} (index ${j + 1}).`,
      });

      if (a[j] > a[j + 1]) {
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          message: `Since ${a[j]} > ${a[j + 1]}, we swap them.`,
        });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      } else {
        steps.push({
          type: "compare",
          indices: [j, j + 1],
          message: `No swap needed because ${a[j]} ≤ ${a[j + 1]}.`,
        });
      }
    }
    steps.push({
      type: "markSorted",
      index: n - i - 1,
      message: `Position ${n - i - 1} is now in final sorted position.`,
    });
  }

  return steps;
}