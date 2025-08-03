import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const rewardsList = [
    "🏆 Trophy",
    "🎖 Medal",
    "💎 Diamond",
    "🎁 Gift Card",
    "📜 Certificate",
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      let storedData = JSON.parse(localStorage.getItem("dashboardData"));

      if (!storedData) {
        const randomDonation = Math.floor(Math.random() * 4000) + 1000;
        const randomRewards = Array.from(
          { length: 3 },
          () => rewardsList[Math.floor(Math.random() * rewardsList.length)]
        );

        storedData = {
          name: user.name,
          referralCode: `${user.name.replace(/\s+/g, "")}2025`,
          donations: randomDonation,
          rewards: randomRewards,
        };

        localStorage.setItem("dashboardData", JSON.stringify(storedData));
      }

      setData(storedData);
    }
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome, {data.name}</h1>
        <div className="card">Referral Code: {data.referralCode}</div>
        <div className="card">Total Donations: ₹{data.donations}</div>
        <div className="card">
          <h3>Rewards</h3>
          <ul>
            {data.rewards.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
