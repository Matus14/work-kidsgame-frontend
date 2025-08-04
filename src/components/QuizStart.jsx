import React,{useState} from "react";

function QuizStart({onStart}) {

  // This state holds the name the player types in
  const [playerName, setPlayerName] = useState('');


  // This starts the game, after validation (name cannot be empty)
  const handleStart = () => {
    if(playerName === '') {
      alert("Please enter your name!");
      return;
    } 
    onStart(playerName) // Calls the parent function with the name
  }


  // This is the screen shown when the app starts
  // It asks for the player name before beginning the game
  return (
    <div style={{textAlign: 'center' , marginTop: '100px'}}>
      <h1>Welcome in a MathQuiz!</h1>
      <p>Please enter here your name.</p>
      <input 
      type="text"
      value={playerName}
      onChange={(e) => setPlayerName(e.target.value)} 
      placeholder="Your name"
      />

      <br /><br/>
      <button onClick={handleStart}>Start</button>
    </div>
  )

}


export default QuizStart;