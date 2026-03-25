"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div className="w-full max-w-quiz mx-auto px-4 pt-6 pb-4">
      <ProgressBar current={current} total={total} />
    </div>
  );
}
