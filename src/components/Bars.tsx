// src/components/Bars.tsx
"use client";
import React from "react";

type Props = {
  array: number[];
  highlighted: number[];
  pivotIndex: number | null;
  sorted: Set<number>;
  maxHeight?: number;
  showIndices?: boolean;
  showValues?: boolean;
  activeRange?: [number, number] | null;
};

export default function Bars({
  array,
  highlighted,
  pivotIndex,
  sorted,
  maxHeight = 260,
  showIndices = true,
  showValues = true,
  activeRange = null,
}: Props) {
  const maxVal = Math.max(...array, 1);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-end justify-start gap-4 mt-10 p-6">
        {array.map((val, i) => {
          const height = Math.max(
            30,
            Math.round((val / maxVal) * maxHeight)
          );

          const isHighlighted = highlighted.includes(i);
          const isSorted = sorted.has(i);
          const isPivot = pivotIndex === i;

          const inRange =
            activeRange &&
            i >= activeRange[0] &&
            i <= activeRange[1];

          let bg = "linear-gradient(180deg,#7c3aed,#9f7efc)"; // default

          // PRIORITY ORDER (important)
          if (isPivot)
            bg = "linear-gradient(180deg,#f97316,#ef4444)"; // pivot orange-red
          else if (isSorted)
            bg = "linear-gradient(180deg,#22c55e,#15803d)"; // sorted green
          else if (isHighlighted)
            bg = "linear-gradient(180deg,#ec4899,#8b5cf6)"; // compare pink
          else if (inRange)
            bg = "linear-gradient(180deg,#3b82f6,#06b6d4)"; // active partition blue

          return (
            <div key={i} className="flex flex-col items-center min-w-[60px]">

              {/* Top Label */}
              <div style={{ height: 20 }}>
                {isPivot && (
                  <div className="text-xs text-orange-300 font-bold">
                    PIVOT
                  </div>
                )}

                {isSorted && !isPivot && (
                  <div className="text-xs text-green-300 font-bold">
                    DONE
                  </div>
                )}

                {inRange && !isPivot && !isSorted && (
                  <div className="text-xs text-blue-300 font-semibold">
                    ACTIVE
                  </div>
                )}
              </div>

              {/* Bar */}
              <div
                className="w-14 rounded-lg flex items-end justify-center text-white font-semibold transition-all duration-500 ease-in-out"
                style={{
                  height,
                  background: bg,
                  boxShadow: isHighlighted
                    ? "0 8px 25px rgba(139,92,246,0.4)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {showValues && (
                  <span className="mb-2 text-sm">{val}</span>
                )}
              </div>

              {/* Index */}
              {showIndices && (
                <div className="text-xs text-slate-400 mt-2">
                  {i}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}