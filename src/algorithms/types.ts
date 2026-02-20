// src/algorithms/types.ts
export type Step =
  | {
      type: "compare";
      indices: [number, number];
      message: string;
    }
  | {
      type: "swap";
      indices: [number, number];
      message: string;
    }
  | {
      type: "overwrite";
      index: number;
      value: number;
      message: string;
    }
  | {
      type: "pivot";
      index: number;
      message: string;
    }|
    {
  type: "range";
  left: number;
  right: number;
  message: string;
}
  | {
      type: "markSorted";
      index: number;
      message: string;
    };
 