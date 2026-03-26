"use client";

import { SocialProofTicker } from "@/components/landing/SocialProofTicker";
import { Hero } from "@/components/landing/Hero";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { StatCards } from "@/components/landing/StatCards";
import { PainPoints } from "@/components/landing/PainPoints";
import { QuoteCard } from "@/components/landing/QuoteCard";
import { Button } from "@/components/ui/Button";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function fireQuizStart() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "quiz_start", { event_category: "funnel" });
  }
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Social proof ticker */}
      <SocialProofTicker />

      {/* Hero section */}
      <Hero />

      {/* Before / After images */}
      <BeforeAfter />

      {/* First CTA */}
      <section className="max-w-landing mx-auto px-4 pb-6 flex justify-center">
        <Button href="/quiz" pulse fullWidth onClick={fireQuizStart}>
          TAKE THE FREE QUIZ &nbsp;→
        </Button>
      </section>

      {/* Stat cards */}
      <StatCards />

      {/* Pain points */}
      <PainPoints />

      {/* Quote / Jake & Sarah story teaser */}
      <QuoteCard />

      {/* Second CTA */}
      <section className="max-w-landing mx-auto px-4 py-10 flex justify-center">
        <Button href="/quiz" pulse fullWidth onClick={fireQuizStart}>
          TAKE THE FREE QUIZ &nbsp;→
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-4 py-6 pb-24">
        <div className="max-w-landing mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted font-body">
          <span>@jakeandsarahfit</span>
          <span className="hidden sm:block text-border">·</span>
          <span>Together Transformed</span>
          <span className="hidden sm:block text-border">·</span>
          <a href="#" className="hover:text-orange transition-colors">
            Privacy Policy
          </a>
        </div>
      </footer>
    </main>
  );
}
