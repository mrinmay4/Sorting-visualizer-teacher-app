// src/algorithms/heapSort.ts
import { Step } from "./types";

export function heapSort(input: number[]): Step[] {
  const a = [...input];
  const steps: Step[] = [];
  const n = a.length;

  function heapify(size: number, i: number) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < size) {
      steps.push({
        type: "compare",
        indices: [l, largest],
        message: `Compare left child ${a[l]} (index ${l}) with ${a[largest]} (index ${largest}).`,
      });
      if (a[l] > a[largest]) largest = l;
    }

    if (r < size) {
      steps.push({
        type: "compare",
        indices: [r, largest],
        message: `Compare right child ${a[r]} (index ${r}) with ${a[largest]} (index ${largest}).`,
      });
      if (a[r] > a[largest]) largest = r;
    }

    if (largest !== i) {
      steps.push({
        type: "swap",
        indices: [i, largest],
        message: `Swap ${a[i]} with larger child ${a[largest]} (index ${largest}).`,
      });
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(size, largest);
    }
  }

  steps.push({ type: "compare", indices: [0, 0], message: `Starting Heap Sort on ${n} items.` });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    steps.push({
      type: "swap",
      indices: [0, end],
      message: `Swap max ${a[0]} (root) with element at end index ${end}.`,
    });
    [a[0], a[end]] = [a[end], a[0]];
    steps.push({
      type: "markSorted",
      index: end,
      message: `Element at index ${end} is now in final position.`,
    });
    heapify(end, 0);
  }

  if (n > 0) {
    steps.push({
      type: "markSorted",
      index: 0,
      message: `Last element at index 0 is now sorted.`,
    });
  }

  return steps;
}