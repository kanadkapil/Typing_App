import type { TypingStats, TestSettings } from '../types/index';
import { RotateCcw } from 'lucide-react';
import { StatsGraph } from './StatsGraph';

interface ResultModalProps {
    stats: TypingStats;
    settings: TestSettings;
    onRestart: () => void;
}

export const ResultModal = ({ stats, settings, onRestart }: ResultModalProps) => {
    return (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-4 gap-8 mb-8 w-full">
                <div className="flex flex-col">
                    <span className="text-sub text-base">wpm</span>
                    <span className="text-main text-5xl font-bold">{stats.wpm}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sub text-base">acc</span>
                    <span className="text-main text-5xl font-bold">{Math.round(stats.accuracy)}%</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sub text-base">raw</span>
                    <span className="text-text text-5xl font-bold">{stats.rawWpm}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sub text-base">errors</span>
                    <span className="text-error text-5xl font-bold">{stats.errors}</span>
                </div>
            </div>

            <div className="flex flex-col w-full mb-8 p-4 bg-black/10 rounded-lg">
                <div className="flex justify-between text-sub text-sm">
                    <div className="flex gap-4">
                        <span className="font-bold text-text">test type</span>
                        <span>{settings.mode} {settings.mode === 'time' ? settings.timeLimit : settings.wordLimit}</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-bold text-text">characters</span>
                        <span>{stats.correctChars}/{stats.incorrectChars}/{stats.totalChars}</span>
                    </div>
                </div>
            </div>

            <StatsGraph data={stats.chartData} />

            <button
                onClick={onRestart}
                className="flex items-center gap-3 px-8 py-3 bg-sub/10 hover:bg-sub/20 text-sub hover:text-text rounded-lg transition-all text-xl"
            >
                <RotateCcw size={24} />
                Restart (Tab)
            </button>
        </div>
    );
};
