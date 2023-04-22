export type UserScore = {
  id: number;
  name: string;
  score: number;
  rank: number;
};

export type LeaderboardState = {
  leaderboard: UserScore[];
  loading: boolean;
};
