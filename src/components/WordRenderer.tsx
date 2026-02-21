import type { CharState } from '../types/index';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface WordRendererProps {
    chars: CharState[];
    isCurrent: boolean;
    isCorrect: boolean;
    hasBeenTyped: boolean;
    currentInput: string;
}

export const WordRenderer = ({ chars, isCurrent, isCorrect, hasBeenTyped, currentInput }: WordRendererProps) => {
    return (
        <div className={cn(
            "relative flex flex-wrap mx-1 my-1 text-2xl transition-colors duration-200",
            !isCorrect && hasBeenTyped && !isCurrent && "border-b-2 border-error"
        )}>
            {chars.map((c, i) => {
                const isCursorPos = isCurrent && i === currentInput.length;

                return (
                    <span
                        key={i}
                        className={cn(
                            "relative",
                            c.state === 'idle' && "text-sub",
                            c.state === 'correct' && "text-text",
                            c.state === 'incorrect' && "text-error",
                            c.state === 'extra' && "text-error-extra"
                        )}
                    >
                        {isCursorPos && (
                            <span className="absolute left-0 top-0 w-0.5 h-full bg-caret animate-caret-blink" />
                        )}
                        {c.char}
                    </span>
                );
            })}
            {isCurrent && currentInput.length >= chars.length && (
                <span className="absolute right-[-2px] top-0 w-0.5 h-full bg-caret animate-caret-blink" />
            )}
        </div>
    );
};
