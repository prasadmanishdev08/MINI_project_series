import { useState, useRef } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import Arena from './components/Arena';
import Controls from './components/Controls';

const choices = ['rock', 'paper', 'scissors'];

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // idle, shaking, resolved
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  
  const isAnimating = useRef(false);

  const getWinner = (p, c) => {
    if (p === c) return 'draw';
    if (
      (p === 'rock' && c === 'scissors') ||
      (p === 'paper' && c === 'rock') ||
      (p === 'scissors' && c === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const playRound = (choice) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setPlayerChoice(choice);
    setGameState('shaking');
    setWinner(null);

    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(compChoice);

    // Shake for 1.5 seconds
    setTimeout(() => {
      const result = getWinner(choice, compChoice);
      setWinner(result);
      if (result === 'player') setPlayerScore(s => s + 1);
      if (result === 'computer') setComputerScore(s => s + 1);
      setGameState('resolved');
      isAnimating.current = false;
    }, 1500);
  };

  return (
    <div className="app-container">
      <div className="game-title">STONE PAPER SCISSORS</div>
      <ScoreBoard playerScore={playerScore} computerScore={computerScore} />
      <Arena 
        gameState={gameState} 
        playerChoice={playerChoice} 
        computerChoice={computerChoice} 
        winner={winner} 
      />
      <Controls playRound={playRound} gameState={gameState} />
    </div>
  );
}

export default App;
