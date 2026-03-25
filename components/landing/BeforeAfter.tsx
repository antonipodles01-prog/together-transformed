"use client";

import { motion } from "framer-motion";

// TODO: Replace /images/before-1.jpg and /images/after-1.jpg with actual
// Jake & Sarah before/after photos when available.
export function BeforeAfter() {
  return (
    <section className="w-full max-w-[760px] mx-auto px-4 py-10">
      {/* Mobile: after on top, before below. Desktop: side by side */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 items-stretch justify-center">
        {/* BEFORE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex-1 min-h-[280px] sm:min-h-[380px] rounded-2xl overflow-hidden shadow-card"
        >
          {/* Greyscale placeholder image */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-400 to-zinc-600"
            style={{ filter: "grayscale(100%) brightness(0.85)" }}
          >
            {/* Actual image — uncomment when photos are ready */}
            {/* <Image src="/images/before-1.jpg" alt="Jake and Sarah before their transformation" fill className="object-cover grayscale" sizes="(max-width: 640px) 100vw, 50vw" priority /> */}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-body font-bold text-white uppercase tracking-widest bg-black/60 rounded-pill px-3 py-1">
              BEFORE
            </span>
          </div>
        </motion.div>

        {/* AFTER */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex-1 min-h-[280px] sm:min-h-[380px] rounded-2xl overflow-hidden shadow-card"
        >
          {/* Warm-toned placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-400">
            {/* Actual image — uncomment when photos are ready */}
            {/* <Image src="/images/after-1.jpg" alt="Jake and Sarah after their 12-week transformation" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" priority /> */}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-body font-bold text-white uppercase tracking-widest bg-orange/80 rounded-pill px-3 py-1">
              AFTER
            </span>
          </div>
        </motion.div>
      </div>

      {/* Caption */}
      <p className="text-center text-sm text-muted font-body mt-3">
        Jake & Sarah — combined 100lbs lost in 12 weeks
      </p>
    </section>
  );
}
