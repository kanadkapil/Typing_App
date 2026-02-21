export type TestMode = 'time' | 'words';

export type TimeLimit = 15 | 30 | 60 | 120;
export type WordLimit = 10 | 25 | 50 | 100;

export interface TestSettings {
  mode: TestMode;
  timeLimit: TimeLimit;
  wordLimit: WordLimit;
  language: string;
}

export interface HistoryRecord {
  id: string;
  date: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  chars: {
    correct: number;
    incorrect: number;
    total: number;
  };
  mode: TestMode;
  limit: number;
}

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  startTime: number | null;
  endTime: number | null;
  chartData: Array<{
    time: number;
    wpm: number;
    rawWpm: number;
    accuracy: number;
  }>;
}

export interface CharState {
  char: string;
  state: 'idle' | 'correct' | 'incorrect' | 'extra';
}

export interface WordState {
  original: string;
  chars: CharState[];
  isCorrect: boolean;
}
