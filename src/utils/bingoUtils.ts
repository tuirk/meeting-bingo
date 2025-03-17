
// List of meeting bingo phrases
export const BINGO_PHRASES = [
  "Let's take this offline.",
  "Can everyone see my screen?",
  "This should be a quick meeting.",
  "You're on mute.",
  "That's out of scope for today.",
  "I know we're over time, but...",
  "We lost you for a second/moment there.",
  "Can everyone please mute if they're not speaking?",
  "Your camera is pixelated/freezing.",
  "Let's park that idea for now.",
  "I just want to be mindful of everyone's time.",
  "If anything's unclear, feel free to jump in.",
  "Can we circle back on this later?",
  "Let me quickly share my screen.",
  "Can you hear me now?",
  "I think you're still sharing your screen.",
  "I believe [Person's Name] was about to say something.",
  "Sorry, I was having connection issues.",
  "Let's not overcomplicate this.",
  "This might be a silly question, but...",
  "I think we need a separate meeting for this.",
  "We'll need to loop in other teams on this.",
  "I think someone's mic is picking up noise.",
  "We're running out of time, so let's wrap up.",
];

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate a bingo board with shuffled phrases
export const generateBingoBoard = (): string[] => {
  const shuffledPhrases = shuffleArray(BINGO_PHRASES);
  // Insert free space in the middle (index 12)
  const boardPhrases = [...shuffledPhrases.slice(0, 12), "Free Space", ...shuffledPhrases.slice(12, 24)];
  return boardPhrases;
};

// Check if a bingo pattern is complete (row, column, or diagonal)
export const checkForBingo = (stamps: boolean[]): boolean => {
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (
      stamps[i * 5 + 0] &&
      stamps[i * 5 + 1] &&
      stamps[i * 5 + 2] &&
      stamps[i * 5 + 3] &&
      stamps[i * 5 + 4]
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    if (
      stamps[i] &&
      stamps[i + 5] &&
      stamps[i + 10] &&
      stamps[i + 15] &&
      stamps[i + 20]
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    stamps[0] &&
    stamps[6] &&
    stamps[12] &&
    stamps[18] &&
    stamps[24]
  ) {
    return true;
  }

  if (
    stamps[4] &&
    stamps[8] &&
    stamps[12] &&
    stamps[16] &&
    stamps[20]
  ) {
    return true;
  }

  return false;
};

// Get indices of completed bingo patterns
export const getBingoPatterns = (stamps: boolean[]): number[][] => {
  const patterns: number[][] = [];

  // Check rows
  for (let i = 0; i < 5; i++) {
    const rowIndices = [i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4];
    if (rowIndices.every(index => stamps[index])) {
      patterns.push(rowIndices);
    }
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    const colIndices = [i, i + 5, i + 10, i + 15, i + 20];
    if (colIndices.every(index => stamps[index])) {
      patterns.push(colIndices);
    }
  }

  // Check diagonals
  const diag1 = [0, 6, 12, 18, 24];
  if (diag1.every(index => stamps[index])) {
    patterns.push(diag1);
  }

  const diag2 = [4, 8, 12, 16, 20];
  if (diag2.every(index => stamps[index])) {
    patterns.push(diag2);
  }

  return patterns;
};

// Generate random confetti colors
export const getRandomConfettiColor = (): string => {
  const colors = [
    "bg-bingo-primary",
    "bg-bingo-secondary",
    "bg-bingo-accent",
    "bg-bingo-highlight",
    "bg-bingo-stamped",
    "bg-bingo-bingo",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
