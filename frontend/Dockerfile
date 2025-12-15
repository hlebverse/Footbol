# frontend/Dockerfile

# Используем Node.js
FROM node:20-alpine

# Рабочая папка внутри контейнера
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Next.js собирает телеметрию, отключаем её
ENV NEXT_TELEMETRY_DISABLED 1

# Открываем порт 3000 (стандарт для Next.js)
EXPOSE 3000

# Команда запуска (для разработки)
CMD ["npm", "run", "dev"]