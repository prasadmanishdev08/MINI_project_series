import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const goal = 100;
  const progress = (count / goal) * 100;

  const increase = () => {
    setCount(count + step);
  };

  const decrease = () => {
    setCount(count - step);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="feature-card">
      <h1>Smart Counter</h1>
      <p className="subtitle">Step Ahead!!</p>

      <div className="card-content">
        <div className="display-box">
          {count}
        </div>

        <div className="controls">
          <button onClick={decrease}>−</button>
          <button onClick={increase}>+</button>
          <button onClick={reset}>Reset</button>
        </div>

        <div className="step-box">
          <p>Step Value</p>
          <select
            value={step}
            onChange={(e)=>setStep(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="progress-wrapper">
          <div
            className="progress-fill"
            style={{width:`${Math.min(progress,100)}%`}}
          ></div>
        </div>

        <p className="goal-text">{count}/{goal} Goal</p>

        {count >= 50 && (
          <div className="badge">🏆 Milestone Unlocked</div>
        )}
      </div>
    </div>
  );
}

export default Counter;
