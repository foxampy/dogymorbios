export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating?: number
  image?: string
  category: 'food' | 'toys' | 'accessories' | 'care'
}

export const SHOP_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Премиум корм для собак',
    description: 'Полнорационный сухой корм с мясом и овощами',
    price: 50,
    originalPrice: 70,
    discount: 29,
    rating: 4.8,
    category: 'food',
  },
  {
    id: '2',
    name: 'Игрушка-канатик',
    description: 'Прочная игрушка для активных игр и тренировок',
    price: 30,
    rating: 4.6,
    category: 'toys',
  },
  {
    id: '3',
    name: 'Ошейник премиум',
    description: 'Кожаный ошейник с гравировкой и светоотражающими элементами',
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 4.9,
    category: 'accessories',
  },
  {
    id: '4',
    name: 'Шампунь для собак',
    description: 'Гипоаллергенный шампунь с натуральными компонентами',
    price: 25,
    rating: 4.7,
    category: 'care',
  },
  {
    id: '5',
    name: 'Мяч для собак',
    description: 'Резиновый мяч для игр на свежем воздухе',
    price: 15,
    rating: 4.5,
    category: 'toys',
  },
  {
    id: '6',
    name: 'Лакомства для дрессировки',
    description: 'Набор натуральных лакомств для поощрения',
    price: 35,
    originalPrice: 45,
    discount: 22,
    rating: 4.8,
    category: 'food',
  },
]

export const CATEGORIES = [
  { id: 'all', name: 'Все товары', emoji: '🛍️' },
  { id: 'food', name: 'Корм', emoji: '🍖' },
  { id: 'toys', name: 'Игрушки', emoji: '🎾' },
  { id: 'accessories', name: 'Аксессуары', emoji: '👔' },
  { id: 'care', name: 'Уход', emoji: '🧴' },
]

