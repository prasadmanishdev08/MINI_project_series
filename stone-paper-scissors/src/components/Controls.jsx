export default function Controls({ playRound, gameState }) {
  const disabled = gameState === 'shaking';

  return (
    <div className="controls">
      <button className="control-btn" disabled={disabled} onClick={() => playRound('rock')}>
        ✊
      </button>
      <button className="control-btn" disabled={disabled} onClick={() => playRound('paper')}>
        ✋
      </button>
      <button className="control-btn" disabled={disabled} onClick={() => playRound('scissors')}>
        ✌️
      </button>
    </div>
  );
}
