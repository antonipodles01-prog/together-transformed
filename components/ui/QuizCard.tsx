"use client";

import { motion } from "framer-motion";

interface QuizCardProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function QuizCard({ text, selected, onClick, disabled }: QuizCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      className={`
        w-full text-left px-5 py-4 rounded-card border transition-all duration-200
        font-body text-[16px] leading-snug min-h-[52px]
        flex items-center gap-3
        ${
          selected
            ? "border-orange border-2 bg-orange-light text-dark"
            : "border-border bg-white text-body hover:border-orange hover:bg-orange-light/40"
        }
        ${disabled ? "cursor-default" : "cursor-pointer"}
      `}
    >
      {/* Checkmark */}
      <span
        className={`
          flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${selected ? "border-orange bg-orange" : "border-border"}
        `}
      >
        {selected && (
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="w-3 h-3 text-white"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </span>
      <span>{text}</span>
    </motion.button>
  );
}
