const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

// GET-заглушка
router.get("/add-news", (req, res) => {
  res.send(`
    <h1>POST endpoint</h1>
    <p>Отправьте POST запрос с JSON:</p>
    <pre>{ "title": "Заголовок", "content": "Текст новости" }</pre>
  `);
});

// POST
router.post("/add-news", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Поля 'title' и 'content' обязательны",
      });
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
      },
    });

    console.log("✅ Новость создана:", news);

    res.status(201).json({
      message: "Новость успешно добавлена",
      news,
    });
  } catch (error) {
    console.error("❌ Ошибка:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
