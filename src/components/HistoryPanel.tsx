import type { HistoryRecord } from '../types/index';
import { Trash2, History as HistoryIcon } from 'lucide-react';

interface HistoryPanelProps {
    history: HistoryRecord[];
    onClear: () => void;
}

export const HistoryPanel = ({ history, onClear }: HistoryPanelProps) => {
    if (history.length === 0) return null;

    return (
        <div className="w-full max-w-5xl mx-auto mt-20 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sub font-mono">
                    <HistoryIcon size={18} />
                    <span>recent tests</span>
                </div>
                <button
                    onClick={onClear}
                    className="text-sub hover:text-error transition-colors p-1"
                    title="Clear History"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-sub/10">
                <table className="w-full text-left font-mono text-sm">
                    <thead className="bg-black/20 text-sub">
                        <tr>
                            <th className="px-4 py-2">wpm</th>
                            <th className="px-4 py-2">accuracy</th>
                            <th className="px-4 py-2">mode</th>
                            <th className="px-4 py-2 text-right">date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sub/5">
                        {history.map((record) => (
                            <tr key={record.id} className="hover:bg-black/10 transition-colors">
                                <td className="px-4 py-2 text-main font-bold">{record.wpm}</td>
                                <td className="px-4 py-2 text-text">{Math.round(record.accuracy)}%</td>
                                <td className="px-4 py-2 text-sub">
                                    {record.mode} {record.limit}
                                </td>
                                <td className="px-4 py-2 text-sub text-right">
                                    {new Date(record.date).toLocaleDateString()} {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
