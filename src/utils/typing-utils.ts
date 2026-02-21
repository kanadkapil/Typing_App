import { words } from '../data/words';
import type { WordState } from '../types/index';

export const generateWords = (count: number): string[] => {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const calculateWPM = (correctChars: number, timeElapsedMs: number): number => {
  if (timeElapsedMs === 0) return 0;
  const minutes = timeElapsedMs / 60000;
  const wpm = (correctChars / 5) / minutes;
  return Math.max(0, Math.round(wpm));
};

export const calculateRawWPM = (totalChars: number, timeElapsedMs: number): number => {
  if (timeElapsedMs === 0) return 0;
  const minutes = timeElapsedMs / 60000;
  const rawWpm = (totalChars / 5) / minutes;
  return Math.max(0, Math.round(rawWpm));
};

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 0;
  const accuracy = (correctChars / totalChars) * 100;
  return Math.min(100, Math.max(0, Math.round(accuracy * 100) / 100));
};

export const getCharState = (expected: string, input: string): 'correct' | 'incorrect' => {
  return expected === input ? 'correct' : 'incorrect';
};

export const initializeWordState = (word: string): WordState => {
  return {
    original: word,
    chars: word.split('').map(char => ({ char, state: 'idle' })),
    isCorrect: false,
  };
};
