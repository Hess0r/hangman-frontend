export type Word = {
  id: number;
  word: string;
};

export type AdminState = {
  words: Word[];
  loading: boolean;
};
