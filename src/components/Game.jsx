import React, { useState, useEffect } from "react"; 
import axios from 'axios'; // Used to send results to backend


// The list of all states used in the game
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


  // This runs once at the beginning to start the first question
  useEffect(() => {
    startNewGame();
    setStartTime(Date.now());
  }, []);



  // This function creates two random numbers for each round.
  const startNewGame = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setIsCorrect(null);
  };



  // Function where the answer is checked, counter for correct/incorrect answers and also the point system for correct answers
  const checkAnswer = () => {
    const correct = num1 + num2;
    const answer = parseInt(userAnswer); 

    const isAnswerCorrect = answer === correct; // this variable stores the curret value of the mathematic operation
    setIsCorrect(isAnswerCorrect);


    // Update counters based on whether the answer was right or wrong
    const updatedCorrect = isAnswerCorrect ? correctAnswers + 1 : correctAnswers;       
    const updatedIncorrect = isAnswerCorrect ? incorrectAnswers : incorrectAnswers + 1;  
    const updatedScore = updatedCorrect * 10;  // for each correct answer the user has 10 points   

    
    // Here is tracking on which question the user curently is 
    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);


    //  If this was the last question, finish the quiz and save the result
    if (nextCount >= maxQuestions) {
      setQuizFinished(true);
      
      const endTime = Date.now(); 
      const duration = Math.floor((endTime - startTime) / 1000); // Game duration in seconds

      axios.post('http://localhost:8080/api/results', { // sending data to database via axios
        playerName,
        correctAnswer: updatedCorrect,
        incorrectAnswer: updatedIncorrect,
        durationSeconds: duration,
        score: updatedScore,
      })
        .then((error) => { // in case there is an error, this part of code hanle it
          console.error('Failed to save quiz result:', error);
        });
      
      setCorrectAnswers(updatedCorrect);  
      setIncorrectAnswers(updatedIncorrect); 
      

    } else {
      setCorrectAnswers(updatedCorrect);  
      setIncorrectAnswers(updatedIncorrect); 


      // Function to create small delay and then run the another round of questions
      setTimeout(() => {
        startNewGame();
      }, 1000);
    }
  };


  // This resets the game completly to be able start once again from the beggining
  const resetGame = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuestionCount(0);
    setQuizFinished(false);
    setStartTime(Date.now());
    startNewGame();
  };


   
  /*The return below uses React Fragments (<> </>) to group multiple elements 
    without wrapping them in an extra <div>. */
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      {/* Conditional rendering using the ternary operator ( ? : ). 
        If the quiz is not finished (!quizFinished), it shows the question screen.
        Otherwise (quiz is finished), it shows the result screen.
        This is a clean way to show different views in the same component based on state. */}
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

          {/*  On click, this checks the user's answer */}
          <button onClick={checkAnswer}>Check</button>


          {/* This is a conditional rendering using again the ternary operator ( ? : ).
            It checks if 'isCorrect' is not null, and then shows feedback with color:
            green = correct, red = incorrect.
            This logic is clean and short thanks to the ternary operator.
          */}
          {isCorrect !== null && (
            <p style={{ color: isCorrect ? 'green' : 'red' }}> 
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
          )}
        </>
      ) : (
        <>

        {/* When the quiz is finished this part shows up - the results of the game */}
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