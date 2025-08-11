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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h1 className="h3 mb-3">Welcome in a MathQuiz!</h1>
              <p className="text-muted mb-4">Please enter your name and choose a level.</p>

              {/* keep your original input/select/button, only add Bootstrap classes */}
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
                className="form-control form-control-lg text-center mb-3"
              />

              <div className="mb-3">
                <label htmlFor="level" className="form-label">Select a difficulty level:</label>
                <select
                  id="level"
                  className="form-select"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                >
                  <option value={1}>Level 1 - Add (0-10)</option>
                  <option value={2}>Level 2 - Add (0-20)</option>
                  <option value={3}>Level 3 - Add/Subtract (0-30)</option>
                  <option value={4}>Level 4 - Add/Subtract (0-50)</option>
                  <option value={5}>Level 5 - Add/Subtract (0-100)</option>
                  <option value={6}>Level 6 - Multiply (0-10)</option>
                  <option value={7}>Level 7 - Multiply/Divide (1-10)</option>
                  <option value={8}>Level 8 - All ops (1-20)</option>
                  <option value={9}>Level 9 - All ops (1-50)</option>
                </select>
              </div>

              <button onClick={handleStart} className="btn btn-success btn-lg">
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}


export default QuizStart;