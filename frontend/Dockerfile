FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV PORT=3001
EXPOSE 3001
CMD ["npm", "run", "dev", "--", "--port", "3001", "--host"]
