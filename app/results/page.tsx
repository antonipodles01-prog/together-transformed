"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { submitEmail } from "@/lib/email";
import { getPersonaDetails } from "@/lib/score-calculator";

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

// ─── Email form ────────────────────────────────────────────────────────────────

function EmailForm({ score }: { score: number }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitEmail(email, score);
      fireEvent("email_submit", { score, email });
      await new Promise((r) => setTimeout(r, 500));
      router.push(`/sales?score=${score}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full h-14 px-4 rounded-input border border-border font-body text-body text-base
            focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
          required
          disabled={loading}
        />
        {error && <p className="text-danger text-sm font-body mt-1">{error}</p>}
      </div>

      <Button type="submit" fullWidth disabled={loading} className="mb-3">
        {loading ? "Unlocking results..." : "SEE MY FULL RESULT  →"}
      </Button>

      <p className="text-center text-xs text-muted font-body">
        🔒 No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}

// ─── Results content ───────────────────────────────────────────────────────────

function ResultsContent() {
  const searchParams = useSearchParams();
  const rawScore = searchParams.get("score");
  const score =
    rawScore !== null
      ? parseInt(rawScore, 10)
      : typeof window !== "undefined"
      ? parseInt(sessionStorage.getItem("tt_score") ?? "50", 10)
      : 50;

  const safeScore = isNaN(score) ? 50 : Math.max(0, Math.min(100, score));
  const persona = getPersonaDetails(safeScore);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-results mx-auto px-4 py-12 pb-24">

        {/* Analysis complete badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-pill px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-success animate-dot-pulse flex-shrink-0" />
            <span className="text-xs font-body font-bold text-body uppercase tracking-widest">
              Analysis Complete
            </span>
          </div>
        </motion.div>

        {/* Persona card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border rounded-card shadow-card p-6 sm:p-8 mb-6"
        >
          <p className="text-xs font-body font-bold text-muted uppercase tracking-widest text-center mb-3">
            Your result
          </p>
          <h1 className="font-display font-bold text-[32px] sm:text-[36px] text-dark text-center mb-4 leading-tight">
            {persona.title}
          </h1>
          <p className="font-body text-[16px] text-muted text-center leading-relaxed max-w-[420px] mx-auto">
            {persona.description}
          </p>
        </motion.div>

        {/* What this means bullets */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white border border-border rounded-card shadow-card p-5 sm:p-6 mb-8"
        >
          <p className="text-xs font-body font-semibold text-muted uppercase tracking-widest mb-4">
            What this means for you
          </p>
          <ul className="space-y-3">
            {persona.insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-body text-[15px]">
                <span className="text-orange font-bold flex-shrink-0 mt-0.5">→</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Email gate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center"
        >
          <h2 className="font-display font-bold text-[28px] sm:text-[32px] text-dark mb-3">
            Unlock your{" "}
            <span className="text-orange">full breakdown</span>
          </h2>
          <p className="font-body text-muted text-[16px] mb-6 max-w-[400px] mx-auto">
            Enter your email to get your personalised 12-week plan.
          </p>

          <EmailForm score={safeScore} />

          <p className="text-sm text-muted font-body mt-4">
            3,298+ couples have already unlocked their results
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Page export ───────────────────────────────────────────────────────────────

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-muted font-body">Loading your results...</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
