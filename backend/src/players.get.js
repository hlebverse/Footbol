const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /players
router.get("/players", async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        team: true, // подтягиваем сборную
      },
    });

    res.json(players);
  } catch (error) {
    console.error("❌ Ошибка при получении игроков:", error);
    res.status(500).json({ error: "Не удалось получить игроков" });
  }
});

module.exports = router;
