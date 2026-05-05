import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="feature-card">
      <h1>Live Clock</h1>
      <p className="subtitle">Current Time</p>
      
      <div className="card-content">
        <div className="display-box">
          {timeString}
        </div>
      </div>
    </div>
  );
}

export default Clock;
