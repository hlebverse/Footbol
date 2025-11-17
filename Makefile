BACKEND = backend
FRONTEND = frontend
DB = postgres_db

.PHONY: setup build up down logs shell-front shell-back prisma-init prisma-migrate

help:
	@echo "make setup         - первый запуск"
	@echo "make up            - запуск контейнеров"
	@echo "make down          - остановить проект"
	@echo "make logs          - показать логи"
	@echo "make shell-back    - войти в backend контейнер"
	@echo "make shell-front   - войти в frontend контейнер"
	@echo "make prisma-init   - инициализация Prisma"
	@echo "make prisma-migrate name=<name>"

setup: build up

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down -v

logs:
	docker-compose logs -f

shell-back:
	docker-compose exec $(BACKEND) sh

shell-front:
	docker-compose exec $(FRONTEND) sh

prisma-init:
	docker-compose exec $(BACKEND) npx prisma init

prisma-migrate:
	docker-compose exec $(BACKEND) npx prisma migrate dev --name $(name)
