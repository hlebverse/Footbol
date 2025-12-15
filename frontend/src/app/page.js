"use client"; // <-- ОБЯЗАТЕЛЬНО! Делает компонент Клиентским

import { useEffect, useState } from "react";

// Получаем URL бэкенда из переменной окружения Next.js
// Next.js автоматически подставит эту переменную из .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// =========================================================================
// КОНФИГУРАЦИЯ СХЕМЫ (SCHEMA)
// =========================================================================
const SCHEMA = {
  news: {
    label: "Новости",
    fields: [
      { name: "title", label: "Заголовок", type: "text" },
      { name: "content", label: "Текст", type: "textarea" },
    ],
  },
  teams: {
    label: "Сборные",
    fields: [
      { name: "name", label: "Название", type: "text" },
      { name: "country", label: "Страна", type: "text" },
    ],
  },
  players: {
    label: "Игроки",
    fields: [
      { name: "name", label: "Имя", type: "text" },
      { name: "position", label: "Позиция", type: "text" },
      { name: "age", label: "Возраст", type: "number" },
      { name: "teamId", label: "Команда", type: "select", source: "teams" },
    ],
  },
  matches: {
    label: "Матчи",
    fields: [
      { name: "homeTeamId", label: "Дома", type: "select", source: "teams" },
      {
        name: "awayTeamId",
        label: "В гостях",
        type: "select",
        source: "teams",
      },
      { name: "homeScore", label: "Счет (дом)", type: "number" },
      { name: "awayScore", label: "Счет (гости)", type: "number" },
      { name: "matchDate", label: "Дата", type: "datetime-local" },
    ],
  },
};

// =========================================================================
// ГЛАВНЫЙ КОМПОНЕНТ (AdminPanel)
// =========================================================================
export default function AdminPanel() {
  const [tab, setTab] = useState("news");
  const [data, setData] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  // 1. Загрузка списка команд (справочник)
  const loadTeams = async () => {
    try {
      const res = await fetch(`${API_URL}/teams`);
      if (res.ok) {
        const json = await res.json();
        setTeamsList(json);
      }
    } catch (e) {
      console.error("Ошибка загрузки команд:", e);
    }
  };

  // 2. Загрузка основных данных
  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/${tab}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Ошибка API:", res.status);
      }
    } catch (e) {
      console.error(`Ошибка загрузки ${tab}:`, e);
    }
  };

  // Эффект: Загрузка команд при монтировании
  useEffect(() => {
    loadTeams();
  }, []);

  // Эффект: Загрузка данных при смене вкладки
  useEffect(() => {
    setEditingId(null);
    setForm({});
    loadData();
  }, [tab]);

  // Хелпер: Получить имя команды по ID
  const getTeamName = (id) => {
    const team = teamsList.find((t) => t.id === id);
    return team ? team.name : id;
  };

  // ---------- СОХРАНЕНИЕ (CREATE / UPDATE) ----------
  const submitForm = async () => {
    const method = editingId ? "PUT" : "POST";
    let url = `${API_URL}/${tab}`;
    if (editingId) url += `/${editingId}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Ошибка: " + (err.error || "Что-то пошло не так"));
        return;
      }

      setEditingId(null);
      setForm({});
      loadData();
      if (tab === "teams") loadTeams();
    } catch (e) {
      alert("Ошибка сети");
      console.error(e);
    }
  };

  // ---------- УДАЛЕНИЕ ----------
  const deleteItem = async (id) => {
    if (!confirm("Точно удалить запись?")) return;
    try {
      const res = await fetch(`${API_URL}/${tab}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        alert("Ошибка: " + (err.error || "Не удалось удалить"));
      } else {
        loadData();
        if (tab === "teams") loadTeams();
      }
    } catch (e) {
      console.error("Ошибка удаления:", e);
    }
  };

  // ---------- НАЧАЛО РЕДАКТИРОВАНИЯ ----------
  const startEdit = (item) => {
    let safeItem = { ...item };

    if (safeItem.matchDate) {
      safeItem.matchDate = new Date(safeItem.matchDate)
        .toISOString()
        .slice(0, 16);
    }

    setEditingId(item.id);
    setForm(safeItem);
  };

  // ---------- РЕНДЕР ИНПУТА ----------
  const renderInput = (field) => {
    const val = form[field.name] !== undefined ? form[field.name] : "";

    if (field.type === "select" && field.source === "teams") {
      return (
        <select
          value={val}
          onChange={(e) =>
            setForm({ ...form, [field.name]: Number(e.target.value) })
          }
          style={inputStyle}
        >
          <option value="">-- Выберите команду --</option>
          {teamsList.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          value={val}
          onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
          style={{ ...inputStyle, height: 80, resize: "vertical" }}
        />
      );
    }

    return (
      <input
        type={field.type}
        value={val}
        onChange={(e) => {
          const value =
            field.type === "number"
              ? e.target.value
                ? Number(e.target.value)
                : ""
              : e.target.value;
          setForm({ ...form, [field.name]: value });
        }}
        style={inputStyle}
      />
    );
  };

  // ---------- РЕНДЕР ЯЧЕЙКИ ТАБЛИЦЫ ----------
  const renderCell = (item, key) => {
    if (key === "teamId" || key === "homeTeamId" || key === "awayTeamId") {
      return <b>{getTeamName(item[key])}</b>;
    }
    if ((key === "matchDate" || key === "createdAt") && item[key]) {
      return new Date(item[key]).toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return item[key];
  };

  // =========================================================================
  // РЕНДЕР (JSX)
  // =========================================================================
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "20px auto",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        ⚽ Админ-панель Footbol (Тестирование)
      </h1>

      {/* Кнопки вкладок */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}
      >
        {Object.keys(SCHEMA).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              padding: "10px 15px",
              background: tab === key ? "#007bff" : "#e9ecef",
              color: tab === key ? "#fff" : "#495057",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
            {SCHEMA[key].label}
          </button>
        ))}
      </div>

      {/* Форма */}
      <div
        style={{
          background: "#f8f9fa",
          padding: 20,
          borderRadius: 8,
          border: "1px solid #dee2e6",
          marginBottom: 30,
        }}
      >
        <h3 style={{ marginTop: 0 }}>
          {editingId ? "✏️ Редактирование записи" : "➕ Добавить новую запись"}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          {SCHEMA[tab].fields.map((field) => (
            <div
              key={field.name}
              style={field.type === "textarea" ? { gridColumn: "span 2" } : {}}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "5px",
                  fontWeight: 500,
                }}
              >
                {field.label}
              </label>
              {renderInput(field)}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button onClick={submitForm} style={btnStyle("#28a745")}>
            {editingId ? "Сохранить изменения" : "Создать"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setForm({});
              }}
              style={btnStyle("#6c757d")}
            >
              Отмена
            </button>
          )}
        </div>
      </div>

      {/* Таблица */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ background: "#343a40", color: "#fff" }}>
              {SCHEMA[tab].fields.map((f) => (
                <th key={f.name} style={{ padding: 12, textAlign: "left" }}>
                  {f.label}
                </th>
              ))}
              <th style={{ padding: 12, textAlign: "right" }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={10} style={{ padding: 20, textAlign: "center" }}>
                  Нет данных
                </td>
              </tr>
            )}
            {data.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #dee2e6",
                  background: "#fff",
                }}
              >
                {SCHEMA[tab].fields.map((f) => (
                  <td key={f.name} style={{ padding: 12 }}>
                    {renderCell(item, f.name)}
                  </td>
                ))}
                <td
                  style={{
                    padding: 12,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    onClick={() => startEdit(item)}
                    style={{ ...actionBtnStyle, color: "#007bff" }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ ...actionBtnStyle, color: "#dc3545" }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Стили (оставлены в файле для простоты, в реальном проекте выносить в CSS)
const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "4px",
  border: "1px solid #ced4da",
  boxSizing: "border-box",
  fontSize: "14px",
};

const btnStyle = (bg) => ({
  padding: "10px 20px",
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
});

const actionBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  marginLeft: "10px",
};
