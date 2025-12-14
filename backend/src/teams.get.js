const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /teams
router.get("/teams", async (req, res) => {
  try {
    const teams = await prisma.nationalTeam.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(teams);
  } catch (error) {
    console.error("❌ Ошибка при получении сборных:", error);
    res.status(500).json({ error: "Не удалось получить сборные" });
  }
});

module.exports = router;
