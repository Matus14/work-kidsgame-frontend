import React,{useState} from "react";

function QuizStart({onStart}) {

  // This state holds the name the player types in
  const [playerName, setPlayerName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(1);


  // This starts the game, after validation (name cannot be empty)
  const handleStart = () => {
    if(playerName === '') {
      alert("Please enter your name!");
      return;
    } 
    onStart(playerName, selectedLevel) // Send botth name and level
  };


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

      <p>Select a difficulty level:</p>
      <select 
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(Number(e.target.value))}
        >
          <option value={1}>Level 1 - Add (0-10)</option>
          <option value={2}>Level 2 - Add (0-20)</option>
          <option value={3}>Level 3 - Add/Subtract (0-30)</option>
          <option value={4}>Level 4 - Add/Subtract (0-50)</option>
          <option value={5}>Level 5 - Add/Subtract (0-100)</option>
      </select>

      <button onClick={handleStart}>Start</button>
    </div>
  );

}


export default QuizStart;