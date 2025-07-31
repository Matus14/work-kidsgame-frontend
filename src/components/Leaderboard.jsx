import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [results, setResults] = useState([]);

  // Získanie výsledkov z backendu
  useEffect(() => {
    axios.get('http://localhost:8080/api/results') // napojenie na backend
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error("Error loading leaderboard data:", error);
      });
  }, []); 

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
    </div>
  );
};

// CSS štýl pre bunky
const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px 12px'
};

export default Leaderboard;
