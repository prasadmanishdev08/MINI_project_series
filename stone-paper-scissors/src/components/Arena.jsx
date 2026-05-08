export default function Arena({ gameState, playerChoice, computerChoice, winner }) {
  const choiceEmoji = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };

  const getHandClass = (role) => {
    let base = 'hand-wrapper';
    if (role === 'computer') base += ' computer';

    if (gameState === 'shaking') {
      base += ' shaking';
    } else if (gameState === 'resolved') {
      if (winner === role) {
        base += ' winner';
      } else if (winner !== 'draw') {
        base += ' loser';
      }
    }
    return base;
  };

  const displayPlayer = gameState === 'resolved' && playerChoice ? choiceEmoji[playerChoice] : choiceEmoji['rock'];
  const displayComputer = gameState === 'resolved' && computerChoice ? choiceEmoji[computerChoice] : choiceEmoji['rock'];

  return (
    <div className="arena">
      <div className="hands-container">
        <div className={getHandClass('player')}>
          {displayPlayer}
        </div>
        <div className={getHandClass('computer')}>
          {displayComputer}
        </div>
      </div>

      <div className={`status-text ${winner === 'player' ? 'win' : winner === 'computer' ? 'lose' : ''}`}>
        {gameState === 'idle' && 'CHOOSE YOUR WEAPON'}
        {gameState === 'shaking' && 'SHOOT!'}
        {gameState === 'resolved' && winner === 'player' && 'YOU WIN!'}
        {gameState === 'resolved' && winner === 'computer' && 'CPU WINS!'}
        {gameState === 'resolved' && winner === 'draw' && 'DRAW!'}
      </div>
    </div>
  );
}
