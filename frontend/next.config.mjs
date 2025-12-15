// frontend/next.config.mjs (Используйте этот код)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Настройка для Docker (если оставили из предыдущих советов)
  output: "standalone",

  // 2. Разрешение на использование картинок (если нужно)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Разрешить любые внешние хосты
      },
    ],
  },

  // 3. Возможно, вам нужно добавить Node.js модули
  // import { fileURLToPath } from 'url'; // Используйте import вместо require

  // Остальные настройки
};

// Экспорт по умолчанию
export default nextConfig; // <- Правильный синтаксис для .mjs
