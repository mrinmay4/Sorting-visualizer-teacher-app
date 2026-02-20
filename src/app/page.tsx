// app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Controls from "@/components/Controls";
import Bars from "@/components/Bars";
import { parseInput, randomArray, sleep } from "@/lib/helpers";
import { Step } from "@/algorithms/types";

import { bubbleSort } from "@/algorithms/bubbleSort";
import { insertionSort } from "@/algorithms/insertionSort";
import { selectionSort } from "@/algorithms/selectionSort";
import { mergeSort } from "@/algorithms/mergeSort";
import { quickSort } from "@/algorithms/quickSort";
import { heapSort } from "@/algorithms/heapSort";

export default function Page() {
  /* ================= STATE ================= */

  const [input, setInput] = useState("11 28 5 9 21 12 10");
  const [array, setArray] = useState<number[]>([]);
  const [original, setOriginal] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState("Merge");
  const [delay, setDelay] = useState(800);
  const [running, setRunning] = useState(false);

  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
  const [sortedSet, setSortedSet] = useState<Set<number>>(new Set());
  const [activeRange, setActiveRange] = useState<[number, number] | null>(null);
  const [currentMessage, setCurrentMessage] = useState("Ready.");

  const [showIndices, setShowIndices] = useState(true);
  const [showValues, setShowValues] = useState(true);

  const stepsRef = useRef<Step[]>([]);
  const pointerRef = useRef(0);
  const pausedRef = useRef(false);
  const stopRef = useRef(false);

  /* ================= INIT ================= */

  useEffect(() => {
    const arr = parseInput(input);
    const valid = arr.length ? arr : [11, 28, 5, 9, 21, 12, 10];
    setArray(valid);
    setOriginal(valid);
  }, []);

  /* ================= ALGORITHM MAP ================= */

  const algorithmMap: Record<string, (a: number[]) => Step[]> = {
    Bubble: bubbleSort,
    Insertion: insertionSort,
    Selection: selectionSort,
    Merge: mergeSort,
    Quick: quickSort,
    Heap: heapSort,
  };

  /* ================= PREPARE ================= */

  function prepareSteps(): boolean {
    const arr = parseInput(input);
    if (!arr.length) return false;

    setArray([...arr]);
    setOriginal([...arr]);
    setHighlighted([]);
    setPivotIndex(null);
    setSortedSet(new Set());
    setActiveRange(null);

    const steps = algorithmMap[algorithm](arr);

    stepsRef.current = steps;
    pointerRef.current = 0;

    setCurrentMessage(`Starting ${algorithm} on ${arr.length} elements.`);
    return true;
  }

  /* ================= RESET ================= */

  function resetAll() {
    stopRef.current = true;
    pausedRef.current = false;

    setArray([...original]);
    setHighlighted([]);
    setPivotIndex(null);
    setSortedSet(new Set());
    setActiveRange(null);
    setCurrentMessage("Reset to original array.");
    setRunning(false);

    stepsRef.current = [];
    pointerRef.current = 0;
  }

  /* ================= PLAY ================= */

  async function play() {
    if (!stepsRef.current.length) {
      const ok = prepareSteps();
      if (!ok) {
        setCurrentMessage("Enter valid numbers first.");
        return;
      }
    }

    setRunning(true);
    stopRef.current = false;
    pausedRef.current = false;

    while (
      pointerRef.current < stepsRef.current.length &&
      !stopRef.current
    ) {
      const step = stepsRef.current[pointerRef.current];

      /* ===== STEP HANDLER ===== */

      if (step.type === "range") {
        setActiveRange([step.left, step.right]);
        setHighlighted([]);
        setPivotIndex(null);
        setCurrentMessage(step.message);
      } else if (step.type === "compare") {
        setHighlighted([...step.indices]);
        setPivotIndex(null);
        setCurrentMessage(step.message);
      } else if (step.type === "swap") {
        const [i, j] = step.indices;
        setHighlighted([i, j]);
        setPivotIndex(null);

        setArray((prev) => {
          const copy = [...prev];
          [copy[i], copy[j]] = [copy[j], copy[i]];
          return copy;
        });

        setCurrentMessage(step.message);
      } else if (step.type === "overwrite") {
        setHighlighted([step.index]);
        setPivotIndex(null);

        setArray((prev) => {
          const copy = [...prev];
          copy[step.index] = step.value;
          return copy;
        });

        setCurrentMessage(step.message);
      } else if (step.type === "pivot") {
        setPivotIndex(step.index);
        setHighlighted([]);
        setCurrentMessage(step.message);
      } else if (step.type === "markSorted") {
        setSortedSet((prev) => new Set(prev).add(step.index));
        setHighlighted([]);
        setCurrentMessage(step.message);
      }

      pointerRef.current += 1;

      await sleep(delay * 1.8); // slower teacher mode

      /* ===== PAUSE HANDLER ===== */

      while (!stopRef.current && pausedRef.current) {
        await sleep(100);
      }
    }

    setRunning(false);
    setActiveRange(null);
    setHighlighted([]);
    setPivotIndex(null);

    if (pointerRef.current >= stepsRef.current.length) {
      setCurrentMessage("Finished sorting — teaching run complete.");
    }
  }

  /* ================= CONTROLS ================= */

  function onVisualize() {
    prepareSteps();
    play();
  }

  function onPauseResume() {
    if (running) {
      pausedRef.current = true;
      setRunning(false);
      setCurrentMessage("Paused.");
    } else {
      pausedRef.current = false;
      setRunning(true);
      play();
    }
  }

  function onRandomize() {
    const r = randomArray(7, 30);
    setInput(r.join(" "));
    setArray(r);
    setOriginal(r);

    setHighlighted([]);
    setPivotIndex(null);
    setSortedSet(new Set());
    setActiveRange(null);

    stepsRef.current = [];
    pointerRef.current = 0;

    setCurrentMessage("Randomized array.");
  }

  /* ================= INFO ================= */

  const info: Record<string, { time: string; space: string }> = {
    Bubble: { time: "O(n²)", space: "O(1)" },
    Insertion: { time: "O(n²)", space: "O(1)" },
    Selection: { time: "O(n²)", space: "O(1)" },
    Merge: { time: "O(n log n)", space: "O(n)" },
    Quick: { time: "O(n log n) average", space: "O(log n)" },
    Heap: { time: "O(n log n)", space: "O(1)" },
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-900 p-10 text-white">
      <div className="max-w-6xl mx-auto">

        <Controls
          input={input}
          setInput={setInput}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          delay={delay}
          setDelay={setDelay}
          onRandomize={onRandomize}
          onVisualize={onVisualize}
          onPauseResume={onPauseResume}
          running={running}
          onReset={resetAll}
        />

        <div className="flex items-center gap-4 mt-6">
          <label>Show Indices</label>
          <input
            type="checkbox"
            checked={showIndices}
            onChange={(e) => setShowIndices(e.target.checked)}
          />
          <label className="ml-4">Show Values</label>
          <input
            type="checkbox"
            checked={showValues}
            onChange={(e) => setShowValues(e.target.checked)}
          />
        </div>

        <Bars
          array={array}
          highlighted={highlighted}
          pivotIndex={pivotIndex}
          sorted={sortedSet}
          activeRange={activeRange}
          showIndices={showIndices}
          showValues={showValues}
        />

        {/* Explanation Panel */}
        <div className="mt-8 p-5 bg-slate-800 rounded-lg">
          <h2 className="text-yellow-300 font-bold mb-2">
            Step Explanation
          </h2>
          <p className="min-h-[40px]">{currentMessage}</p>
          <div className="text-sm text-slate-400 mt-2">
            Step {pointerRef.current} / {stepsRef.current.length}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-5 bg-slate-800 rounded-lg">
          <h2 className="font-bold mb-2">Algorithm Info</h2>
          <p>Time Complexity: {info[algorithm].time}</p>
          <p>Space Complexity: {info[algorithm].space}</p>
        </div>
      </div>
    </div>
  );
}