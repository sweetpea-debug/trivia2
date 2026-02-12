window.QUIZZES = [
  {
    id: "geo-capitals",
    title: "Capital Cities Sprint",
    category: "geography",
    difficulty: "easy",
    description: "Identify capital cities from country prompts.",
    questions: [
      { prompt: "Capital of Japan", answer: "tokyo" },
      { prompt: "Capital of Canada", answer: "ottawa" },
      { prompt: "Capital of Brazil", answer: "brasilia", aliases: ["brasília"] },
    ],
  },
  {
    id: "history-timeline",
    title: "History Timeline Recall",
    category: "history",
    difficulty: "medium",
    description: "Type the historical person or event that fits each clue.",
    questions: [
      { prompt: "Who wrote the U.S. Declaration of Independence?", answer: "thomas jefferson" },
      { prompt: "What wall fell in 1989 in Germany?", answer: "berlin wall" },
      { prompt: "Which empire built Machu Picchu?", answer: "inca", aliases: ["inca empire"] },
    ],
  },
  {
    id: "art-masters",
    title: "Art Masters",
    category: "art",
    difficulty: "hard",
    description: "Match famous artworks and artistic movements with typed responses.",
    questions: [
      { prompt: "Who painted 'Guernica'?", answer: "pablo picasso", aliases: ["picasso"] },
      { prompt: "'The Persistence of Memory' is by?", answer: "salvador dali", aliases: ["dali", "dalí", "salvador dalí"] },
      { prompt: "The art movement associated with Monet?", answer: "impressionism" },
    ],
  },
];

window.PUZZLES = [
  {
    id: "logic-lock",
    title: "Logic Lock",
    category: "logic",
    difficulty: "easy",
    description: "Enter the 3-digit code using clue elimination.",
    type: "code",
    prompt: "Clues: 682 (one number correct and in correct place), 614 (one correct but wrong place), 206 (two correct but wrong place), 738 (nothing correct), 780 (one correct but wrong place).",
    answer: "042",
    hint: "Start by eliminating all digits in 738.",
  },
  {
    id: "pattern-next",
    title: "Pattern Next Number",
    category: "math",
    difficulty: "medium",
    description: "Find the next number in the sequence.",
    type: "single",
    prompt: "2, 6, 12, 20, 30, ?",
    answer: "42",
    hint: "Look at the differences: +4, +6, +8, +10...",
  },
  {
    id: "cipher-word",
    title: "Mini Caesar Cipher",
    category: "word",
    difficulty: "hard",
    description: "Decode a Caesar-shifted word by shifting each letter back 3.",
    type: "single",
    prompt: "Decode: 'SXCCOH' (a Caesar shift was used)",
    answer: "puzzle",
    hint: "A->X when shifting back by 3.",
  },
];
