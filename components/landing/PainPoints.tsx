"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    icon: "📸",
    headline: "You stop taking photos together",
    body: "Not because you're busy. Because you don't want the evidence.",
  },
  {
    icon: "💬",
    headline: "You stop talking about getting in shape",
    body: "The conversation happens every Sunday. Nothing ever changes.",
  },
  {
    icon: "🤝",
    headline: "You stop feeling like a team",
    body: "It's not a fight. It's a quiet drift that builds for years.",
  },
];

export function PainPoints() {
  return (
    <section className="w-full max-w-landing mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-[28px] sm:text-[34px] text-dark text-center mb-4 max-w-[560px] mx-auto leading-tight"
      >
        Most couples don&apos;t fall off because they don&apos;t care.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-body text-[17px] text-muted text-center max-w-[520px] mx-auto mb-10 leading-relaxed"
      >
        They fall off because life, stress, routine, and quiet frustration slowly
        take over.
      </motion.p>

      <div className="flex flex-col gap-8 max-w-[580px] mx-auto mb-10">
        {painPoints.map((point, i) => (
          <motion.div
            key={point.headline}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-start gap-5"
          >
            <span className="text-3xl flex-shrink-0 mt-0.5">{point.icon}</span>
            <div>
              <p className="font-body font-semibold text-[17px] text-dark mb-1">
                {point.headline}
              </p>
              <p className="font-body text-[15px] text-muted">{point.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-body text-[17px] text-muted text-center max-w-[400px] mx-auto italic"
      >
        That&apos;s what this helps uncover.
      </motion.p>
    </section>
  );
}
