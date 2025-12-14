const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

// GET
router.get("/", async (req, res) => {
  try {
    const news = await prisma.news.findMany({ orderBy: { id: "desc" } });
    res.json(news);
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ error: "Нет заголовка" });

    const item = await prisma.news.create({
      data: { title, content },
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: "Ошибка создания" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updated = await prisma.news.update({
      where: { id: Number(id) },
      data: { title, content },
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
    await prisma.news.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Ошибка удаления" });
  }
});

module.exports = router;
