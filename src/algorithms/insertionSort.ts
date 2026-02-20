// src/algorithms/insertionSort.ts
import { Step } from "./types";

export function insertionSort(input: number[]): Step[] {
  const a = [...input];
  const steps: Step[] = [];
  const n = a.length;

  steps.push({ type: "compare", indices: [0, 0], message: `Starting Insertion Sort on ${n} items.` });

  for (let i = 1; i < n; i++) {
    steps.push({ type: "compare", indices: [i - 1, i], message: `Take element ${a[i]} at index ${i} to insert.` });
    let j = i;
    while (j > 0) {
      steps.push({
        type: "compare",
        indices: [j - 1, j],
        message: `Compare ${a[j - 1]} (index ${j - 1}) and ${a[j]} (index ${j}).`,
      });
      if (a[j - 1] > a[j]) {
        steps.push({
          type: "swap",
          indices: [j - 1, j],
          message: `Since ${a[j - 1]} > ${a[j]}, move ${a[j]} left (swap).`,
        });
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
      } else {
        steps.push({
          type: "compare",
          indices: [j - 1, j],
          message: `Correct position found for ${a[j]} (no swap).`,
        });
        break;
      }
      j--;
    }
    steps.push({
      type: "markSorted",
      index: i,
      message: `Element at index ${i} placed; prefix up to ${i} is sorted.`,
    });
  }
  return steps;
}