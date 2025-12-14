const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /news
router.get("/news", async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        id: "desc", // новые сверху
      },
    });

    res.json(news);
  } catch (error) {
    console.error("❌ Ошибка при получении новостей:", error);
    res.status(500).json({ error: "Не удалось получить новости" });
  }
});

module.exports = router;
1;
