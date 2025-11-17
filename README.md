Football News Project

Full-stack project: новостной сайт о футболе с backend на Node.js/Express и frontend на React + Vite, база данных PostgreSQL.

Стек
Backend

Node.js 24.x

Express 5.x

Prisma 6.x

PostgreSQL

dotenv

cors

nodemon (для разработки)

Frontend

React 18.x

Vite 7.x

react-router-dom 6.x

Dev Tools

Docker & Docker Compose

Makefile для управления проектом

npm / yarn для управления библиотеками

Установка и запуск

1. Клонируем репозиторий

git clone <your-repo-url>
cd <repo-folder>

2. Настройка .env файлов

Backend (backend/.env)
DATABASE_URL="postgresql://postgres:password@postgres_db:5432/football_db?schema=public"
PORT=8000

Frontend (frontend/.env)
VITE_API_URL=http://localhost:8000
