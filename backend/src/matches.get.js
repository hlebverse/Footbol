const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /matches
router.get("/matches", async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      orderBy: {
        matchDate: "desc", // последние матчи сверху
      },
    });

    res.json(matches);
  } catch (error) {
    console.error("❌ Ошибка при получении матчей:", error);
    res.status(500).json({ error: "Не удалось получить матчи" });
  }
});

module.exports = router;
