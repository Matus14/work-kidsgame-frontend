import React, { useEffect, useState } from 'react';
import api from '../api';

const Leaderboard = ({onBack}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  
 useEffect(() => {
    let isMounted = true; // simple guard to avoid setState after unmount

    const fetchResults = async () => {
      try {
        const res = await api.get("/api/results/top");
        if (isMounted) setResults(res.data);
      } catch (err) {
        console.error("Error loading leaderboard data:", err);
        if (isMounted) setError("Failed to load leaderboard");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResults();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Loading leaderboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        <button onClick={onBack} className="btn btn-outline-secondary btn-sm btn-round mt-3">
          Back to Start
        </button>
      </div>
    );
  }




  // The vizualization of the table - all results so far. 
 return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-lg glow">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <h2 className="h4 mb-0">Leaderboard</h2>
                <button onClick={onBack} className="btn btn-outline-secondary btn-sm btn-round ms-auto">Back to Start</button>
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
