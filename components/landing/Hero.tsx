"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="w-full max-w-landing mx-auto px-4 pt-16 pb-10 text-center">
      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-[38px] sm:text-[48px] md:text-[56px] leading-[1.1] text-dark mb-5 max-w-[700px] mx-auto"
      >
        Still together.
        <br />
        <span className="text-orange">Not really transforming</span> together?
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-body text-[18px] text-muted max-w-[480px] mx-auto mb-8 leading-relaxed"
      >
        Take a 2-minute quiz to see what&apos;s actually keeping you stuck as a
        couple — and what needs to change first.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex justify-center"
      >
        <Button href="/quiz" pulse fullWidth>
          START THE FREE 2-MINUTE QUIZ &nbsp;→
        </Button>
      </motion.div>
    </section>
  );
}
