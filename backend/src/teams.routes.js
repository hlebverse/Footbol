const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

router.get("/add-team", (req, res) => {
  res.send(`
    <h1>POST endpoint</h1>
    <pre>{ "name": "Сборная Франции", "country": "Франция" }</pre>
  `);
});

router.post("/add-team", async (req, res) => {
  try {
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        error: "Поля 'name' и 'country' обязательны",
      });
    }

    const team = await prisma.nationalTeam.create({
      data: {
        name,
        country,
      },
    });

    console.log("✅ Сборная создана:", team);

    res.status(201).json({
      message: "Сборная успешно добавлена",
      team,
    });
  } catch (error) {
    console.error("❌ Ошибка:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
