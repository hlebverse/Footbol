const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// ==================
// Middleware
// ==================
app.use(cors());
app.use(express.json()); // обязательно для POST JSON

// ==================
// Импорт маршрутов
// ==================

// POST routes
const newsPostRoute = require("./src/news.routes"); // /add-news
const teamsPostRoute = require("./src/teams.routes"); // /add-team
const playersPostRoute = require("./src/players.routes"); // /add-player
const matchesPostRoute = require("./src/matches.routes"); // /add-match

// GET routes

const newsGetRoute = require("./src/news.get"); // /news
const teamsGetRoute = require("./src/teams.get"); // /teams
const playersGetRoute = require("./src/players.get"); // /players
const matchesGetRoute = require("./src/matches.get"); // /matches

// ==================
// Подключение маршрутов
// ==================

app.use("/", newsPostRoute);
app.use("/", teamsPostRoute);
app.use("/", playersPostRoute);
app.use("/", matchesPostRoute);

app.use("/", newsGetRoute);
app.use("/", teamsGetRoute);
app.use("/", playersGetRoute);
app.use("/", matchesGetRoute);

// ==================
// Тестовый роут
// ==================
app.get("/", (req, res) => {
  res.send(`
    <h1>⚽ Footbol Backend работает!</h1>
    <p>Доступные эндпоинты:</p>
    <ul>
      <li>GET /users</li>
      <li>POST /add-user</li>
      <li>GET /news</li>
      <li>POST /add-news</li>
      <li>GET /teams</li>
      <li>POST /add-team</li>
      <li>GET /players</li>
      <li>POST /add-player</li>
      <li>GET /matches</li>
      <li>POST /add-match</li>
    </ul>
  `);
});

// ==================
// Запуск сервера
// ==================
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
