export const MOCK_POSTS = [
  {
    id: '1',
    author: {
      name: 'Бобик',
      avatar: 'B',
      breed: 'Золотистый ретривер',
    },
    content: 'Отличная прогулка сегодня! Встретил новых друзей в парке 🐕',
    image: '/api/placeholder/400/300',
    likes: 42,
    comments: 5,
    isLiked: false,
    timestamp: '2 часа назад',
  },
  {
    id: '2',
    author: {
      name: 'Шарик',
      avatar: 'Ш',
      breed: 'Хаски',
    },
    content: 'Новая игрушка - лучший подарок! 🎾',
    image: '/api/placeholder/400/300',
    likes: 89,
    comments: 12,
    isLiked: true,
    timestamp: '5 часов назад',
  },
  {
    id: '3',
    author: {
      name: 'Рекс',
      avatar: 'Р',
      breed: 'Немецкая овчарка',
    },
    content: 'Тренировка прошла отлично! Готов к новым достижениям 💪',
    likes: 56,
    comments: 8,
    isLiked: false,
    timestamp: '1 день назад',
  },
]

export const MOCK_SNIFF_PROFILES = [
  {
    id: '1',
    name: 'Луна',
    breed: 'Корги',
    age: 2,
    avatar: '🐶',
    personality: ['игривый', 'дружелюбный', 'активный'],
    distance: 0.5,
  },
  {
    id: '2',
    name: 'Макс',
    breed: 'Лабрадор',
    age: 3,
    avatar: '🦮',
    personality: ['энергичный', 'общительный', 'умный'],
    distance: 1.2,
  },
  {
    id: '3',
    name: 'Белла',
    breed: 'Пудель',
    age: 4,
    avatar: '🐩',
    personality: ['элегантный', 'активный', 'дружелюбный'],
    distance: 0.8,
  },
]

