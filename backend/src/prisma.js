const { PrismaClient } = require("@prisma/client");

// Создаем только ОДИН экземпляр на все приложение
const prisma = new PrismaClient();

module.exports = prisma;
