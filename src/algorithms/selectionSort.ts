// src/algorithms/selectionSort.ts
import { Step } from "./types";

export function selectionSort(input: number[]): Step[] {
  const a = [...input];
  const steps: Step[] = [];
  const n = a.length;

  steps.push({ type: "compare", indices: [0, 0], message: `Starting Selection Sort on ${n} items.` });

  for (let i = 0; i < n; i++) {
    let min = i;
    steps.push({
      type: "compare",
      indices: [i, i],
      message: `Assume index ${i} (value ${a[i]}) as minimum for this pass.`,
    });
    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: "compare",
        indices: [min, j],
        message: `Compare current min ${a[min]} (index ${min}) with ${a[j]} (index ${j}).`,
      });
      if (a[j] < a[min]) {
        min = j;
        steps.push({
          type: "compare",
          indices: [min, j],
          message: `Found new min ${a[min]} at index ${min}.`,
        });
      }
    }
    if (min !== i) {
      steps.push({
        type: "swap",
        indices: [i, min],
        message: `Swap min ${a[min]} into position ${i}.`,
      });
      [a[i], a[min]] = [a[min], a[i]];
    } else {
      steps.push({
        type: "compare",
        indices: [i, min],
        message: `No swap needed; ${a[i]} already smallest for this pass.`,
      });
    }
    steps.push({
      type: "markSorted",
      index: i,
      message: `Index ${i} is now final (smallest of remaining).`,
    });
  }

  return steps;
}