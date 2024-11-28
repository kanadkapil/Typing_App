import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Timer from './components/Timer';
import TypingTest from './components/TypingTest';
import Stats from './components/Stats';

function App() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [stats, setStats] = useState(null);

  const startTest = () => {
    setIsTestRunning(true);
    setStats(null);
  };

  const endTest = () => {
    const wpm = Math.round((stats.correctChars / 5) / (15 / 60));
    const accuracy = Math.round((stats.correctChars / (stats.correctChars + stats.errors)) * 100);
    setStats({ wpm, accuracy, errors: stats.errors });
    setIsTestRunning(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 space-y-6">
        {!isTestRunning && (
          <button className="btn btn-primary" onClick={startTest}>
            Start Typing Test
          </button>
        )}
        {isTestRunning && (
          <>
            <Timer duration={15} onComplete={endTest} />
            <TypingTest onComplete={endTest} />
          </>
        )}
        {stats && <Stats {...stats} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
