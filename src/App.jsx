import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard'; 

function App() {
  const [playerName, setPlayerName] = useState('');

  // This tracking if the game has started
  const [quizStarted, setQuizStarted] = useState(false);

  // When the games ends, this shows Leaderboard
  const [showLeaderboard, setShowLeaderboard] = useState(false); 


  // This part is called when user click on "Start" button
  const handleStartQuiz = (name) => {
    setPlayerName(name); // Save the name
    setQuizStarted(true); // Show the Game component
    setShowLeaderboard(false); // Just in case it was visible before
  };


  // Called when the game is done.
  const handleQuizEnd = () => {
    setQuizStarted(false); // Hide the Game
    setShowLeaderboard(true); // Show the leaderboard
  };

  return (
    <div>
      {/* If game doesnt started yet and leaderboard is not showing, show the start screen*/}
      {!quizStarted && !showLeaderboard && (
        <QuizStart onStart={handleStartQuiz} />
      )}

      {/*If game  started, show the Game component*/ }  
      {quizStarted && (
        <Game playerName={playerName} onQuizEnd={handleQuizEnd} />
      )}

      {/* If game ended, show Leaderboard */}
      {showLeaderboard && <Leaderboard onBack={() => setShowLeaderboard(false)} />}
    </div>
  );
}

export default App;