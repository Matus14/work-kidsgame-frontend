import React, { useState, useEffect } from "react"; 
import axios from 'axios'; // Used to send results to backend


// Use of the "configuration object" / >> OBJECT MAP << 
// Just a list of level configs.
// Each level has its own range of numbers and allowed operations.
// We’ll use this when creating random questions based on the chosen level.
const levelConfig = {
  1: {min: 0, max: 10, operations: ['+']},
  2: {min: 0, max: 20, operations: ['+']},
  3: {min: 0, max: 30, operations: ['+']},
  4: {min: 0, max: 50, operations: ['+' , '-']},
  5: {min: 0, max: 100, operations: ['+' , '-']},
  6: {min: 0, max: 10, operations: ['*'] },
  7: {min: 1, max: 10, operations: ['*', '/'] },
  8: {min: 1, max: 20, operations: ['+', '-', '*', '/'] },
  9: {min: 1, max: 50, operations: ['+', '-', '*', '/'] },
  // more could be added in a future
}


// The list of all states used in the game
const Game = ({ playerName, selectedLevel ,onQuizEnd }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+'); // #added state for operation selection
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [maxQuestions] = useState(5);
  const [startTime, setStartTime] = useState(Date.now());
  const level = selectedLevel

  

  // This runs once at the beginning to start the first question
  useEffect(() => {
    startNewGame();
    setStartTime(Date.now());
  }, []);

  // This function creates two random numbers for each round.
  const generateQuestionByLevel = (level) => {
  const config = levelConfig[level];
  const min = config.min;
  const max = config.max;
  const operations = config.operations;

  let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

  // This is the way how to randomly choose from the array
  const operation = operations[Math.floor(Math.random() * operations.length)];

  // Special rule for division – make sure we get whole numbers
  if (operation === '/') {
    if (num2 === 0) num2 = 1; // avoid dividing by zero
    num1 = num1 - (num1 % num2); // ensure num1 is divisible by num2 to make it easy
  }

  return { num1, num2, operation };
};



  
  const startNewGame = () => {
    const {num1, num2, operation} = generateQuestionByLevel(level) // get random values based on level
    setNum1(num1);
    setNum2(num2);
    setOperation(operation)
    setUserAnswer('');
    setIsCorrect(null);
  };



  // Function where the answer is checked, counter for correct/incorrect answers and also the point system for correct answers
  const checkAnswer = () => {
    let correct;


    // Since I added more option for operators, the validation needed to be updated to match all options.
    switch(operation) {
      case '+':
        correct = num1 + num2;
        break;
      case '-':
        correct = num1 - num2;
        break;
      case '/':
        correct = num1 / num2;
        break;
      case '*':
        correct = num1 * num2;
        break;
      default:
        correct = num1 + num2;
    };
    
    
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body text-center">

              {!quizFinished ? (
                <>
                  <h2 className="h4 mb-2">Question {questionCount + 1} of {maxQuestions}</h2>
                  <h3 className="display-6 mb-3">
                    What is <span className="fw-bold">{num1}</span> <span className="text-info">{operation}</span> <span className="fw-bold">{num2}</span>?
                  </h3>

                  <div className="mx-auto" style={{maxWidth: 320}}>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="form-control form-control-lg text-center"
                      placeholder="Type your answer"
                    />
                  </div>

                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {/*  On click, this checks the user's answer */}
                    <button onClick={checkAnswer} className="btn btn-success btn-round">Check</button>
                  </div>

                  {/* feedback */}
                  {isCorrect !== null && (
                    <p
                      className={`mt-3 fw-semibold ${isCorrect ? 'text-success' : 'text-danger'}`}
                      style={{ marginBottom: 0 }}
                    >
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {/* When the quiz is finished this part shows up - the results of the game */}
                  <h2 className="h3 mb-3">Quiz Finished!</h2>
                  <p className="mb-1">Player: <span className="fw-bold">{playerName}</span></p>
                  <p className="mb-1">Correct Answers: <span className="fw-bold text-success">{correctAnswers}</span></p>
                  <p className="mb-1">Incorrect Answers: <span className="fw-bold text-danger">{incorrectAnswers}</span></p>
                  <p className="mb-4">Your Score: <span className="fw-bold">{correctAnswers * 10}</span> points</p>

                  <div className="d-flex justify-content-center gap-2">
                    <button onClick={resetGame} className="btn btn-primary btn-round" style={{marginRight: '100px'}}>Play Again</button>  
                    <button onClick={onQuizEnd} className="btn btn-outline-secondary btn-round">Show Leaderboard</button> 
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;