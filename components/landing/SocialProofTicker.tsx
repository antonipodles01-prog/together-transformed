"use client";

const COUNT = process.env.NEXT_PUBLIC_SOCIAL_PROOF_COUNT ?? "3,298";

const message = `🟠 ${COUNT} couples have already started their transformation today`;
// Duplicate for seamless marquee loop
const content = Array(6).fill(message).join("   ·   ");

export function SocialProofTicker() {
  return (
    <div className="w-full bg-orange-light border-b border-orange/20 overflow-hidden py-2">
      <div className="flex">
        <div className="animate-marquee whitespace-nowrap flex-shrink-0">
          <span className="text-xs font-body font-medium text-orange tracking-wide">
            {content}
          </span>
        </div>
        {/* Duplicate for seamless loop */}
        <div
          className="animate-marquee whitespace-nowrap flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-xs font-body font-medium text-orange tracking-wide">
            {content}
          </span>
        </div>
      </div>
    </div>
  );
}
