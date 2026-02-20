import { Step } from "./types";

export function quickSort(input: number[]): Step[] {
  const a = [...input];
  const steps: Step[] = [];

  function partition(l: number, r: number) {
    steps.push({
      type: "range",
      left: l,
      right: r,
      message: `Partitioning subarray from index ${l} to ${r}`,
    });

    const pivotIndex = r;
    const pivotVal = a[pivotIndex];

    steps.push({
      type: "pivot",
      index: pivotIndex,
      message: `Choose pivot ${pivotVal} at index ${pivotIndex}`,
    });

    let i = l - 1;

    for (let j = l; j < r; j++) {
      steps.push({
        type: "compare",
        indices: [j, pivotIndex],
        message: `Compare ${a[j]} with pivot ${pivotVal}`,
      });

      if (a[j] < pivotVal) {
        i++;

        if (i !== j) {
          steps.push({
            type: "swap",
            indices: [i, j],
            message: `${a[j]} < ${pivotVal}, so move it to left partition (swap with index ${i})`,
          });

          [a[i], a[j]] = [a[j], a[i]];
        } else {
          steps.push({
            type: "compare",
            indices: [i, j],
            message: `${a[j]} is already in correct left partition position`,
          });
        }
      } else {
        steps.push({
          type: "compare",
          indices: [j, pivotIndex],
          message: `${a[j]} ≥ ${pivotVal}, so it stays in right partition`,
        });
      }
    }

    if (i + 1 !== r) {
      steps.push({
        type: "swap",
        indices: [i + 1, r],
        message: `Place pivot ${pivotVal} in its correct position at index ${i + 1}`,
      });

      [a[i + 1], a[r]] = [a[r], a[i + 1]];
    }

    steps.push({
      type: "markSorted",
      index: i + 1,
      message: `Pivot ${pivotVal} is now fixed at index ${i + 1}`,
    });

    return i + 1;
  }

  function sort(l: number, r: number) {
    if (l >= r) return;

    steps.push({
      type: "range",
      left: l,
      right: r,
      message: `Recursively sort subarray from ${l} to ${r}`,
    });

    const p = partition(l, r);

    sort(l, p - 1);
    sort(p + 1, r);
  }

  steps.push({
    type: "compare",
    indices: [0, 0],
    message: "Starting Quick Sort — divide using pivot and partition",
  });

  sort(0, a.length - 1);

  return steps;
}