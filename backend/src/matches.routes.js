const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

// GET
router.get("/", async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      orderBy: { matchDate: "desc" },
      include: {
        homeTeam: true, // Подтягиваем названия команд
        awayTeam: true,
      },
    });
    res.json(matches);
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { homeTeamId, awayTeamId, homeScore, awayScore, matchDate } =
      req.body;

    // Простая валидация
    if (!homeTeamId || !awayTeamId)
      return res.status(400).json({ error: "Выберите команды" });

    const match = await prisma.match.create({
      data: {
        homeTeamId: Number(homeTeamId),
        awayTeamId: Number(awayTeamId),
        homeScore: Number(homeScore),
        awayScore: Number(awayScore),
        matchDate: new Date(matchDate),
      },
      include: { homeTeam: true, awayTeam: true },
    });
    res.json(match);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Ошибка создания" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { homeTeamId, awayTeamId, homeScore, awayScore, matchDate } =
      req.body;

    const updated = await prisma.match.update({
      where: { id: Number(id) },
      data: {
        homeTeamId: Number(homeTeamId),
        awayTeamId: Number(awayTeamId),
        homeScore: Number(homeScore),
        awayScore: Number(awayScore),
        matchDate: new Date(matchDate),
      },
    });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: "Ошибка обновления" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.match.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Ошибка удаления" });
  }
});

module.exports = router;
