import { quizQuestions } from "./quiz-questions";

// Q1 neutral (weight 2), Q2–Q9 max weight 4 each = 2 + (8 × 4) = 34
const MAX_SCORE = 34;

/**
 * Calculate score as a percentage (0–100).
 * Higher % = more stuck = higher urgency.
 */
export function calculateScore(answers: number[]): number {
  if (answers.length === 0) return 0;

  let total = 0;
  answers.forEach((optionIndex, questionIndex) => {
    const question = quizQuestions[questionIndex];
    if (question && question.options[optionIndex] !== undefined) {
      total += question.options[optionIndex].weight;
    }
  });

  return Math.round((total / MAX_SCORE) * 100);
}

export type Persona = "Stuck" | "Frustrated" | "Ready";

export function getPersona(score: number): Persona {
  if (score >= 70) return "Stuck";
  if (score >= 40) return "Frustrated";
  return "Ready";
}

export interface PersonaDetails {
  label: Persona;
  title: string;
  tagline: string;
  description: string;
  insights: string[];
}

export function getPersonaDetails(score: number): PersonaDetails {
  const persona = getPersona(score);

  const details: Record<Persona, PersonaDetails> = {
    Stuck: {
      label: "Stuck",
      title: "The Stuck Couple",
      tagline: "You know something needs to change. You just haven't found the right way yet.",
      description:
        "You're carrying more than just the physical weight. The avoidance, the unspoken frustration, the same Sunday night conversation — it's a pattern. And patterns can be broken with the right system.",
      insights: [
        "The drift has been building longer than either of you admits",
        "Focus on consistency first — motivation follows action, not the other way around",
        "A shared system removes the friction that keeps stopping you both",
      ],
    },
    Frustrated: {
      label: "Frustrated",
      title: "The Frustrated Couple",
      tagline: "You've tried before. It didn't stick. That's not a character flaw — it's a systems problem.",
      description:
        "You're aware of the gap between where you are and where you want to be. You've made attempts. What's been missing isn't willpower — it's a plan built for two people with one shared life.",
      insights: [
        "Past attempts failed because they weren't built for couples",
        "Focus on alignment — both people need to be pulling in the same direction",
        "The right framework makes consistency the default, not the exception",
      ],
    },
    Ready: {
      label: "Ready",
      title: "The Ready Couple",
      tagline: "The motivation is there. You just need a system that matches it.",
      description:
        "You're not stuck in denial. You're not burned out from failed attempts. You're at the point where the right plan, started now, could genuinely change things in 12 weeks.",
      insights: [
        "Your mindset is already ahead of most couples who come here",
        "Focus on building the habit structure before chasing big results",
        "12 weeks of the right system will take you further than you expect",
      ],
    },
  };

  return details[persona];
}
