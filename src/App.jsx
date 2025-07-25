
import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
import Game from './components/Game';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = (name) => {
    setPlayerName(name);
    setQuizStarted(true);
  };

  return (
    <div>
      {!quizStarted ? (
        <QuizStart onStart={handleStartQuiz} />
      ) : (
        <Game playerName={playerName} />
      )}
    </div>
  );
}

export default App;