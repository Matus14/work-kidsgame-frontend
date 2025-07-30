import React, { useState, useEffect } from "react";

const Game = ({ playerName, onQuizEnd }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const maxQuestions = 5;

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const correct = num1 + num2;
    const answer = parseInt(userAnswer);

    if (answer === correct) {
      setIsCorrect(true);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIsCorrect(false);
      setIncorrectAnswers(prev => prev + 1);
    }

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);

    if (nextCount >= maxQuestions) {
      setQuizFinished(true);
      onQuizEnd(); 
    } else {
      setTimeout(() => {
        startNewGame();
      }, 1000);
    }
  };

  const resetGame = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuestionCount(0);
    setQuizFinished(false);
    startNewGame();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!quizFinished ? (
        <>
          <h2>Question {questionCount + 1} of {maxQuestions}</h2>
          <h3>What is {num1} + {num2}?</h3>

          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />

          <br /><br />
          <button onClick={checkAnswer}>Check</button>

          {isCorrect !== null && (
            <p style={{ color: isCorrect ? 'green' : 'red' }}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
          )}
        </>
      ) : (
        <>
          <h2>Quiz Finished!</h2>
          <p>Player: {playerName}</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Incorrect Answers: {incorrectAnswers}</p>
          <p>Your Score: {correctAnswers * 10} points</p>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default Game;


