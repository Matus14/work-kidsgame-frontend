
import React, { useState, useEffect } from "react";

const Game = () => {
  // Náhodné čísla pre príklad
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  // Odpoveď používateľa
  const [userAnswer, setUserAnswer] = useState('');

  // Stav pre zobrazenie, či bola odpoveď správna
  const [isCorrect, setIsCorrect] = useState(null);

  // Počet otázok, ktoré sme už zobrazili
  const [questionCount, setQuestionCount] = useState(0);

  // Celkový počet otázok v hre
  const [maxQuestions] = useState(5);

  // Počítadlá správnych a nesprávnych odpovedí
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  // Stav, či je kvíz ukončený
  const [quizFinished, setQuizFinished] = useState(false);

  // Spustenie novej otázky na začiatku
  useEffect(() => {
    generateNewGame();
  }, []);

  // Funkcia pre generovanie novej úlohy
  const generateNewGame = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setIsCorrect(null);
  };

  // Overenie odpovede
  const checkAnswer = () => {
    const correct = num1 + num2;
    const answer = parseInt(userAnswer);

    if (answer === correct) {
      setIsCorrect(true);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIsCorrect(false);
      setIncorrectAnswers((prev) => prev + 1);
    }

    // Navýši sa počet otázok
    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);

    // Ak sme dosiahli max počet otázok, ukončíme hru
    if (nextCount >= maxQuestions) {
      setQuizFinished(true);
    } else {
      // Po krátkej pauze sa načíta ďalší príklad
      setTimeout(() => {
        generateNewGame();
      }, 1000);
    }
  };

  // Resetovanie kvízu
  const resetGame = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuestionCount(0);
    setQuizFinished(false);
    generateNewGame();
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

          {/* Výpis správnosti odpovede */}
          {isCorrect !== null && (
            <p style={{ color: isCorrect ? 'green' : 'red' }}>
              {isCorrect ? 'Correct!' : 'Incorrect 😢'}
            </p>
          )}
        </>
      ) : (
        <>
          <h2>Quiz Finished!</h2>
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