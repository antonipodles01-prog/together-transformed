"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    icon: "📸",
    headline: "You avoid cameras together",
    body: "Not because you're busy — because you don't want evidence.",
  },
  {
    icon: "👗",
    headline: "Nothing in the wardrobe feels right",
    body: "You wear the same 3 outfits because everything else is a reminder.",
  },
  {
    icon: "🛋",
    headline: 'You keep saying "we should really start the gym"',
    body: "Sunday night. Same conversation. Nothing changes.",
  },
];

export function PainPoints() {
  return (
    <section className="w-full max-w-landing mx-auto px-4 py-16">
      {/* Section headline */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-[28px] sm:text-[34px] text-dark text-center mb-12 max-w-[600px] mx-auto leading-tight"
      >
        Most Couples Feel This. Almost None of Them Do Anything About It.
      </motion.h2>

      {/* Pain point rows */}
      <div className="flex flex-col gap-8 max-w-[640px] mx-auto">
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
    </section>
  );
}
