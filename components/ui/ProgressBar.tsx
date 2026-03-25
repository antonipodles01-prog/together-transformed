"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number; // 1-based current question number
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round(((current - 1) / total) * 100);

  return (
    <div className="w-full">
      {/* Counter row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-body font-medium text-muted uppercase tracking-widest">
          {current} of {total}
        </span>
        <span className="text-xs font-body font-medium text-orange">
          {percentage}%
        </span>
      </div>

      {/* Bar track */}
      <div className="w-full h-1 bg-light rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-orange rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
