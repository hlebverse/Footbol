import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full h-16 flex items-center">
      <div className="w-full h-full flex items-center bg-gradient-to-r from-pink-500 via-pink-600 to-purple-800 px-4">
        {/* Логотип */}
        <div className="border border-yellow-500 p-1 rounded-lg mr-6">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Навигация (desktop only) */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <a href="#" className="hover:text-gray-200">
            Новости
          </a>
          <a href="#" className="hover:text-gray-200">
            Команда
          </a>
          <a href="#" className="hover:text-gray-200">
            Матчи / Расписание
          </a>
          <a href="#" className="hover:text-gray-200">
            Контакты
          </a>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center">
          <button className="text-white bg-white/10 px-4 py-1 rounded-lg hover:bg-white/20 mr-4">
            Купить билет
          </button>

          <button className="text-white text-sm border border-white/40 px-3 py-1 rounded">
            Вход / Регистрация
          </button>
        </div>

        {/* Mobile Burger */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-purple-800/95 backdrop-blur-md text-white flex flex-col p-4 space-y-4 md:hidden">
          <a href="#" className="text-lg">
            Новости
          </a>
          <a href="#" className="text-lg">
            Команда
          </a>
          <a href="#" className="text-lg">
            Матчи / Расписание
          </a>
          <a href="#" className="text-lg">
            Контакты
          </a>

          <button className="text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">
            Купить билет
          </button>

          <button className="text-white border border-white/40 px-4 py-2 rounded">
            Вход / Регистрация
          </button>
        </div>
      )}
    </header>
  );
}
