import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000"; // твой бэкенд

const tabFields = {
  users: ["name", "age", "money"],
  news: ["title", "content"],
  players: ["name", "age", "team"],
  teams: ["name", "score"],
  matches: ["team1", "team2", "score1", "score2"],
};

function AdminPanel() {
  const [tab, setTab] = useState("users");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  // ---------- Загрузка данных ----------
  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/${tab}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error("Ошибка загрузки:", e);
    }
  };

  useEffect(() => {
    setEditingId(null);
    setForm({});
    loadData();
  }, [tab]);

  // ---------- CREATE / UPDATE ----------
  const submitForm = async () => {
    if (!form.name && !form.title) return alert("Введите обязательное поле");

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/${tab}/${editingId}`
      : `${API_URL}/${tab}`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingId(null);
      setForm({});
      loadData();
    } catch (e) {
      console.error("Ошибка отправки:", e);
    }
  };

  // ---------- DELETE ----------
  const deleteItem = async (id) => {
    if (!confirm("Удалить запись?")) return;
    try {
      await fetch(`${API_URL}/${tab}/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      console.error("Ошибка удаления:", e);
    }
  };

  // ---------- START EDIT ----------
  const startEdit = (item) => {
    setEditingId(item.id);
    setForm(item);
  };

  // ---------- Форма ----------
  const renderForm = () => (
    <div
      style={{
        padding: 20,
        background: "#f8f9fa",
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <h3>
        {editingId ? "Редактирование" : "Новая запись"} ({tab})
      </h3>
      {tabFields[tab].map((field) => (
        <div key={field} style={{ marginBottom: 10 }}>
          <input
            placeholder={field}
            value={form[field] || ""}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            style={{ padding: 6, width: "100%" }}
          />
        </div>
      ))}
      <button onClick={submitForm} style={{ marginRight: 10 }}>
        {editingId ? "Сохранить" : "Создать"}
      </button>
      {editingId && <button onClick={() => setEditingId(null)}>Отмена</button>}
    </div>
  );

  // ---------- Таблица ----------
  const renderTable = () => (
    <table width="100%" border="1" cellPadding="8">
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.keys(item).map((key) => (
              <td key={key}>{item[key]}</td>
            ))}
            <td>
              <button onClick={() => startEdit(item)}>✏️</button>
              <button onClick={() => deleteItem(item.id)}>🗑</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", fontFamily: "Arial" }}>
      <h1>⚽ Админ-панель Footbol</h1>

      {/* Навигация */}
      <div style={{ marginBottom: 20 }}>
        {Object.keys(tabFields).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              marginRight: 10,
              padding: "8px 15px",
              backgroundColor: tab === t ? "#007bff" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Форма */}
      {renderForm()}

      {/* Таблица */}
      {renderTable()}
    </div>
  );
}

export default AdminPanel;
