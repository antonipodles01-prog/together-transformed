export interface QuizOption {
  text: string;
  weight: number; // 1 = least stuck, 4 = most stuck
}

export interface QuizQuestion {
  id: number;
  section: string;
  icon: string;
  text: string;
  options: QuizOption[];
}

// Q1 and Q2 are demographic qualifiers — all options weight 2
// Q3–Q16: option[0] = weight 1 (least stuck), last option = weight 4 (most stuck)
export const quizQuestions: QuizQuestion[] = [
  // ─── Section 1: The Mirror ───────────────────────────────────────────────────
  {
    id: 1,
    section: "The Mirror",
    icon: "👥",
    text: "Who is this for?",
    options: [
      { text: "Just me — I want to understand my own body", weight: 2 },
      { text: "Me and my partner — we both want to change", weight: 2 },
      { text: "My partner needs this more than me, honestly", weight: 2 },
    ],
  },
  {
    id: 2,
    section: "The Mirror",
    icon: "📅",
    text: "How old are you both?",
    options: [
      { text: "Under 25", weight: 2 },
      { text: "25–30", weight: 2 },
      { text: "31–35", weight: 2 },
      { text: "36–40", weight: 2 },
      { text: "40+", weight: 2 },
    ],
  },
  {
    id: 3,
    section: "The Mirror",
    icon: "🪞",
    text: "When you look in the mirror together, what's the first thing you notice?",
    options: [
      { text: "We both look great honestly", weight: 1 },
      { text: "One of us has let themselves go a bit", weight: 2 },
      { text: "We've both changed a lot since we got together", weight: 3 },
      { text: "I avoid looking at us in mirrors together", weight: 4 },
    ],
  },
  {
    id: 4,
    section: "The Mirror",
    icon: "📷",
    text: "Compared to when you first got together, your bodies today feel...",
    options: [
      { text: "Mostly the same — barely any difference", weight: 1 },
      { text: "Slightly different — life happened", weight: 2 },
      { text: "Very different — I barely recognise us in photos", weight: 3 },
      { text: "Almost unrecognisable — and it bothers me", weight: 4 },
    ],
  },

  // ─── Section 2: The Photos ────────────────────────────────────────────────────
  {
    id: 5,
    section: "The Photos",
    icon: "😳",
    text: 'How often do you look at photos of yourselves and think "I didn\'t realise we looked like that"?',
    options: [
      { text: "Never — we love photos of us", weight: 1 },
      { text: "Occasionally — sometimes it surprises me", weight: 2 },
      { text: "Often — it's become a bit of a thing", weight: 3 },
      { text: "We avoid photos completely", weight: 4 },
    ],
  },
  {
    id: 6,
    section: "The Photos",
    icon: "👕",
    text: "Which change has bothered you the most recently?",
    options: [
      { text: "Weight gain around the stomach", weight: 2 },
      { text: "Face looking older and puffier", weight: 2 },
      { text: "Clothes not fitting the way they used to", weight: 3 },
      { text: "Low energy and zero confidence", weight: 3 },
      { text: "Honestly — all of the above", weight: 4 },
    ],
  },
  {
    id: 7,
    section: "The Photos",
    icon: "👫",
    text: "When you're around other couples your age, how do you feel about how you both look?",
    options: [
      { text: "Confident — we hold our own", weight: 1 },
      { text: "Slightly self-conscious but fine", weight: 2 },
      { text: "Very self-conscious — I notice the difference", weight: 3 },
      {
        text: "We avoid situations where we'd be compared to other couples",
        weight: 4,
      },
    ],
  },

  // ─── Section 3: The Relationship ──────────────────────────────────────────────
  {
    id: 8,
    section: "The Relationship",
    icon: "🚪",
    text: "When you walk into a room together as a couple, you feel...",
    options: [
      { text: "Proud and confident — we make an entrance", weight: 1 },
      { text: "Okay but not our best", weight: 2 },
      { text: "Embarrassed — I wish we looked different", weight: 3 },
      { text: "We've started avoiding going out together as much", weight: 4 },
    ],
  },
  {
    id: 9,
    section: "The Relationship",
    icon: "❤️",
    text: "Has your weight or appearance affected your relationship in any way?",
    options: [
      { text: "Not at all — we're solid", weight: 1 },
      { text: "Slightly — there's less confidence between us", weight: 2 },
      { text: "Yes — intimacy and closeness has quietly changed", weight: 3 },
      {
        text: "Significantly — it's become a source of tension we don't talk about",
        weight: 4,
      },
    ],
  },
  {
    id: 10,
    section: "The Relationship",
    icon: "🔒",
    text: "Have you ever felt like how you both look is holding your relationship back?",
    options: [
      { text: "Never — it doesn't affect us", weight: 1 },
      { text: "Occasionally — it crosses my mind", weight: 2 },
      { text: "Often — more than I'd like to admit", weight: 3 },
      {
        text: "This is something we both feel but have never actually said out loud",
        weight: 4,
      },
    ],
  },

  // ─── Section 4: The History ────────────────────────────────────────────────────
  {
    id: 11,
    section: "The History",
    icon: "💪",
    text: "How do you feel when you see couples your age who are fit and in shape?",
    options: [
      { text: "Inspired — good for them", weight: 1 },
      { text: "Slightly envious — I want that", weight: 2 },
      { text: "Very envious — it makes me feel worse about us", weight: 3 },
      { text: "Like that will never be us — it feels out of reach", weight: 4 },
    ],
  },
  {
    id: 12,
    section: "The History",
    icon: "🔄",
    text: "Have you tried to lose weight or get in shape before?",
    options: [
      { text: "Never tried — this would be our first time", weight: 1 },
      { text: "Tried once or twice — it didn't stick", weight: 2 },
      {
        text: 'Tried many times and failed — we\'re the "Monday" couple',
        weight: 3,
      },
      { text: "Currently trying something that isn't working", weight: 4 },
    ],
  },
  {
    id: 13,
    section: "The History",
    icon: "🕐",
    text: "When you look at photos of yourselves from 5 years ago compared to now, what do you feel?",
    options: [
      { text: "Proud of where we are today", weight: 1 },
      { text: "Neutral — time passes, things change", weight: 2 },
      { text: "A quiet sadness — I miss how we looked", weight: 3 },
      { text: "We don't look at old photos anymore", weight: 4 },
    ],
  },

  // ─── Section 5: The Future ─────────────────────────────────────────────────────
  {
    id: 14,
    section: "The Future",
    icon: "✨",
    text: "If you could visibly transform both your bodies in 12 weeks, how would that change your relationship?",
    options: [
      { text: "We'd be more confident going out together", weight: 1 },
      { text: "More intimacy and closeness between us", weight: 2 },
      {
        text: "We'd do the things we currently avoid — holidays, photos, going out",
        weight: 3,
      },
      {
        text: "It would completely change our lives — I can barely imagine it",
        weight: 4,
      },
    ],
  },
  {
    id: 15,
    section: "The Future",
    icon: "🎯",
    text: "If you found a proven system built for couples that could transform both your bodies in 12 weeks — would you commit to it?",
    options: [
      { text: "We'd definitely try it — we're ready", weight: 1 },
      { text: "Probably yes — we just need the right thing", weight: 2 },
      { text: "Maybe — we've heard it all before", weight: 3 },
      { text: "We've been saying we would for years", weight: 4 },
    ],
  },
  {
    id: 16,
    section: "The Future",
    icon: "⏳",
    text: "If nothing changed about how you both look and feel for the next 5 years, how would that make you feel?",
    options: [
      { text: "Fine — we're happy as we are", weight: 1 },
      { text: "Slightly worried — I don't want that", weight: 2 },
      { text: "Very worried — the thought bothers me", weight: 3 },
      {
        text: "That thought genuinely scares me — something has to change",
        weight: 4,
      },
    ],
  },
];
