import { useRef, useEffect } from 'react';
import { WordRenderer } from './WordRenderer';
import type { WordState } from '../types/index';

interface TypingAreaProps {
    words: WordState[];
    currentWordIndex: number;
    currentInput: string;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    testActive: boolean;
    testFinished: boolean;
}

export const TypingArea = ({
    words,
    currentWordIndex,
    currentInput,
    handleInput,
    testActive,
    testFinished
}: TypingAreaProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!testFinished) {
            inputRef.current?.focus();
        }
    }, [testFinished]);

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto mt-20 cursor-text min-h-[120px]"
            onClick={handleContainerClick}
        >
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 pointer-events-none"
                value={currentInput}
                onChange={handleInput}
                autoFocus
            />

            {!testActive && !testFinished && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none text-sub animate-pulse">
                    Click or start typing to begin
                </div>
            )}

            <div className={`flex flex-wrap overflow-hidden transition-opacity duration-300 ${testFinished ? 'opacity-0' : 'opacity-100'}`}>
                {words.map((word, i) => (
                    <WordRenderer
                        key={i}
                        chars={word.chars}
                        isCurrent={i === currentWordIndex}
                        isCorrect={word.isCorrect}
                        hasBeenTyped={i < currentWordIndex}
                        currentInput={i === currentWordIndex ? currentInput : ''}
                    />
                ))}
            </div>
        </div>
    );
};
