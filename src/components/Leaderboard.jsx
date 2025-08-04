import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({onBack}) => {
  const [results, setResults] = useState([]);

  // Getting all results from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/results') 
      .then(response => {

        /*saves the received data from the backend (array of results) 
        into the components state - it can be used for rendering the leaderboard table */
        setResults(response.data); 
      })
      .catch(error => {
        console.error("Error loading leaderboard data:", error);
      });
  }, []); 


  // The vizualization of the table - all results so far. 
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2> Leaderboard</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Score</th>
            <th style={cellStyle}>Correct</th>
            <th style={cellStyle}>Incorrect</th>
            <th style={cellStyle}>Duration (s)</th>
            <th style={cellStyle}>Played At</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td style={cellStyle}>{result.playerName}</td>
              <td style={cellStyle}>{result.score}</td>
              <td style={cellStyle}>{result.correctAnswer}</td>
              <td style={cellStyle}>{result.incorrectAnswer}</td>
              <td style={cellStyle}>{result.durationSeconds}</td>
              <td style={cellStyle}>{new Date(result.playedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <br/><br/>
      <button onClick={onBack} >Back to Start</button>
    </div>
  );
};

// CSS style for table cells
const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px 12px'
};

export default Leaderboard;
