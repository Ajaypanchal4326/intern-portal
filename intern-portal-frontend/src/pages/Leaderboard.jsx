import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const rewardIcons = ["🏆", "🥈", "🥉", "⭐", "💎"];

  useEffect(() => {
    fetch("https://intern-portal-backend-3gui.onrender.com/api/leaderboard")
      .then((res) => res.json())
      .then((info) => setLeaders(info))
      .catch((err) => console.error(err));
  }, []);

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
