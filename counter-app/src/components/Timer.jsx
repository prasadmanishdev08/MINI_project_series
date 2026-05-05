import { useState, useEffect, useRef } from "react";

function Timer() {
  const [timeInput, setTimeInput] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timeInput);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = timeInput > 0 ? ((timeInput - timeLeft) / timeInput) * 100 : 0;

  return (
    <div className={`feature-card ${timeLeft === 0 && !isRunning && timeInput > 0 ? 'alerting' : ''}`}>
      <h1>Timer</h1>
      <p className="subtitle">Countdown</p>

      <div className="card-content">
        <div className="display-box">
        {formatTime(timeLeft)}
      </div>

      <div className="step-box" style={{marginBottom: '20px'}}>
        <p>Set (sec):</p>
        <input 
          type="number" 
          value={timeInput} 
          onChange={(e) => {
            const val = Math.max(0, Number(e.target.value));
            setTimeInput(val);
            if(!isRunning) setTimeLeft(val);
          }}
          disabled={isRunning}
          style={{
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            width: '80px',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div className="controls">
        <button onClick={toggleTimer} style={{ width: '100px', borderRadius: '16px', fontSize: '18px' }} disabled={timeLeft === 0 && !isRunning}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer} style={{ width: '100px', borderRadius: '16px', fontSize: '18px' }}>Reset</button>
      </div>

      <div className="progress-wrapper">
        <div
          className="progress-fill"
          style={{width:`${Math.min(progress, 100)}%`}}
        ></div>
      </div>
      
      {timeLeft === 0 && !isRunning && timeInput > 0 && (
         <div className="badge" style={{background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', color: 'white'}}>⏰ Time is up!</div>
      )}
      </div>
    </div>
  );
}

export default Timer;
