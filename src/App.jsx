
import React, { useState } from 'react';
import QuizStart from './components/QuizStart';

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
        <h2>Quiz will go here... Hello, {playerName}!</h2>
      )}
    </div>
  );
}

export default App;