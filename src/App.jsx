import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard'; 

function App() {
  const [playerName, setPlayerName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false); 

  const handleStartQuiz = (name) => {
    setPlayerName(name);
    setQuizStarted(true);
    setShowLeaderboard(false); 
  };

  const handleQuizEnd = () => {
    setQuizStarted(false);
    setShowLeaderboard(true); 
  };

  return (
    <div>
      {!quizStarted && !showLeaderboard && (
        <QuizStart onStart={handleStartQuiz} />
      )}

      {quizStarted && (
        <Game playerName={playerName} onQuizEnd={handleQuizEnd} />
      )}

      {showLeaderboard && <Leaderboard />}
    </div>
  );
}

export default App;