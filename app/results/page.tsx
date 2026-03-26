"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ScoreSlider } from "@/components/ui/ScoreSlider";
import { Button } from "@/components/ui/Button";
import { submitEmail } from "@/lib/email";

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

// ─── Locked metric row ─────────────────────────────────────────────────────────

function LockedMetricRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-border last:border-0">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="font-body font-medium text-body flex-1 text-sm sm:text-base">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {/* Greyed-out placeholder bar */}
        <div className="w-20 h-2 bg-light rounded-full overflow-hidden hidden sm:block">
          <div className="h-full w-[60%] bg-border rounded-full" />
        </div>
        {/* Lock badge */}
        <div className="flex items-center gap-1 bg-light border border-border rounded-pill px-2.5 py-1">
          <span className="text-xs">🔒</span>
          <span className="text-xs font-body font-medium text-muted whitespace-nowrap">
            Unlock
          </span>
        </div>
      </div>
    </div>
  );
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

      // Brief "unlocking" delay
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
        {loading ? "Unlocking results..." : "SEE MY FULL RESULTS  →"}
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

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border rounded-card shadow-card p-6 sm:p-8 mb-3"
        >
          <p className="text-xs font-body font-bold text-muted uppercase tracking-widest text-center mb-1">
            Your Couple Change Score
          </p>
          <p className="text-center text-sm font-body text-muted mb-6">
            How much a transformation would impact your lives together
          </p>
          <ScoreSlider score={safeScore} />
        </motion.div>

        {/* Score explanation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs font-body text-muted mb-6 px-2"
        >
          A higher score means the gap between where you are and where you want
          to be is significant — and that a change would have a major impact on
          your relationship and confidence.
        </motion.p>

        {/* Locked metric rows */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white border border-border rounded-card shadow-card p-5 sm:p-6 mb-8"
        >
          <p className="text-xs font-body font-semibold text-muted uppercase tracking-widest mb-4">
            Your full breakdown — unlock below
          </p>
          <LockedMetricRow icon="📈" label="Couple Change Potential" />
          <LockedMetricRow icon="❤️" label="Relationship Impact Score" />
          <LockedMetricRow icon="🎯" label="12-Week Success Likelihood" />
        </motion.div>

        {/* Email gate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-center"
        >
          <h2 className="font-display font-bold text-[28px] sm:text-[32px] text-dark mb-3">
            Unlock Your{" "}
            <span className="text-orange">Full Results</span>
          </h2>
          <p className="font-body text-muted text-[16px] mb-6 max-w-[420px] mx-auto">
            Enter your email to see your complete breakdown and personalised
            12-week action plan.
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
