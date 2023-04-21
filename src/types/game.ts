export type GameState = {
  game: Game | null;
  loading: boolean;
  status: "init" | "found" | "not_found";
};

export type GameDifficulty = "EASY" | "MEDIUM" | "HARD";

export type Game = {
  id: number;
  guessedLetters: string;
  remainingIncorrectGuesses: number;
  currentWord: string;
  status: "IN_PROGRESS" | "WON" | "LOST";
  difficulty: GameDifficulty;
};
