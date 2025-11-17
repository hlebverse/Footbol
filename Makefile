# Названия контейнеров из docker-compose
BACKEND = backend
FRONTEND = frontend
DB = postgres_db

.PHONY: setup build up down logs shell-front shell-back prisma-init prisma-migrate install-deps

help:
	@echo "make setup               - первый запуск: сборка, поднятие контейнеров"
	@echo "make up                  - запуск контейнеров в фоне"
	@echo "make down                - остановить проект и удалить тома"
	@echo "make logs                - показать логи всех контейнеров"
	@echo "make shell-back          - войти в backend контейнер"
	@echo "make shell-front         - войти в frontend контейнер"
	@echo "make prisma-init         - инициализация Prisma"
	@echo "make prisma-migrate name=<name> - создать миграцию Prisma с указанным именем"

# setup — для первого запуска проекта
# собирает образы, поднимает контейнеры 
setup: build up 

# build — собирает образы всех контейнеров
build:
	docker-compose build

# up — поднимает все контейнеры в фоне
up:
	docker-compose up -d

# down — останавливает проект и удаляет тома
down:
	docker-compose down -v

# logs — показывает логи всех контейнеров
logs:
	docker-compose logs -f

# shell-back — открывает shell внутри backend контейнера
shell-back:
	docker-compose exec $(BACKEND) sh

# shell-front — открывает shell внутри frontend контейнера
shell-front:
	docker-compose exec $(FRONTEND) sh

# prisma-init — инициализация Prisma
prisma-init:
	docker-compose exec $(BACKEND) npx prisma init

# prisma-migrate — создание миграции Prisma
prisma-migrate:
	docker-compose exec $(BACKEND) npx prisma migrate dev --name $(name)


