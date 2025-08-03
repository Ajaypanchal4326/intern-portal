import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rewardIcons = ["🏆", "🥈", "🥉", "⭐", "💎"];

  useEffect(() => {
    console.log("Leaderboard component mounted");
    console.log("Current URL:", window.location.href);
    console.log("Current pathname:", window.location.pathname);

    setLoading(true);
    fetch("https://intern-portal-backend-3gui.onrender.com/api/leaderboard")
      .then((res) => {
        console.log("API Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((info) => {
        console.log("API data received:", info);
        setLeaders(info);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="leaderboard-container">
          <h1>Loading Leaderboard...</h1>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="leaderboard-container">
          <h1>Error Loading Leaderboard</h1>
          <p>Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="leaderboard-container">
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Donations</th>
              <th>Reward</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, index) => (
              <tr key={index} className={index === 0 ? "top-donor" : ""}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>₹{user.donations}</td>
                <td>{rewardIcons[index] || "🎖"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
