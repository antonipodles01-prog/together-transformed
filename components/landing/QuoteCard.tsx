"use client";

import { motion } from "framer-motion";

export function QuoteCard() {
  return (
    <section className="w-full max-w-landing mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-dark-card rounded-card p-8 sm:p-10 relative overflow-hidden"
      >
        {/* Orange left accent */}
        <div className="absolute left-0 top-8 bottom-8 w-1 bg-orange rounded-r-full" />

        <div className="pl-5">
          <p className="font-body text-[17px] text-white/90 leading-relaxed mb-6 italic">
            &ldquo;We were that couple. Tired, embarrassed, avoiding plans.
            Then we found a system that worked — because we did it together.
            Combined we lost over 100lbs. In 12 weeks.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            {/* Profile placeholder */}
            <div className="w-10 h-10 rounded-full bg-orange/30 flex-shrink-0">
              {/* TODO: Replace with <Image src="/images/profile.jpg" ... /> */}
            </div>
            <div>
              <p className="font-body font-semibold text-white text-sm">
                Jake & Sarah
              </p>
              <p className="font-body text-orange text-xs">@jakeandsarahfit</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
