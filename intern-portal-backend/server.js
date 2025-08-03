const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Leaderboard static list
const leaderboard = [
  { name: "John Doe", donations: 4500 },
  { name: "Jane Smith", donations: 4000 },
  { name: "Mike Johnson", donations: 3500 },
  { name: "Emily Davis", donations: 3000 },
  { name: "David Wilson", donations: 2500 },
];

app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard.sort((a, b) => b.donations - a.donations));
});

// Use Render's assigned port or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
