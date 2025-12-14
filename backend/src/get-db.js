const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Определение GET маршрута
// Полный адрес будет: http://localhost:8000/users
router.get("/users", async (req, res) => {
  try {
    // 1. Получаем всех пользователей из таблицы User
    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc", // Сортировка: сначала новые
      },
    });

    // 2. Отправляем массив данных в формате JSON
    res.json(users);
  } catch (error) {
    console.error("❌ Ошибка при чтении:", error);
    res.status(500).json({ error: "Не удалось получить пользователей" });
  }
});

module.exports = router;
