const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

router.get("/add-match", (req, res) => {
  res.send(`
    <h1>POST endpoint</h1>
    <pre>
{
  "homeTeam": "France",
  "awayTeam": "Germany",
  "homeScore": 2,
  "awayScore": 1,
  "matchDate": "2025-06-01T18:00:00Z"
}
    </pre>
  `);
});

router.post("/add-match", async (req, res) => {
  try {
    const { homeTeam, awayTeam, homeScore, awayScore, matchDate } = req.body;

    if (
      !homeTeam ||
      !awayTeam ||
      homeScore == null ||
      awayScore == null ||
      !matchDate
    ) {
      return res.status(400).json({
        error: "Все поля обязательны",
      });
    }

    const match = await prisma.match.create({
      data: {
        homeTeam,
        awayTeam,
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        matchDate: new Date(matchDate),
      },
    });

    console.log("✅ Матч создан:", match);

    res.status(201).json({
      message: "Матч успешно добавлен",
      match,
    });
  } catch (error) {
    console.error("❌ Ошибка:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
