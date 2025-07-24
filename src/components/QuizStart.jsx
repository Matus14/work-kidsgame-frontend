


import React, { useState } from 'react';

function QuizStart({ onStart }) {
  const [playerName, setPlayerName] = useState('');

  const handleStart = () => {
    if (playerName.trim() === '') {
      alert('Please enter your name!');
      return;
    }
    onStart(playerName); // posielame meno rodičovskej komponente (App)
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to MathQuiz!</h1>
      <p>Enter your name to start:</p>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your name"
      />
      <br /><br />
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}

export default QuizStart;