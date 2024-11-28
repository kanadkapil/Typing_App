import { useState, useEffect } from 'react';

export default function TypingTest({ onComplete }) {
  const sampleText = "The quick brown fox jumps over the lazy donkey.";
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const handleInputChange = (e) => {
    const typedText = e.target.value;
    setInput(typedText);

    if (typedText.length <= sampleText.length) {
      let errorsCount = 0;
      let correctCount = 0;

      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === sampleText[i]) {
          correctCount++;
        } else {
          errorsCount++;
        }
      }

      setErrors(errorsCount);
      setCorrectChars(correctCount);
    }
  };

  useEffect(() => {
    if (input === sampleText) onComplete();
  }, [input, onComplete]);

  return (
    <div className="space-y-4">
      <p className="text-lg bg-base-200 p-4 rounded">{sampleText}</p>
      <textarea
        className="textarea textarea-bordered w-full"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        rows="4"
      ></textarea>
      <p className="text-sm">
        Errors: <span className="text-error">{errors}</span>
      </p>
    </div>
  );
}
