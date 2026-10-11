# Dogymorbios World 🐕

Комплексная цифровая экосистема для владельцев собак с уникальным игровым интерфейсом в стиле "Plush UI".

## Технологии

- **Next.js 14+** (App Router)
- **Tailwind CSS** - кастомная палитра Plush UI
- **Framer Motion** - плавные анимации и тактильные эффекты
- **Zustand** - управление состоянием
- **TypeScript** - типизация
- **Lucide React** - иконки

## Особенности дизайна

### Plush UI
- Мягкие, округлые формы (border-radius: 24-30px)
- Claymorphism эффекты (двойные тени)
- Тактильные анимации (scale, spring эффекты)
- Теплая цветовая палитра

### Компоненты
- **Кнопки**: Squeaky Toy (основные) и Biscuit (вторичные)
- **Инпуты**: Dug Hole стиль (внутренние тени)
- **Карточки**: Pillow/Treat стиль
- **Навигация**: Bone-shaped bottom bar с анимированными иконками

## Структура проекта

```
├── app/                    # Next.js App Router страницы
│   ├── onboarding/        # Экран знакомства
│   ├── home/              # Главная панель (Kennel)
│   ├── territory/         # Интерактивная карта
│   ├── pack/              # Социальная сеть
│   ├── vet-care/          # Ветеринар и уход
│   ├── treat-shop/        # Магазин лакомств
│   └── profile/           # Профиль пользователя
├── components/            # React компоненты
│   ├── ui/               # Базовые UI компоненты
│   └── navigation/       # Навигационные компоненты
├── stores/               # Zustand stores
├── lib/                  # Утилиты
└── public/              # Статические файлы
```

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Цветовая палитра

- **Background**: #FDF6F0 (Warm Milk)
- **Surface Primary**: #FFF0E5
- **Surface Secondary**: #FFE4D6
- **Accent Primary**: #FF9F89 (Salmon Treat)
- **Accent Secondary**: #A8D5BA (Fresh Grass)
- **Text Main**: #4A403A (Dark Chocolate)
- **Success**: #95D1CC
- **Warning**: #FFD68A

## Функции

- ✅ Onboarding опыт
- ✅ Главная панель с статусом питомца
- ✅ Интерактивная карта территории
- ✅ Социальная сеть (Pack)
- ✅ Ветеринар и уход
- ✅ Магазин лакомств с внутренней валютой
- ✅ Профиль пользователя

## Следующие шаги

- Интеграция с Supabase/Firebase
- Реализация аутентификации
- Добавление реальных карт (Google Maps/Mapbox)
- Push-уведомления
- PWA манифест для установки как приложение

## Лицензия

MIT

