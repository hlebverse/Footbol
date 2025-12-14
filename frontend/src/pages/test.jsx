// Football Women's Club – React + Tailwind (JS)
// Верстка по присланному макету: хедер + большой баннер + блок новостей

export default function WomensClubPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 text-sm font-medium">
            <nav className="flex gap-6">
              <a href="#" className="hover:underline">
                Новости
              </a>
              <a href="#" className="hover:underline">
                Команда
              </a>
              <a href="#" className="hover:underline">
                Матчи / Расписание
              </a>
              <a href="#" className="hover:underline">
                Фото / Видео
              </a>
              <a href="#" className="hover:underline">
                Контакты
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="bg-white/20 px-3 py-1 rounded-full text-xs">
                Купить билеты
              </button>
              <span className="text-xs">ENG | КР</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1600&auto=format&fit=crop"
          alt="Women's team"
          className="w-full h-[420px] object-cover"
        />

        <div className="absolute bottom-6 left-6">
          <div className="bg-pink-500 text-white px-6 py-4 rounded-xl max-w-xs">
            <h2 className="text-2xl font-semibold leading-tight">
              Women's Club is open !
            </h2>
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-xl font-semibold mb-6">НОВОСТИ</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard
            img="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1200&auto=format&fit=crop"
            title="Новая победа женской команды"
          />
          <NewsCard
            img="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format&fit=crop"
            title="Открытая тренировка уже в субботу"
          />
          <NewsCard
            img="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop"
            title="Интервью с капитаном"
          />
        </div>
      </section>
    </div>
  );
}

function NewsCard({ img, title }) {
  return (
    <article className="bg-white shadow-sm rounded-md overflow-hidden hover:shadow-md transition">
      <img src={img} alt={title} className="w-full h-44 object-cover" />
      <div className="p-3">
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
    </article>
  );
}

/*
Использование:
import WomensClubPage from './components/WomensClubPage';
<WomensClubPage />

Макет повторяет структуру присланного изображения:
- Градиентный хедер
- Большой баннер с плашкой
- Блок новостей из 3 карточек

Если нужно:
- Добавлю слайдер
- Подключу реальные данные
- Сделаю мобильную версию 1:1 как в Figma
*/
