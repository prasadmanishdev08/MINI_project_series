import { useState, useEffect } from "react";

function Alarm() {
  const [inputValue, setInputValue] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [isRinging, setIsRinging] = useState(false);
  const [lastRungTime, setLastRungTime] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!alarmTime) return;
      
      const now = new Date();
      const [alarmHours, alarmMinutes] = alarmTime.split(':');
      const currentMinuteStr = `${now.getHours()}:${now.getMinutes()}`;
      
      if (now.getHours() === parseInt(alarmHours, 10) && now.getMinutes() === parseInt(alarmMinutes, 10)) {
        if (currentMinuteStr !== lastRungTime) {
          setIsRinging(true);
          setLastRungTime(currentMinuteStr);
        }
      } else {
        if (lastRungTime === currentMinuteStr) {
           // Do nothing
        } else if (lastRungTime !== "") {
          setLastRungTime("");
        }
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [alarmTime, lastRungTime]);

  const stopAlarm = () => {
    setIsRinging(false);
  };

  const handleSetAlarm = () => {
    if (inputValue) {
      setAlarmTime(inputValue);
      setIsRinging(false);
      setLastRungTime("");
    }
  };

  const clearAlarm = () => {
    setAlarmTime("");
    setIsRinging(false);
    setInputValue("");
    setLastRungTime("");
  };

  return (
    <div className={`feature-card ${isRinging ? 'alerting' : ''}`}>
      <h1>Alarm</h1>
      <p className="subtitle">Set a Reminder</p>
      
      <div className="card-content">
        <div className="display-box">
          <input 
            type="time" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              fontSize: '2.5rem',
              padding: '10px 15px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: 'inherit',
              outline: 'none',
              textAlign: 'center',
              width: '100%',
              minWidth: '220px'
            }}
          />
        </div>

        <div className="controls">
          {!isRinging && !alarmTime && (
            <button onClick={handleSetAlarm} style={{ width: '130px', borderRadius: '16px', fontSize: '18px' }}>
              Set Alarm
            </button>
          )}
          {!isRinging && alarmTime && (
            <button onClick={clearAlarm} style={{ width: '130px', borderRadius: '16px', fontSize: '18px', background: 'rgba(255, 65, 108, 0.2)' }}>
              Clear
            </button>
          )}
          {isRinging && (
            <button onClick={stopAlarm} style={{ background: 'linear-gradient(135deg, #ff416c, #ff4b2b)', width: '150px', borderRadius: '16px' }}>
              Stop
            </button>
          )}
        </div>

        {!isRinging && (
          <p className="goal-text" style={{marginTop: '10px'}}>
            {alarmTime ? `Alarm set for ${alarmTime}` : "No alarm set"}
          </p>
        )}

        {isRinging && (
          <div className="badge" style={{background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', color: 'white', marginTop: '10px'}}>⏰ Wake up!</div>
        )}
      </div>
    </div>
  );
}

export default Alarm;
