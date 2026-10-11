export interface DogBreed {
  id: string
  name: string
  emoji: string
  colors: string[]
  sizes: ('small' | 'medium' | 'large')[]
  personality: string[]
}

export const DOG_BREEDS: DogBreed[] = [
  {
    id: 'golden-retriever',
    name: 'Золотистый ретривер',
    emoji: '🦮',
    colors: ['#D4A574', '#8B6914', '#F5DEB3'],
    sizes: ['large'],
    personality: ['дружелюбный', 'активный', 'умный'],
  },
  {
    id: 'labrador',
    name: 'Лабрадор',
    emoji: '🐕',
    colors: ['#000000', '#8B4513', '#F5DEB3'],
    sizes: ['large'],
    personality: ['дружелюбный', 'энергичный', 'общительный'],
  },
  {
    id: 'husky',
    name: 'Хаски',
    emoji: '🐺',
    colors: ['#708090', '#000000', '#FFFFFF'],
    sizes: ['large'],
    personality: ['независимый', 'активный', 'умный'],
  },
  {
    id: 'corgi',
    name: 'Корги',
    emoji: '🐶',
    colors: ['#D2691E', '#8B4513', '#F4A460'],
    sizes: ['small'],
    personality: ['игривый', 'умный', 'дружелюбный'],
  },
  {
    id: 'poodle',
    name: 'Пудель',
    emoji: '🐩',
    colors: ['#FFFFFF', '#000000', '#8B4513'],
    sizes: ['small', 'medium', 'large'],
    personality: ['умный', 'элегантный', 'активный'],
  },
  {
    id: 'bulldog',
    name: 'Бульдог',
    emoji: '🐕‍🦺',
    colors: ['#8B4513', '#A0522D', '#D2691E'],
    sizes: ['medium'],
    personality: ['спокойный', 'дружелюбный', 'упрямый'],
  },
  {
    id: 'beagle',
    name: 'Бигль',
    emoji: '🐕',
    colors: ['#D2691E', '#8B4513', '#FFFFFF'],
    sizes: ['medium'],
    personality: ['игривый', 'любопытный', 'дружелюбный'],
  },
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    emoji: '🐕',
    colors: ['#8B4513', '#000000', '#654321'],
    sizes: ['large'],
    personality: ['умный', 'верный', 'защитный'],
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    emoji: '🐕',
    colors: ['#8B4513', '#000000', '#F5DEB3'],
    sizes: ['small'],
    personality: ['смелый', 'живой', 'преданный'],
  },
  {
    id: 'dachshund',
    name: 'Такса',
    emoji: '🌭',
    colors: ['#8B4513', '#000000', '#D2691E'],
    sizes: ['small'],
    personality: ['игривый', 'упрямый', 'любопытный'],
  },
]

export const PERSONALITY_TAGS = [
  'игривый',
  'спокойный',
  'активный',
  'умный',
  'дружелюбный',
  'независимый',
  'верный',
  'любопытный',
  'защитный',
  'общительный',
  'энергичный',
  'упрямый',
]

export const NOSE_COLORS = [
  { name: 'Черный', value: '#000000' },
  { name: 'Коричневый', value: '#8B4513' },
  { name: 'Розовый', value: '#FFB6C1' },
  { name: 'Пестрый', value: '#654321' },
]

