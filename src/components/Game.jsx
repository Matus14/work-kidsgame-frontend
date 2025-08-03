import React, { useState, useEffect } from "react";
import axios from 'axios';

const Game = ({ playerName, onQuizEnd }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [maxQuestions] = useState(5);

  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    startNewGame();
    setStartTime(Date.now());
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

    const isAnswerCorrect = answer === correct;
    setIsCorrect(isAnswerCorrect);

    const updatedCorrect = isAnswerCorrect ? correctAnswers + 1 : correctAnswers;         
    const updatedIncorrect = isAnswerCorrect ? incorrectAnswers : incorrectAnswers + 1;  
    const updatedScore = updatedCorrect * 10;     

    

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);

    if (nextCount >= maxQuestions) {
      setQuizFinished(true);
      
      const endTime = Date.now();
      const duration = Math.floor((endTime - startTime) / 1000);

      axios.post('http://localhost:8080/api/results', {
        playerName,
        correctAnswer: updatedCorrect,
        incorrectAnswer: updatedIncorrect,
        durationSeconds: duration,
        score: updatedScore,
      })
        .then((error) => {
          console.error('Failed to save quiz result:', error);
        });
      
      setCorrectAnswers(updatedCorrect);
      setIncorrectAnswers(updatedIncorrect);
      

    } else {
      setCorrectAnswers(updatedCorrect);
      setIncorrectAnswers(updatedIncorrect);

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
    setStartTime(Date.now());
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
          <button onClick={resetGame} style={{marginRight: '100px'}}>Play Again</button>
          <button onClick={onQuizEnd}>Show Leaderboard</button>
        </>
      )}
    </div>
  );
};

export default Game;


