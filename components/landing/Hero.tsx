"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="w-full max-w-landing mx-auto px-4 pt-16 pb-10 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 border border-orange rounded-pill px-4 py-1.5 mb-6"
      >
        <span className="text-xs font-body font-semibold text-orange uppercase tracking-widest">
          ⏱ 2-Minute Assessment
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display font-bold text-[38px] sm:text-[48px] md:text-[56px] leading-[1.1] text-dark mb-5 max-w-[700px] mx-auto"
      >
        Are You Both Ready to{" "}
        <span className="text-orange">Stop Hiding</span> and Start Living?
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-body text-[18px] text-muted max-w-[520px] mx-auto mb-8 leading-relaxed"
      >
        Find out exactly what&apos;s keeping you both stuck — and what it would
        take to change everything in 12 weeks.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex justify-center"
      >
        <Button href="/quiz" pulse fullWidth>
          TAKE THE FREE QUIZ &nbsp;→
        </Button>
      </motion.div>

      {/* Trust row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-6 mt-4 text-sm text-muted font-body"
      >
        <span>⏱ 2 min</span>
        <span className="text-border">·</span>
        <span>◯ Free</span>
        <span className="text-border">·</span>
        <span>⚡ Instant results</span>
      </motion.div>
    </section>
  );
}
