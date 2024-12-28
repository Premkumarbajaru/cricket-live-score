import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "b5207fe2-61c0-472d-a9e6-75c4896fb298"; // Replace with your API key
  const API_URL = `https://api.cricapi.com/v1/matches?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(API_URL);
        setMatches(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [API_URL]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Cricket Live Score</h1>
      <div className="matches-container">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <h2>{match.name}</h2>
            <p>
              <strong>Status:</strong>{" "}
              <span className={(match.status || "unknown").toLowerCase().replace(/\s+/g, '-')}>
                {match.status || "Unknown"}
              </span>
            </p>
            <p><strong>Venue:</strong> {match.venue || "N/A"}</p>
            <p><strong>Date:</strong> {match.date || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;