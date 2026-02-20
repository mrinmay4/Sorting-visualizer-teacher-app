import { Step } from "./types";

export function mergeSort(input: number[]): Step[] {
  const a = [...input];
  const steps: Step[] = [];

  function merge(l: number, m: number, r: number) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    steps.push({
      type: "range",
      left: l,
      right: r,
      message: `Merging subarrays from index ${l} to ${r}`,
    });

    while (i < left.length && j < right.length) {
      steps.push({
        type: "compare",
        indices: [l + i, m + 1 + j],
        message: `Compare ${left[i]} and ${right[j]}`,
      });

      if (left[i] <= right[j]) {
        steps.push({
          type: "overwrite",
          index: k,
          value: left[i],
          message: `Place ${left[i]} into position ${k}`,
        });
        a[k++] = left[i++];
      } else {
        steps.push({
          type: "overwrite",
          index: k,
          value: right[j],
          message: `Place ${right[j]} into position ${k}`,
        });
        a[k++] = right[j++];
      }
    }

    while (i < left.length) {
      steps.push({
        type: "overwrite",
        index: k,
        value: left[i],
        message: `Left has remaining ${left[i]}, placing at ${k}`,
      });
      a[k++] = left[i++];
    }

    while (j < right.length) {
      steps.push({
        type: "overwrite",
        index: k,
        value: right[j],
        message: `Right has remaining ${right[j]}, placing at ${k}`,
      });
      a[k++] = right[j++];
    }

    for (let p = l; p <= r; p++) {
      steps.push({
        type: "markSorted",
        index: p,
        message: `Position ${p} is sorted in this merged section`,
      });
    }
  }

  function sort(l: number, r: number) {
    if (l >= r) return;

    const m = Math.floor((l + r) / 2);

    steps.push({
      type: "range",
      left: l,
      right: r,
      message: `Dividing array from index ${l} to ${r}`,
    });

    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  }

  steps.push({
    type: "compare",
    indices: [0, 0],
    message: "Starting Merge Sort — divide and conquer approach",
  });

  sort(0, a.length - 1);
  return steps;
}