import React, { useEffect, useState } from 'react';
import api from '../api';

const Leaderboard = ({ onBack }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);          
  const [size, setSize] = useState(10);         
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("score,desc");
  const [nameFilter, setNameFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/results", {
        params: {
          page,
          size,
          sort,
          name: nameFilter || undefined, 
        },
      });
      setResults(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error loading leaderboard data:", error);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await api.get("/api/results", {
          params: { page, size, sort, name: nameFilter || undefined }
        });
        if (!isMounted) return;
        setResults(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (e) {
        if (isMounted) setError("Failed to load leaderboard");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [page, size, sort, nameFilter]);



  const prevPage = () => setPage((p) => Math.max(p -1, 0));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const onChangeSize = (e) => { setSize(Number(e.target.value)); setPage(0); };
  const onChangeSort = (e) => { setSort(e.target.value); setPage(0); };
  const onSubmitFilter = (e) => { e.preventDefault(); setPage(0); fetchResults(); };



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

 


  // The vizualization of the table 
 return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-lg glow">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <h2 className="h4 mb-0">Leaderboard</h2>
                <button onClick={onBack} className="btn btn-outline-secondary btn-sm btn-round ms-auto">
                  Back to Start
                </button>
              </div>

              {/* Filter + sort + rows-per-page */}
              <form onSubmit={onSubmitFilter} className="row g-2 mb-3">
                <div className="col-12 col-md-4">
                  <input
                    className="form-control"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <select className="form-select" value={sort} onChange={onChangeSort}>
                    <option value="score,desc">Score ↓</option>
                    <option value="score,asc">Score ↑</option>
                    <option value="playedAt,desc">Played At ↓</option>
                    <option value="playedAt,asc">Played At ↑</option>
                  </select>
                </div>
                <div className="col-6 col-md-2">
                  <select className="form-select" value={size} onChange={onChangeSize}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <div className="col-12 col-md-3 d-grid">
                  <button type="submit" className="btn btn-primary btn-round">Apply</button>
                </div>
              </form>

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
                    {results.map((r) => (
                      <tr key={r.id}>
                        <td>{r.playerName}</td>
                        <td className="fw-bold">{r.score}</td>
                        <td className="text-success">{r.correctAnswer}</td>
                        <td className="text-danger">{r.incorrectAnswer}</td>
                        <td>{r.durationSeconds}</td>
                        <td>{r.playedAt ? new Date(r.playedAt).toLocaleString() : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-outline-secondary btn-sm" onClick={prevPage} disabled={page === 0}>
                  ← Prev
                </button>
                <span className="small">
                  Page <strong>{page + 1}</strong> / {Math.max(totalPages, 1)}
                </span>
                <button className="btn btn-outline-secondary btn-sm" onClick={nextPage} disabled={page >= totalPages - 1}>
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="py-2" />
        </div>
      </div>
    </div>
  );
};

// CSS style for table cells-
const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px 12px'
};

export default Leaderboard;
