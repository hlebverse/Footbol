// my-project/frontend/src/pages/HomePage.jsx

import axios from "axios";
import { useEffect, useState } from "react";

// Адрес нашего Express API (Backend запущен на 8000 порту)
const API_BASE_URL = "http://localhost:8000";

export default function HomePage() {
  // 1. Состояния для данных, загрузки и ошибок
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect для выполнения запроса при загрузке компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- ОТПРАВКА GET ЗАПРОСА НА КОРНЕВОЙ МАРШРУТ '/' ---
        const response = await axios.get(`${API_BASE_URL}/`);

        setData(response.data);
      } catch (err) {
        console.error("Ошибка при подключении к Express API:", err);
        // Записываем ошибку в состояние
        setError(`Ошибка: ${err.message}. Проверьте make logs`);
      } finally {
        // Завершаем состояние загрузки
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив [] гарантирует, что запрос выполнится только один раз (при монтировании)

  // --- RENDERING: Что показать пользователю ---

  if (loading) {
    return (
      <h1 className="text-3xl p-8 text-green-400">
        Загрузка данных с Backend...
      </h1>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        <h1 className="text-xl font-bold">❌ Ошибка подключения</h1>
        <p>
          Не удалось получить данные с {API_BASE_URL}/. Убедитесь, что Backend
          запущен и настроен на '/' маршрут.
        </p>
        <pre className="mt-4 p-4 bg-red-900 rounded text-sm overflow-auto">
          {error}
        </pre>
      </div>
    );
  }

  // Если данные получены, выводим их
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4 text-green-400">
        ✅ Главная: Данные получены!
      </h1>
      <p className="text-lg text-gray-300">Ответ от Express API:</p>
      {/* JSON.stringify для форматирования JSON-объекта в читабельный вид */}
      <pre className="mt-4 p-4 bg-gray-700 rounded text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
