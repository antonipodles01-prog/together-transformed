export interface QuizOption {
  text: string;
  weight: number; // 1 = least stuck/urgent, 4 = most stuck/urgent
}

export interface QuizQuestion {
  id: number;
  icon: string;
  text: string;
  options: QuizOption[];
}

// Q1 is a demographic qualifier — all options weight 2 (neutral)
// Q2–Q9: weight 1 (lowest urgency) → 4 (highest urgency)
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    icon: "👥",
    text: "Who is this for?",
    options: [
      { text: "Just me", weight: 2 },
      { text: "Me and my partner", weight: 2 },
      { text: "My partner and I need this equally", weight: 2 },
    ],
  },
  {
    id: 2,
    icon: "🔍",
    text: "What best describes your situation right now?",
    options: [
      { text: "We've both let things slide", weight: 2 },
      { text: "One of us is more motivated than the other", weight: 2 },
      { text: "We keep meaning to start but never do", weight: 3 },
      { text: "We've tried before and fallen off", weight: 4 },
    ],
  },
  {
    id: 3,
    icon: "💥",
    text: "What's the biggest issue right now?",
    options: [
      { text: "Low energy", weight: 1 },
      { text: "Weight gain", weight: 2 },
      { text: "Confidence", weight: 2 },
      { text: "Clothes not fitting", weight: 3 },
      { text: "Avoiding photos", weight: 3 },
      { text: "Intimacy or connection", weight: 4 },
      { text: "More than one of these", weight: 4 },
    ],
  },
  {
    id: 4,
    icon: "⏳",
    text: "How long has this been building?",
    options: [
      { text: "A few months", weight: 1 },
      { text: "Over a year", weight: 2 },
      { text: "Several years", weight: 3 },
      { text: "Too long", weight: 4 },
    ],
  },
  {
    id: 5,
    icon: "💬",
    text: "How often do you talk about getting in shape together?",
    options: [
      { text: "Often", weight: 1 },
      { text: "Sometimes", weight: 2 },
      { text: "Rarely", weight: 3 },
      { text: "Almost never", weight: 4 },
    ],
  },
  {
    id: 6,
    icon: "🚧",
    text: "What usually stops you?",
    options: [
      { text: "Time", weight: 2 },
      { text: "Stress", weight: 2 },
      { text: "Food habits", weight: 3 },
      { text: "Motivation", weight: 3 },
      { text: "Lack of a clear plan", weight: 3 },
      { text: "One of us always drops off", weight: 4 },
    ],
  },
  {
    id: 7,
    icon: "🎯",
    text: "If you could fix one thing first, what would it be?",
    options: [
      { text: "Feel better in clothes", weight: 1 },
      { text: "Look better in photos", weight: 2 },
      { text: "Feel more confident together", weight: 3 },
      { text: "Get back into a routine", weight: 3 },
      { text: "Actually stay consistent", weight: 4 },
    ],
  },
  {
    id: 8,
    icon: "⚡",
    text: "How ready are you to do something about this now?",
    options: [
      { text: "We're ready now", weight: 1 },
      { text: "Probably soon", weight: 2 },
      { text: "We've been saying that for a while", weight: 3 },
      { text: "Not sure", weight: 4 },
    ],
  },
  {
    id: 9,
    icon: "✨",
    text: "What would be the most meaningful change in 12 weeks?",
    options: [
      { text: "Feel like a team again", weight: 1 },
      { text: "Look noticeably better together", weight: 2 },
      { text: "Have more energy", weight: 2 },
      { text: "Stop avoiding social situations", weight: 3 },
      { text: "Start and actually finish something together", weight: 4 },
    ],
  },
];
