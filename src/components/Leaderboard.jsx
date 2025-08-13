import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({onBack}) => {
  const [results, setResults] = useState([]);

  // Getting all results from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/results/top') // Now calling top 10 results in descending order based on score
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <h2 className="h4 mb-0">Leaderboard</h2>
                <button onClick={onBack} className="btn btn-outline-secondary btn-sm ms-auto">Back to Start</button>
              </div>

              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Correct</th>
                      <th>Incorrect</th>
                      <th>Duration (s)</th>
                      <th>Played At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index}>
                        <td>{result.playerName}</td>
                        <td className="fw-bold">{result.score}</td>
                        <td className="text-success">{result.correctAnswer}</td>
                        <td className="text-danger">{result.incorrectAnswer}</td>
                        <td>{result.durationSeconds}</td>
                        <td>{new Date(result.playedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          <div className="py-2" />
        </div>
      </div>
    </div>
  );
};

// CSS style for table cells
const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px 12px'
};

export default Leaderboard;
