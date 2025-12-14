const express = require("express");
const router = express.Router();
const prisma = require("./prisma"); // Подключаем твой клиент

// 1. GET - Список всех команд
router.get("/", async (req, res) => {
  try {
    const teams = await prisma.nationalTeam.findMany({
      orderBy: { id: "desc" },
    });
    res.json(teams);
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// 2. POST - Добавить команду
router.post("/", async (req, res) => {
  try {
    const { name, country } = req.body;
    if (!name || !country)
      return res.status(400).json({ error: "Нужно имя и страна" });

    const team = await prisma.nationalTeam.create({
      data: { name, country },
    });
    res.json(team);
  } catch (e) {
    // P2002 - ошибка уникальности (такая команда уже есть)
    if (e.code === "P2002")
      return res.status(400).json({ error: "Такая команда уже есть" });
    res.status(500).json({ error: "Ошибка создания" });
  }
});

// 3. PUT - Редактировать команду (:id)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country } = req.body;

    const updatedTeam = await prisma.nationalTeam.update({
      where: { id: Number(id) },
      data: { name, country },
    });
    res.json(updatedTeam);
  } catch (e) {
    res.status(500).json({ error: "Не удалось обновить" });
  }
});

// 4. DELETE - Удалить команду (:id)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.nationalTeam.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (e) {
    // P2003 - ошибка связей (нельзя удалить команду, если в ней есть игроки или матчи)
    if (e.code === "P2003") {
      return res
        .status(400)
        .json({ error: "Нельзя удалить: у команды есть игроки или матчи" });
    }
    res.status(500).json({ error: "Ошибка удаления" });
  }
});

module.exports = router;
