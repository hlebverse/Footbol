const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Загружаем переменные окружения из .env

const app = express();
const port = process.env.PORT || 8000;

// ==================
// 1. Middleware (Настройки)
// ==================
app.use(cors()); // Разрешаем запросы с фронтенда (localhost:5173 и др.)
app.use(express.json()); // Позволяет читать JSON данные из POST/PUT запросов

// ==================
// 2. Импорт маршрутов
// ==================
// Мы подключаем файлы, которые содержат ВСЕ операции (GET, POST, PUT, DELETE)
const newsRoutes = require("./src/news.routes");
const teamsRoutes = require("./src/teams.routes");
const playersRoutes = require("./src/players.routes");
const matchesRoutes = require("./src/matches.routes");

// ==================
// 3. Подключение маршрутов (REST API)
// ==================

// Теперь мы задаем "префикс" для каждого роутера.
// Например, в newsRoutes мы писали router.get("/"), а здесь добавляем "/news".
// Итоговый адрес получится: /news

app.use("/news", newsRoutes); // Доступно: GET /news, POST /news, PUT /news/:id...
app.use("/teams", teamsRoutes); // Доступно: GET /teams, POST /teams...
app.use("/players", playersRoutes); // Доступно: GET /players...
app.use("/matches", matchesRoutes); // Доступно: GET /matches...

// ==================
// 4. Главная страница (Инфо)
// ==================
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 20px;">
      <h1 style="color: #2c3e50;">⚽ Footbol Backend работает!</h1>
      <p>API переведено на REST-архитектуру.</p>
      
      <h3>📂 Доступные ресурсы:</h3>
      <ul>
        <li><a href="/news">/news</a> — Новости</li>
        <li><a href="/teams">/teams</a> — Сборные</li>
        <li><a href="/players">/players</a> — Игроки</li>
        <li><a href="/matches">/matches</a> — Матчи</li>
      </ul>

      <p><strong>Для каждого ресурса доступны методы:</strong></p>
      <code>
        GET    /ресурс       (Список)<br>
        POST   /ресурс       (Создать)<br>
        PUT    /ресурс/:id   (Обновить)<br>
        DELETE /ресурс/:id   (Удалить)
      </code>
    </div>
  `);
});

// ==================
// 5. Запуск сервера
// ==================
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`📝 Mode: Docker / Localhost`);
});
