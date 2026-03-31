"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
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

// ─── Dark feature card ──────────────────────────────────────────────────────────

function FeatureCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="bg-dark-card rounded-card p-5 flex gap-4 items-start">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-body font-semibold text-white text-[15px] mb-1">{title}</p>
        <p className="font-body text-white/60 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── Checkout button ────────────────────────────────────────────────────────────

function CheckoutButton({ label = "GET TOGETHER TRANSFORMED  →" }: { label?: string }) {
  const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://whop.com/checkout/plan_rS4hwTtmAt7ui";

  return (
    <a
      href={checkoutUrl}
      onClick={() => fireEvent("checkout_click", { product: "main" })}
      className="inline-flex items-center justify-center w-full h-14 bg-orange text-white font-body font-bold text-[18px] rounded-pill hover:bg-orange-dark active:scale-[0.98] transition-all duration-200 animate-cta-pulse"
    >
      {label}
    </a>
  );
}

// ─── Product card ───────────────────────────────────────────────────────────────

function ProductCard() {
  const checklist = [
    "Complete Push Pull Legs Training Plan (3 phases)",
    "Personalised Calorie Calculator",
    "The 80/20 Nutrition Framework",
    "The Mindset Guide — 3 Moments That Break Most Couples",
    "The Sunday Ritual — Weekly Couple Accountability System",
    "Jake & Sarah's Full Transformation Story",
  ];

  return (
    <div className="bg-white border border-border rounded-card shadow-card p-6 sm:p-8">
      <div className="w-full h-48 bg-gradient-to-br from-orange-light to-orange/30 rounded-card mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">💪</div>
          <p className="font-display font-bold text-orange text-xl">Together Transformed</p>
          <p className="font-body text-muted text-sm">12 Weeks to Your Dream Body</p>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {checklist.map((item) => (
          <li key={item} className="flex items-start gap-3 font-body text-body text-[15px]">
            <span className="text-success font-bold flex-shrink-0 mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="text-center mb-5">
        <span className="font-body text-muted text-lg line-through mr-3">$97</span>
        <span className="font-display font-bold text-[40px] text-dark">$27</span>
      </div>

      <CheckoutButton />
    </div>
  );
}

// ─── Sales content ──────────────────────────────────────────────────────────────

function SalesContent() {
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

  const reasonCards = [
    { icon: "🔄", title: "Trying to do it alone", body: "No partner accountability means no one to keep you going when motivation dips." },
    { icon: "😴", title: "Exhaustion making shortcuts feel justified", body: "When you're tired, every shortcut makes sense. Until it doesn't." },
    { icon: "🍕", title: "Food environment working against you", body: "It's not willpower. The system is built against you. Until you have your own." },
    { icon: "📅", title: "Waiting for the right time", body: "There is no right time. There's only now, and later. Later has a cost." },
  ];

  const systemFeatures = [
    { icon: "💪", title: "Push Pull Legs Training Plan", body: "3 sessions/week, 45 mins each. Done together. Built around real life." },
    { icon: "🍽", title: "The 80/20 Nutrition Framework", body: "No banned foods. Just your numbers. Sustainable because you're not starving." },
    { icon: "🧠", title: "The Mindset Method", body: "The 3 moments that break most couples — identified and handled before they derail you." },
    { icon: "📅", title: "The Sunday Ritual", body: "10 minutes a week that keeps you both on track. Simple enough to actually do." },
  ];

  const stakeItems = [
    { icon: "🤫", label: "Your confidence", body: "Getting a little quieter every year." },
    { icon: "❤️", label: "Your relationship", body: "The intimacy that goes unsaid." },
    { icon: "🫀", label: "Your health", body: "The energy you've forgotten you could have." },
    { icon: "🌅", label: "Your future", body: "The version of yourselves you keep promising to become." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sales mx-auto px-4 py-12 pb-24 space-y-16">

        {/* ─── 1. Persona reveal ───────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm font-body text-muted uppercase tracking-widest mb-2">
            Your result
          </p>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-dark mb-4">
            {persona.title}
          </h1>
          <p className="font-body text-muted text-[17px] max-w-[520px] mx-auto leading-relaxed">
            Based on your answers, here&apos;s what&apos;s actually happening —
            and exactly what it would take to change it.
          </p>
        </motion.section>

        {/* ─── 2. System headline ──────────────────────────────────────── */}
        <section className="text-center max-w-[600px] mx-auto">
          <h2 className="font-display font-bold text-[26px] sm:text-[32px] text-dark mb-4">
            The 12-Week Couple System for Getting Back in Shape Together
          </h2>
          <p className="font-body text-muted text-[17px] leading-relaxed">
            For couples who want a simple plan to lose weight, build momentum,
            and actually stay consistent.
          </p>
        </section>

        {/* ─── 3. Problem statement ─────────────────────────────────────── */}
        <section>
          <p className="text-center font-body text-muted text-sm uppercase tracking-widest mb-3">
            It&apos;s not your fault
          </p>
          <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-dark text-center mb-6 max-w-[500px] mx-auto">
            Most couples don&apos;t need more motivation.
          </h2>
          <p className="font-body text-body text-[17px] text-center leading-relaxed max-w-[520px] mx-auto mb-8">
            They need a system that works when life gets busy, energy is low,
            and both people are starting from the same place emotionally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {reasonCards.map((card) => (
              <FeatureCard key={card.title} icon={card.icon} title={card.title} body={card.body} />
            ))}
          </div>
          <p className="text-center font-body text-body text-[17px] leading-relaxed max-w-[500px] mx-auto">
            These aren&apos;t character flaws. They&apos;re patterns.
            And patterns can be broken — with the right system.
          </p>
        </section>

        {/* ─── 4. Timeline ──────────────────────────────────────────────── */}
        <section className="bg-offwhite rounded-card p-6 sm:p-8">
          <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-dark mb-6 text-center">
            Most couples notice this and do nothing.
          </h2>
          <div className="space-y-6 relative">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
            {[
              { time: "Next month", text: "Same conversations. Same excuses. Same feelings on Sunday night." },
              { time: "Next year", text: "Clothes don't fit. Avoiding more plans. A little further apart." },
              { time: "In 5 years", text: '"Where did the time go?" — that thought that genuinely scares you.' },
            ].map((item) => (
              <div key={item.time} className="flex gap-5 pl-8 relative">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-orange border-2 border-white -translate-x-1/2" />
                <div>
                  <p className="font-body font-semibold text-orange text-sm mb-1">{item.time}</p>
                  <p className="font-body text-body text-[15px]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-muted mt-6 text-[15px] italic text-center">
            Until something forces a change. For Jake and Sarah, it was a Tuesday evening.
          </p>
        </section>

        {/* ─── 5. Jake & Sarah story ───────────────────────────────────── */}
        <section>
          <h2 className="font-display font-bold text-[28px] sm:text-[34px] text-dark mb-6 text-center">
            We were you. For years.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 h-64 sm:h-80 rounded-card overflow-hidden relative">
              <Image
                src="/images/before-1.png"
                alt="Jake and Sarah before their transformation"
                fill
                className="object-cover grayscale"
                style={{ objectPosition: "center 20%" }}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-bold text-white bg-black/60 rounded-pill px-3 py-1 uppercase tracking-widest">Before</span>
              </div>
            </div>
            <div className="flex-1 h-64 sm:h-80 rounded-card overflow-hidden relative">
              <Image
                src="/images/after-1.jpg"
                alt="Jake and Sarah after their 12-week transformation"
                fill
                className="object-cover"
                style={{ objectPosition: "center 28%" }}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-bold text-white bg-orange/80 rounded-pill px-3 py-1 uppercase tracking-widest">After</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 font-body text-body text-[16px] leading-relaxed">
            <p>
              We weren&apos;t unhappy. That&apos;s the thing nobody tells you. We loved each other. We had a good life.
              But every time we looked in the mirror together, or saw a photo, or got dressed for a night out — there was this quiet heaviness.
            </p>
            <p>
              We&apos;d tried before. Both of us, separately, had done the gym thing. Done the diet thing. Lost a bit of weight, put it back on.
              The problem was we were doing it alone. In the same house, with the same food, the same schedules, the same excuses — doing it separately.
            </p>
            <p>
              Then we decided to do it together. Not as a competition. As a team. We found a system simple enough to actually follow.
              Three sessions a week. Real food with real numbers. One 10-minute conversation on Sundays to stay on track.
            </p>
            <p>
              Twelve weeks later, we&apos;d both dropped more weight than we&apos;d ever managed alone.
              Combined, over 100lbs. But honestly? The weight was almost secondary to how we felt as a couple.
            </p>
            <p className="font-semibold text-dark">
              We&apos;re not personal trainers. We were just a normal couple who finally found
              a system simple enough to actually do together. And we did it.
            </p>
          </div>

          <div className="text-center mt-8 bg-orange-light border border-orange/20 rounded-card py-5 px-4">
            <p className="font-display font-bold text-[22px] text-dark">
              Combined: 100lbs lost. 12 weeks.
            </p>
            <p className="font-body text-muted text-sm mt-1">
              The same system you&apos;re about to get.
            </p>
          </div>
        </section>

        {/* ─── 6. What's at stake ──────────────────────────────────────── */}
        <section>
          <h2 className="font-display font-bold text-[24px] sm:text-[28px] text-dark mb-2 text-center">
            Here&apos;s what&apos;s actually at stake.
          </h2>
          <p className="text-center font-body text-muted mb-8">
            Every year you wait, it costs you something.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {stakeItems.map((item) => (
              <div key={item.label} className="border border-border rounded-card p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-body font-semibold text-dark text-[15px] mb-1">{item.label}</p>
                  <p className="font-body text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-body text-[17px] leading-relaxed max-w-[500px] mx-auto">
            The couples who fix this don&apos;t do it because they found more willpower.
            They do it because they found each other.
          </p>
        </section>

        {/* ─── 7. System reveal ────────────────────────────────────────── */}
        <section>
          <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-dark text-center mb-8">
            The System That Rebuilds Couples.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systemFeatures.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
            ))}
          </div>
        </section>

        {/* ─── 8. Product card ─────────────────────────────────────────── */}
        <ProductCard />

        {/* ─── 9. Urgency closer ───────────────────────────────────────── */}
        <section className="text-center py-4">
          <h2 className="font-display font-bold text-[24px] sm:text-[30px] text-dark mb-6">
            If you&apos;ve been saying &ldquo;we need to do something about this&rdquo; for months —
            this is your signal to actually start.
          </h2>
          <ProductCard />
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted font-body">
            @jakeandsarahfit · Together Transformed ·{" "}
            <a href="#" className="hover:text-orange transition-colors">
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

// ─── Page export ────────────────────────────────────────────────────────────────

export default function SalesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-muted font-body">Loading your results...</div>
        </div>
      }
    >
      <SalesContent />
    </Suspense>
  );
}
