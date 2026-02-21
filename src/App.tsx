import { useState, useEffect, useCallback } from 'react';
import { useTypingTest } from './hooks/useTypingTest';
import { StatsBar } from './components/StatsBar';
import { TypingArea } from './components/TypingArea';
import { ResultModal } from './components/ResultModal';
import { HistoryPanel } from './components/HistoryPanel';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import type { TestSettings, HistoryRecord } from './types/index';
import { Keyboard, Command, Volume2 } from 'lucide-react';
import useSound from 'use-sound';

const KEY_SOUND = 'https://www.fesliyanstudios.com/play-mp3/4386'; // Mechanical key sound

export default function App() {
  const [settings, setSettings] = useState<TestSettings>({
    mode: 'time',
    timeLimit: 30,
    wordLimit: 25,
    language: 'english',
    theme: 'carbon',
  });

  const {
    words,
    currentWordIndex,
    currentInput,
    testActive,
    testFinished,
    timeLeft,
    stats,
    handleInput,
    initTest,
  } = useTypingTest(settings);

  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [play] = useSound(KEY_SOUND, { volume: 0.5 });

  // Load history and settings
  useEffect(() => {
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedSettings = localStorage.getItem('typingSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('typingSettings', JSON.stringify(settings));

    // Update theme attribute on html element
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings]);

  // Save result to history
  useEffect(() => {
    if (testFinished && stats.totalChars > 0) {
      const newRecord: HistoryRecord = {
        id: crypto.randomUUID(),
        date: Date.now(),
        wpm: stats.wpm,
        rawWpm: stats.rawWpm,
        accuracy: stats.accuracy,
        chars: {
          correct: stats.correctChars,
          incorrect: stats.incorrectChars,
          total: stats.totalChars,
        },
        mode: settings.mode,
        limit: settings.mode === 'time' ? settings.timeLimit : settings.wordLimit,
      };

      const updated = [newRecord, ...history].slice(0, 20);
      setHistory(updated);
      localStorage.setItem('typingHistory', JSON.stringify(updated));
    }
  }, [testFinished]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      initTest();
    }
    if (e.key === 'Escape') {
      initTest();
    }
  }, [initTest]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (soundEnabled) play();
    handleInput(e);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('typingHistory');
  };

  return (
    <div className="min-h-screen bg-background text-text font-mono flex flex-col p-8 transition-colors duration-300">
      <header className="flex items-center justify-between w-full max-w-5xl mx-auto mb-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-main rounded-md flex items-center justify-center text-background">
            <Keyboard size={24} strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Fun<span className="text-main">type</span></h1>
        </div>

        <div className="flex items-center gap-4 text-sub">
          <ThemeSwitcher
            currentTheme={settings.theme}
            onThemeChange={(themeId) => setSettings(prev => ({ ...prev, theme: themeId }))}
          />
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded hover:text-text transition-colors ${soundEnabled ? 'text-main' : ''}`}
            title="Toggle Sound"
          >
            <Volume2 size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-10">
        {!testFinished ? (
          <>
            <StatsBar
              timeLeft={timeLeft}
              wpm={stats.wpm}
              accuracy={stats.accuracy}
              settings={settings}
              setSettings={setSettings}
              testActive={testActive}
            />
            <TypingArea
              words={words}
              currentWordIndex={currentWordIndex}
              currentInput={currentInput}
              handleInput={onInputChange}
              testActive={testActive}
              testFinished={testFinished}
            />
            <div className={`mt-12 flex items-center justify-center gap-8 text-sub text-sm transition-opacity duration-500 ${testActive ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center gap-2">
                <span className="bg-sub/20 px-2 py-0.5 rounded border border-sub/30">tab</span>
                <span>restart test</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-sub/20 px-2 py-0.5 rounded border border-sub/30">esc</span>
                <span>quit test</span>
              </div>
            </div>
          </>
        ) : (
          <ResultModal
            stats={stats}
            settings={settings}
            onRestart={initTest}
          />
        )}

        {!testActive && !testFinished && (
          <HistoryPanel history={history} onClear={clearHistory} />
        )}
      </main>

      <footer className="w-full max-w-5xl mx-auto mt-20 pt-8 border-t border-sub/10 flex items-center justify-between text-sub text-xs">
        <div className="flex gap-6">
          <a href="#" className="hover:text-text transition-colors">github</a>
          <a href="#" className="hover:text-text transition-colors">twitter</a>
          <a href="#" className="hover:text-text transition-colors">discord</a>
        </div>
        <div className="flex items-center gap-1">
          <Command size={12} />
          <span>Made for high performance typing</span>
        </div>
      </footer>
    </div>
  );
}
