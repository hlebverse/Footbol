const express = require("express");
const router = express.Router();
const prisma = require("./prisma");

// GET
router.get("/", async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      orderBy: { id: "desc" },
      include: { team: true }, // Подтягиваем инфо о команде
    });
    res.json(players);
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { name, position, age, teamId } = req.body;
    if (!name || !teamId)
      return res.status(400).json({ error: "Имя и команда обязательны" });

    const player = await prisma.player.create({
      data: {
        name,
        position,
        age: Number(age),
        teamId: Number(teamId),
      },
      include: { team: true },
    });
    res.json(player);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Ошибка создания" });
  }
});

// PUT (Редактирование)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, age, teamId } = req.body;

    const updated = await prisma.player.update({
      where: { id: Number(id) },
      data: {
        name,
        position,
        age: Number(age),
        teamId: Number(teamId),
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
    await prisma.player.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Ошибка удаления" });
  }
});

module.exports = router;
