"use client";

import { motion } from "framer-motion";

interface ScoreSliderProps {
  score: number; // 0–100
}

export function ScoreSlider({ score }: ScoreSliderProps) {
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <div className="w-full">
      {/* Labels */}
      <div className="flex justify-between mb-2">
        <span className="text-xs font-body text-muted">Low Urgency</span>
        <span className="text-xs font-body text-muted">High Urgency</span>
      </div>

      {/* Gradient bar */}
      <div className="relative w-full h-3 rounded-full overflow-visible">
        {/* Gradient track */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #EF4444, #F59E0B 50%, #22C55E)",
          }}
        />

        {/* Needle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-dark rounded-full shadow-card-strong z-10"
          initial={{ left: "50%" }}
          animate={{ left: `${clampedScore}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      {/* Score percentage */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-5xl font-display font-bold text-dark">
          {clampedScore}
        </span>
        <span className="text-2xl font-display text-muted">%</span>
        <p className="text-sm font-body text-muted mt-1">
          Couple Change Score
        </p>
      </motion.div>
    </div>
  );
}
