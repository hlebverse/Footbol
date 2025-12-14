const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

router.get("/add-player", (req, res) => {
  res.send(`
    <h1>POST endpoint</h1>
    <pre>
{
  "name": "Mbappe",
  "position": "Forward",
  "age": 25,
  "teamId": 1
}
    </pre>
  `);
});

router.post("/add-player", async (req, res) => {
  try {
    const { name, position, age, teamId } = req.body;

    if (!name || !position || !age || !teamId) {
      return res.status(400).json({
        error: "Все поля обязательны",
      });
    }

    const player = await prisma.player.create({
      data: {
        name,
        position,
        age: parseInt(age),
        teamId: parseInt(teamId),
      },
    });

    console.log("✅ Игрок создан:", player);

    res.status(201).json({
      message: "Игрок успешно добавлен",
      player,
    });
  } catch (error) {
    console.error("❌ Ошибка:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
