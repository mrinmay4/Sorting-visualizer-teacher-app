// src/components/Controls.tsx
"use client";
import React from "react";

type Props = {
  input: string;
  setInput: (s: string) => void;
  algorithm: string;
  setAlgorithm: (a: string) => void;
  delay: number;
  setDelay: (d: number) => void;
  onRandomize: () => void;
  onVisualize: () => void;
  onPauseResume: () => void;
  running: boolean;
  onReset: () => void;
};

export default function Controls({
  input,
  setInput,
  algorithm,
  setAlgorithm,
  delay,
  setDelay,
  onRandomize,
  onVisualize,
  onPauseResume,
  running,
  onReset,
}: Props) {
  return (
    <div className="p-6 bg-slate-800 rounded-xl w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Sorting Visualizer — Teacher Mode</h1>

      <label className="text-slate-300 block mb-2">Array (space or comma)</label>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 rounded bg-slate-900 text-white mb-4 placeholder-slate-400"
        placeholder="e.g. 11 28 5 9 21 12 10"
      />

      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="p-3 rounded bg-slate-900 text-white"
        >
          <option>Bubble</option>
          <option>Insertion</option>
          <option>Selection</option>
          <option>Merge</option>
          <option>Quick</option>
          <option>Heap</option>
        </select>

        <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={onVisualize}>
          Visualize
        </button>
        <button className="bg-slate-700 text-white px-4 py-2 rounded" onClick={onPauseResume}>
          {running ? "Pause" : "Resume"}
        </button>
        <button className="bg-slate-700 text-white px-4 py-2 rounded" onClick={onReset}>
          Reset
        </button>
        <button className="bg-slate-700 text-white px-4 py-2 rounded" onClick={onRandomize}>
          Randomize
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-slate-300">Speed</label>
        <input
          type="range"
          min={50}
          max={1200}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full"
        />
        <div className="w-20 text-white">{delay}ms</div>
      </div>
    </div>
  );
}