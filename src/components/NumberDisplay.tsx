'use client';
import { motion } from 'framer-motion';
import type { SortItem } from '@/algorithms/types';

export default function NumberDisplay({
  items,
  activeIndices = [],
  label,
}: {
  items: SortItem[];
  activeIndices?: number[];
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Label Box */}
      <div className="h-8 flex items-center justify-center px-6 py-1 bg-slate-800 rounded-full border border-slate-700 text-blue-300 text-sm font-medium tracking-wide shadow-inner">
        {label || 'Ready to sort'}
      </div>

      {/* Numbers */}
      <div className="flex gap-4 flex-wrap justify-center">
        {items.map((item, idx) => {
          const isActive = activeIndices.includes(idx);
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: isActive ? '#3b82f6' : '#1e293b', // Blue vs Dark Slate
                color: isActive ? '#ffffff' : '#94a3b8',           // White vs Light Gray
                borderColor: isActive ? '#60a5fa' : '#334155',     // Light Blue border vs Slate border
                scale: isActive ? 1.15 : 1,
                zIndex: isActive ? 10 : 1, // Keep active items on top
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                mass: 0.8
              }}
              className="flex items-center justify-center w-14 h-14 rounded-xl shadow-lg border-2 text-xl font-bold"
            >
              {item.value}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}