# FunType Development Prompt 🧞‍♂️

This document contains the core "spirit" and instructions used to build **FunType**. You can use these prompts in an agent-based coding environment to replicate or extend this project.

## Project Vision

Create a "MonkeyType-style" typing application that feels premium, minimalist, and high-performance. The focus should be on clean aesthetics, smooth animations, and precise performance metrics.

## Core Technical Requirements

1.  **Architecture**: Use a custom React hook (`useTypingTest`) to encapsulate all state logic (timer, input handling, stats calculation) separate from the UI components.
2.  **Styling**: Use **Tailwind CSS v4** with CSS variables for a dynamic theme system. The UI should be centered, with large, clear metrics and a focused typing area.
3.  **Theming**: Implement a robust theme system using `data-theme` attributes on the `html` element. Support at least 8 themes including:
    - _Carbon_ (Dark Minimal)
    - _Neon Nights_ (Cyber/Synth)
    - _Cyberpunk_ (Yellow/Cyan)
    - _Neo Brutalist_ (Bold/High Contrast)
4.  **Charts**: Integrate `recharts` to record WPM and Accuracy every second. Display this data in the results modal.
5.  **Quality of Life**:
    - Add mechanical typing sounds.
    - Implement a focused "blur" state when the user clicks away.
    - Save all history and settings to `localStorage`.

## Key Challenges to Solve

- **Accurate WPM**: Calculate WPM using the standard formula: `(Correct Chars / 5) / (Time in Minutes)`.
- **Caret Physics**: Implement a custom blinking caret that moves smoothly with the user's input.
- **Performance**: Ensure the typing area feels snappy by minimizing redundant re-renders of the word list.

## Aesthetic Direction

"Modern, minimalist, and distraction-free." Avoid generic colors; use curated palettes like those found in premium mechanical keyboard sets (GMK, etc.).
