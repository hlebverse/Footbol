# Названия сервисов из docker-compose.yml
BACKEND = backend
FRONTEND = frontend
DB = postgres_db

.PHONY: help setup build up down logs shell-back shell-front prisma-init prisma-generate prisma-migrate prisma-deploy prisma-studio prisma-reset prisma-seed

# --- 🆘 Помощь ---
help:
	@echo "🛠  УПРАВЛЕНИЕ ПРОЕКТОМ"
	@echo "-----------------------"
	@echo "make setup               - 🔥 ПЕРВЫЙ ЗАПУСК (автоматически)"
	@echo "make up                  - запуск контейнеров"
	@echo "make down                - остановка"
	@echo "make logs                - логи"

# --- 🚀 Основные команды ---

# setup: Теперь намного проще!
# Мы просто запускаем контейнеры. Бэкенд сам сгенерирует клиент при старте (см. package.json).
# Мы только ждем базу и накатываем миграции (таблицы).
setup: build up
	@echo "⏳ Ждем инициализации базы данных (10 сек)..."
	@sleep 10
	@echo "🛠  Накатываем миграции..."
	@make prisma-deploy
	@echo "✅ Проект готов! Бэкенд: http://localhost:8000"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down -v

logs:
	docker-compose logs -f

# --- 🐚 Доступ в контейнеры ---

shell-back:
	docker-compose exec $(BACKEND) sh

shell-front:
	docker-compose exec $(FRONTEND) sh

# --- 🐘 Prisma ---

prisma-generate:
	docker-compose exec $(BACKEND) npx prisma generate

prisma-migrate:
	@if [ -z "$(name)" ]; then echo "❌ Ошибка: укажите имя. Пример: make prisma-migrate name=init"; exit 1; fi
	docker-compose exec $(BACKEND) npx prisma migrate dev --name $(name)

prisma-deploy:
	docker-compose exec $(BACKEND) npx prisma migrate deploy

prisma-studio:
	@echo "🌍 http://localhost:5555"
	docker-compose exec $(BACKEND) npx prisma studio

prisma-reset:
	docker-compose exec $(BACKEND) npx prisma migrate reset --force

prisma-seed:
	docker-compose exec $(BACKEND) npx prisma db seed