import type * as Types from '../types/index';

type TestSettings = Types.TestSettings;
type TimeLimit = Types.TimeLimit;
type WordLimit = Types.WordLimit;

interface StatsBarProps {
    timeLeft: number;
    wpm: number;
    accuracy: number;
    settings: TestSettings;
    setSettings: (settings: TestSettings) => void;
    testActive: boolean;
}

const TIME_LIMITS: TimeLimit[] = [15, 30, 60, 120];
const WORD_LIMITS: WordLimit[] = [10, 25, 50, 100];

export const StatsBar = ({
    timeLeft,
    wpm,
    accuracy,
    settings,
    setSettings,
    testActive
}: StatsBarProps) => {
    return (
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto mb-10 text-xl font-mono">
            <div className="flex items-center gap-8">
                <div className="flex flex-col">
                    <span className="text-sub text-sm">wpm</span>
                    <span className="text-main text-3xl">{wpm}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sub text-sm">acc</span>
                    <span className="text-main text-3xl">{Math.round(accuracy)}%</span>
                </div>
                {settings.mode === 'time' && (
                    <div className="flex flex-col">
                        <span className="text-sub text-sm">time</span>
                        <span className="text-main text-3xl">{timeLeft}s</span>
                    </div>
                )}
            </div>

            {!testActive && (
                <div className="flex items-center gap-6 bg-black/20 p-2 rounded-lg text-sm text-sub">
                    <div className="flex gap-3 px-4 border-r border-sub/30">
                        <button
                            onClick={() => setSettings({ ...settings, mode: 'time' })}
                            className={settings.mode === 'time' ? 'text-main' : 'hover:text-text'}
                        >
                            time
                        </button>
                        <button
                            onClick={() => setSettings({ ...settings, mode: 'words' })}
                            className={settings.mode === 'words' ? 'text-main' : 'hover:text-text'}
                        >
                            words
                        </button>
                    </div>

                    <div className="flex gap-4">
                        {settings.mode === 'time' ? (
                            TIME_LIMITS.map(limit => (
                                <button
                                    key={limit}
                                    onClick={() => setSettings({ ...settings, timeLimit: limit })}
                                    className={settings.timeLimit === limit ? 'text-main' : 'hover:text-text'}
                                >
                                    {limit}
                                </button>
                            ))
                        ) : (
                            WORD_LIMITS.map(limit => (
                                <button
                                    key={limit}
                                    onClick={() => setSettings({ ...settings, wordLimit: limit })}
                                    className={settings.wordLimit === limit ? 'text-main' : 'hover:text-text'}
                                >
                                    {limit}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
