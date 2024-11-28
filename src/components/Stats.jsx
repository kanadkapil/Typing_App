export default function Stats({ wpm, accuracy, errors }) {
    return (
      <div className="stats bg-base-200 shadow">
        <div className="stat">
          <div className="stat-title">Words Per Minute</div>
          <div className="stat-value text-primary">{wpm}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Accuracy</div>
          <div className="stat-value text-success">{accuracy}%</div>
        </div>
        <div className="stat">
          <div className="stat-title">Errors</div>
          <div className="stat-value text-error">{errors}</div>
        </div>
      </div>
    );
  }
  