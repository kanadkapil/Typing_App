import { useState, useEffect, useCallback, useRef } from 'react';
import type { TestSettings, TypingStats, WordState, CharState } from '../types/index';
import { generateWords, initializeWordState, calculateWPM, calculateRawWPM, calculateAccuracy } from '../utils/typing-utils';

export const useTypingTest = (settings: TestSettings) => {
  const [words, setWords] = useState<WordState[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [testActive, setTestActive] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(settings.timeLimit);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    rawWpm: 0,
    accuracy: 0,
    errors: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    startTime: null,
    endTime: null,
    chartData: [],
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initTest = useCallback(() => {
    const wordLimit = settings.mode === 'words' ? settings.wordLimit : 100;
    const newWords = generateWords(wordLimit).map(initializeWordState);
    setWords(newWords);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setTestActive(false);
    setTestFinished(false);
    setTimeLeft(settings.timeLimit);
    setStats({
      wpm: 0,
      rawWpm: 0,
      accuracy: 0,
      errors: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      startTime: null,
      endTime: null,
      chartData: [],
    });
  }, [settings]);

  useEffect(() => {
    initTest();
  }, [initTest]);

  const endTest = useCallback(() => {
    setTestActive(false);
    setTestFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    setStats(prev => ({
      ...prev,
      endTime: Date.now(),
    }));
  }, []);

  useEffect(() => {
    if (testActive && settings.mode === 'time') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testActive, settings.mode, endTest]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testFinished) return;
    
    const input = e.target.value;
    if (!testActive && input.length > 0) {
      setTestActive(true);
      setStats(prev => ({ ...prev, startTime: Date.now() }));
    }

    if (input.endsWith(' ')) {
      const wordToSubmit = input.trim();
      const currentWord = words[currentWordIndex];
      
      // Mark word correctness
      const updatedWords = [...words];
      updatedWords[currentWordIndex].isCorrect = (wordToSubmit === currentWord.original);
      
      // Move to next word
      setWords(updatedWords);
      setCurrentWordIndex(prev => prev + 1);
      setCurrentInput('');

      // Check if finished (word mode)
      if (settings.mode === 'words' && currentWordIndex + 1 >= settings.wordLimit) {
        endTest();
      }
      return;
    }

    setCurrentInput(input);

    // Update current word char states
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    const updatedChars: CharState[] = currentWord.original.split('').map((char, idx) => {
      if (idx >= input.length) return { char, state: 'idle' };
      return {
        char,
        state: input[idx] === char ? 'correct' : 'incorrect',
      };
    });

    // Handle extra chars
    if (input.length > currentWord.original.length) {
      for (let i = currentWord.original.length; i < input.length; i++) {
        updatedChars.push({ char: input[i], state: 'extra' });
      }
    }

    const updatedWords = [...words];
    updatedWords[currentWordIndex].chars = updatedChars;
    setWords(updatedWords);

    // Live Stats update
    updateStats();
  };

  const updateStats = useCallback(() => {
    if (!stats.startTime) return;
    
    const timeElapsed = Date.now() - stats.startTime;
    let correctChars = 0;
    let totalChars = 0;
    let errors = 0;

    words.slice(0, currentWordIndex + 1).forEach((word, idx) => {
      word.chars.forEach((c) => {
        if (c.state === 'correct') correctChars++;
        if (c.state === 'incorrect' || c.state === 'extra') {
          errors++;
          totalChars++;
        } else if (c.state === 'correct') {
          totalChars++;
        }
      });
      // Add space as a character if it's not the last word
      if (idx < currentWordIndex) {
        correctChars++; 
        totalChars++;
      }
    });

    setStats(prev => ({
      ...prev,
      correctChars,
      totalChars,
      errors,
      wpm: calculateWPM(correctChars, timeElapsed),
      rawWpm: calculateRawWPM(totalChars, timeElapsed),
      accuracy: calculateAccuracy(correctChars, totalChars),
      chartData: prev.chartData,
    }));
  }, [words, currentWordIndex, stats.startTime]);

  const recordStats = useCallback(() => {
    if (!stats.startTime || !testActive) return;
    
    const timeElapsed = Date.now() - stats.startTime;
    const second = Math.floor(timeElapsed / 1000);
    
    // Calculate current stats for this point in time
    let correctChars = 0;
    let totalChars = 0;

    words.slice(0, currentWordIndex + 1).forEach((word, idx) => {
        word.chars.forEach((c) => {
            if (c.state === 'correct') correctChars++;
            if (c.state === 'incorrect' || c.state === 'extra') {
                totalChars++;
            } else if (c.state === 'correct') {
                totalChars++;
            }
        });
        if (idx < currentWordIndex) {
            correctChars++; 
            totalChars++;
        }
    });

    const currentWpm = calculateWPM(correctChars, timeElapsed);
    const currentRawWpm = calculateRawWPM(totalChars, timeElapsed);
    const currentAcc = calculateAccuracy(correctChars, totalChars);

    setStats(prev => {
        // Prevent duplicate entries for the same second
        if (prev.chartData.length > 0 && prev.chartData[prev.chartData.length - 1].time === second) {
            return prev;
        }
        return {
            ...prev,
            chartData: [...prev.chartData, {
                time: second,
                wpm: currentWpm,
                rawWpm: currentRawWpm,
                accuracy: currentAcc
            }]
        };
    });
  }, [words, currentWordIndex, stats.startTime, testActive]);

  // Periodic stats recording for graph
  useEffect(() => {
    if (testActive) {
      const interval = setInterval(recordStats, 1000);
      return () => clearInterval(interval);
    }
  }, [testActive, recordStats]);

  // Periodic stats update for live WPM
  useEffect(() => {
    if (testActive) {
      const interval = setInterval(updateStats, 500);
      return () => clearInterval(interval);
    }
  }, [testActive, updateStats]);

  return {
    words,
    currentWordIndex,
    currentInput,
    testActive,
    testFinished,
    timeLeft,
    stats,
    handleInput,
    initTest,
  };
};
