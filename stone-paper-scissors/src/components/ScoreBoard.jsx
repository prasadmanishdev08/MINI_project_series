export default function ScoreBoard({ playerScore, computerScore }) {
  return (
    <div className="scoreboard">
      <div className="score-block">
        <h2>PLAYER</h2>
        <div className="score">{playerScore}</div>
      </div>
      <div className="score-block">
        <h2>CPU</h2>
        <div className="score">{computerScore}</div>
      </div>
    </div>
  );
}
