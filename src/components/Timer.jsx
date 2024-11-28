import { useState, useEffect } from 'react';

export default function Timer({ duration, onComplete }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onComplete();
    }
  }, [time, onComplete]);

  return (
    <div className="text-xl font-bold">
      Time Remaining: <span className="text-primary">{time}s</span>
    </div>
  );
}
