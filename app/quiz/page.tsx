"use client";

import { useReducer, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/lib/quiz-questions";
import { calculateScore } from "@/lib/score-calculator";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizCard } from "@/components/ui/QuizCard";

// ─── State Machine ─────────────────────────────────────────────────────────────

interface QuizState {
  currentIndex: number;
  answers: number[]; // stores selected option index per question
  selectedOption: number | null; // currently highlighted option before advance
  analysing: boolean;
  analysingProgress: number;
}

type QuizAction =
  | { type: "SELECT"; optionIndex: number }
  | { type: "ADVANCE" }
  | { type: "START_ANALYSING" }
  | { type: "SET_ANALYSING_PROGRESS"; value: number };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT":
      return { ...state, selectedOption: action.optionIndex };
    case "ADVANCE": {
      if (state.selectedOption === null) return state;
      const newAnswers = [...state.answers];
      newAnswers[state.currentIndex] = state.selectedOption;
      return {
        ...state,
        answers: newAnswers,
        selectedOption: null,
        currentIndex: state.currentIndex + 1,
      };
    }
    case "START_ANALYSING":
      return { ...state, analysing: true };
    case "SET_ANALYSING_PROGRESS":
      return { ...state, analysingProgress: action.value };
    default:
      return state;
  }
}

const initialState: QuizState = {
  currentIndex: 0,
  answers: [],
  selectedOption: null,
  analysing: false,
  analysingProgress: 0,
};

// ─── Analytics helper ──────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function fireEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, { event_category: "funnel", ...data });
  }
}

// ─── Analysing Screen ──────────────────────────────────────────────────────────

function AnalysingScreen({ progress }: { progress: number }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-quiz text-center"
      >
        <div className="text-4xl mb-6">📊</div>
        <h2 className="font-display text-[26px] text-dark mb-2">
          Analysing your results...
        </h2>
        <p className="font-body text-muted mb-8">
          Calculating your Transformation Readiness Score
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-light rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="text-sm text-muted font-body mt-3">{Math.round(progress)}%</p>
      </motion.div>
    </div>
  );
}

// ─── Quiz Page ─────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const TOTAL = quizQuestions.length;
  const isComplete = state.currentIndex >= TOTAL;
  const currentQuestion = quizQuestions[state.currentIndex];

  // Fire quiz_start on mount
  useEffect(() => {
    fireEvent("quiz_start");
  }, []);

  // Handle selection — highlight then auto-advance after 400ms
  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (state.selectedOption !== null) return; // prevent double-tap
      dispatch({ type: "SELECT", optionIndex });

      setTimeout(() => {
        dispatch({ type: "ADVANCE" });
      }, 400);
    },
    [state.selectedOption]
  );

  // When all questions answered, start analysing screen
  useEffect(() => {
    if (!isComplete || state.analysing) return;

    dispatch({ type: "START_ANALYSING" });

    // Animate progress bar from 0 → 100 over 1500ms
    const start = performance.now();
    const duration = 1500;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min((elapsed / duration) * 100, 100);
      dispatch({ type: "SET_ANALYSING_PROGRESS", value: progress });

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Calculate score and redirect
        const score = calculateScore(state.answers);
        sessionStorage.setItem("tt_score", String(score));
        sessionStorage.setItem("tt_answers", JSON.stringify(state.answers));

        fireEvent("quiz_complete", { score });

        router.push(`/results?score=${score}`);
      }
    }

    requestAnimationFrame(animate);
  }, [isComplete, state.analysing, state.answers, router]);

  // Render analysing screen
  if (state.analysing || isComplete) {
    return <AnalysingScreen progress={state.analysingProgress} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <QuizProgress current={state.currentIndex + 1} total={TOTAL} />

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-quiz">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Question icon */}
              <div className="text-4xl text-center mb-4">
                {currentQuestion.icon}
              </div>

              {/* Section label */}
              <p className="text-xs font-body font-semibold text-muted uppercase tracking-widest text-center mb-3">
                {currentQuestion.section}
              </p>

              {/* Question text */}
              <h2 className="font-display font-bold text-[22px] sm:text-[28px] text-dark text-center mb-8 leading-tight">
                {currentQuestion.text}
              </h2>

              {/* Answer options */}
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option, i) => (
                  <QuizCard
                    key={i}
                    text={option.text}
                    selected={state.selectedOption === i}
                    onClick={() => handleSelect(i)}
                    disabled={state.selectedOption !== null}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 pb-8 text-center">
        <p className="text-xs text-muted font-body">
          Together Transformed · @jakeandsarahfit
        </p>
      </div>
    </div>
  );
}
