"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "3,298+",
    label: "COUPLES ASSESSED",
    icon: "👥",
  },
  {
    number: "Research",
    label: "BACKED BY SCIENCE",
    icon: "🧬",
  },
  {
    number: "Results",
    label: "IN 12 WEEKS",
    icon: "⚡",
  },
];

export function StatCards() {
  return (
    <section className="w-full max-w-landing mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white border border-border rounded-card p-6 text-center shadow-card"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="font-display font-bold text-2xl text-dark mb-1">
              {stat.number}
            </div>
            <div className="text-xs font-body font-semibold text-muted uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
