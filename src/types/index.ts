export type TestMode = 'time' | 'words';

export type TimeLimit = 15 | 30 | 60 | 120;
export type WordLimit = 10 | 25 | 50 | 100;

export interface TestSettings {
  mode: TestMode;
  timeLimit: TimeLimit;
  wordLimit: WordLimit;
  language: string;
  theme: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    main: string;
    sub: string;
    text: string;
  };
}

export const THEMES: Theme[] = [
  { id: 'carbon', name: 'Carbon', colors: { background: '#323437', main: '#a3e635', sub: '#646669', text: '#d1d0c5' } },
  { id: 'neon', name: 'Neon Nights', colors: { background: '#0f172a', main: '#22d3ee', sub: '#334155', text: '#f8fafc' } },
  { id: 'nordic', name: 'Nordic Frost', colors: { background: '#2e3440', main: '#88c0d0', sub: '#4c566a', text: '#e5e9f0' } },
  { id: 'forest', name: 'Forest Edge', colors: { background: '#1a2f23', main: '#bbf7d0', sub: '#365314', text: '#f0fdf4' } },
  { id: 'sunset', name: 'Sunset Retro', colors: { background: '#2d1b2d', main: '#fbbf24', sub: '#4c1d95', text: '#fff7ed' } },
  { id: 'matcha', name: 'Matcha Latte', colors: { background: '#414d44', main: '#98ad8d', sub: '#2b332d', text: '#ebf2e6' } },
  { id: 'cyberpunk', name: 'Cyberpunk', colors: { background: '#111111', main: '#fcee0a', sub: '#303030', text: '#00f0ff' } },
  { id: 'brutalist', name: 'Neo Brutalist', colors: { background: '#f0f0f0', main: '#ff0000', sub: '#1a1a1a', text: '#1a1a1a' } },
];

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
