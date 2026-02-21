import { THEMES } from '../types/index';
import { Palette, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ThemeSwitcherProps {
    currentTheme: string;
    onThemeChange: (themeId: string) => void;
}

export const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-sub/10 transition-colors text-sub hover:text-text text-sm"
                title="Switch Theme"
            >
                <Palette size={18} />
                <span>theme</span>
            </button>

            {isOpen && (
                <div className="absolute top-10 right-0 w-64 bg-background border border-sub/30 rounded-lg shadow-2xl z-50 p-2 animate-in fade-in zoom-in duration-200">
                    <div className="flex justify-between items-center px-3 py-2 border-b border-sub/20 mb-2">
                        <span className="text-xs font-bold text-sub uppercase tracking-widest">Select Theme</span>
                        <button onClick={() => setIsOpen(false)} className="text-sub hover:text-text">
                            <X size={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                        {THEMES.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => {
                                    onThemeChange(theme.id);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center justify-between px-3 py-2 rounded-md transition-all ${currentTheme === theme.id ? 'bg-sub/20 text-text' : 'hover:bg-sub/10 text-sub'
                                    }`}
                            >
                                <span className="text-sm">{theme.name}</span>
                                <div className="flex gap-1">
                                    <div
                                        className="w-3 h-3 rounded-full border border-sub/30"
                                        style={{ backgroundColor: theme.colors.background }}
                                    />
                                    <div
                                        className="w-3 h-3 rounded-full border border-sub/30"
                                        style={{ backgroundColor: theme.colors.main }}
                                    />
                                    <div
                                        className="w-3 h-3 rounded-full border border-sub/30"
                                        style={{ backgroundColor: theme.colors.text }}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
