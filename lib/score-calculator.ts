import { quizQuestions } from "./quiz-questions";

// Maximum possible score: 16 questions × 4 points = 64
const MAX_SCORE = 64;

/**
 * Calculate the overall transformation readiness score as a percentage.
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

export type Persona = "Stuck" | "Struggling" | "Almost" | "Ready";

/**
 * Map score percentage to persona label.
 */
export function getPersona(score: number): Persona {
  if (score <= 25) return "Stuck";
  if (score <= 50) return "Struggling";
  if (score <= 75) return "Almost";
  return "Ready";
}

export interface PersonaDetails {
  label: Persona;
  title: string;
  tagline: string;
  description: string;
}

export function getPersonaDetails(score: number): PersonaDetails {
  const persona = getPersona(score);

  const details: Record<Persona, PersonaDetails> = {
    Stuck: {
      label: "Stuck",
      title: "The Stuck Couple",
      tagline: "You know something needs to change. You just haven't found the right way yet.",
      description:
        "Your score suggests you're carrying a heavier weight than just the physical kind. The avoidance, the unspoken tension, the same conversations on Sunday nights — it's a pattern. And patterns can be broken.",
    },
    Struggling: {
      label: "Struggling",
      title: "The Struggling Couple",
      tagline: "You're close to the edge of change. The gap between where you are and where you want to be is real — but it's not as wide as it feels.",
      description:
        "You've tried before. Maybe it didn't stick. But you're still here, still looking for the answer. That persistence matters. The right system — built for couples — changes everything.",
    },
    Almost: {
      label: "Almost",
      title: "The Almost Couple",
      tagline: "You're closer than you think. The desire is there. What's been missing is the system.",
      description:
        "You're motivated. You care about how you both look and feel. You just haven't had a plan that works for two people with one shared life. That's what this solves.",
    },
    Ready: {
      label: "Ready",
      title: "The Ready Couple",
      tagline: "You know you want this. You're looking for the green light. This is it.",
      description:
        "Your mindset is already there. You're not stuck in denial — you're ready to act. The question isn't whether you should start. It's whether you'll start today.",
    },
  };

  return details[persona];
}

export interface SubScores {
  transformationReadiness: number;
  relationshipMomentum: number;
  bodyPotential: number;
  urgencyScore: number;
}

/**
 * Calculate 4 sub-scores from specific question groups.
 * All returned as percentages (0–100).
 *
 * Transformation Readiness: Q3–Q6 (indices 2–5)
 * Relationship Momentum:    Q7–Q10 (indices 6–9)
 * Body Potential:           Q11–Q13 (indices 10–12)
 * Urgency Score:            Q14–Q16 (indices 13–15)
 */
export function getSubScores(answers: number[]): SubScores {
  function groupScore(indices: number[], maxPerQ = 4): number {
    const questions = indices.map((i) => quizQuestions[i]);
    const weights = indices.map((i) => {
      const q = quizQuestions[i];
      if (!q || answers[i] === undefined) return 0;
      return q.options[answers[i]]?.weight ?? 0;
    });
    const total = weights.reduce((a, b) => a + b, 0);
    const maxTotal = questions.length * maxPerQ;
    return maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;
  }

  return {
    transformationReadiness: groupScore([2, 3, 4, 5]),
    relationshipMomentum: groupScore([6, 7, 8, 9]),
    bodyPotential: groupScore([10, 11, 12]),
    urgencyScore: groupScore([13, 14, 15]),
  };
}
