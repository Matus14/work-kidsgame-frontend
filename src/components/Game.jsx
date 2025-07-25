
import React,{ useState, useEffect} from "react";

const Game = () => {
    const[num1, setNum1] = useState(0);
    const[num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);


    useEffect (() => {
        generateNewGame();
    },[] );

    const generateNewGame = () => {
        setNum1(Math.floor(Math.random() *10));
        setNum2(Math.floor(Math.random() *10));
        setUserAnswer('');
        setIsCorrect(null);
    };

    const checkAnswer = () => {
        const correct = num1 + num2;
        setIsCorrect(parseInt(userAnswer) === correct);
    };

    return (
        <div>
            <h2>What is {num1} + {num2}?</h2>
            <input
            type="number" 
            value={userAnswer} 
            onChange={(e) => setUserAnswer(e.target.value) } 
            />
            <button onClick={checkAnswer}>Check</button>
            {isCorrect !== null && (
                <p>{isCorrect ? 'Correct' : 'Incorrect, try again!'}</p>
            )}
            <button onClick={generateNewGame}>Next</button>
        </div>
    );
};

export default Game;