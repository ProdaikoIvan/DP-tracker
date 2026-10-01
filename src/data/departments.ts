export interface City {
  name: string;
  address: string;
}

export interface Country {
  name: string;
  flag: string; // Emoji прапора
  cities: City[];
}

export const departments: Country[] = [
  {
    name: 'Польща',
    flag: '🇵🇱',
    cities: [
      { name: 'Краків', address: 'Pawia 5, 31-154 Kraków' },
      { name: 'Гданськ', address: 'Aleja Grunwaldzka, 415' },
      { name: 'Вроцлав', address: 'plac Grunwaldzki 22, 50-363' },
      { name: 'Варшава', address: 'Al. Jerozolimskie, 179' },
    ],
  },
  {
    name: 'Чехія',
    flag: '🇨🇿',
    cities: [
      { name: 'Прага', address: 'Michelská, 1552/58' },
    ],
  },
  {
    name: 'Німеччина',
    flag: '🇩🇪',
    cities: [
      { name: 'Берлін', address: 'Am Treptower Park 14' },
      { name: 'Кельн', address: 'Händelstraße 25-29' },
      { name: 'Мюнхен', address: 'Heinrich-Wieland-Straße 5, 81735' },
    ],
  },
  {
    name: 'Іспанія',
    flag: '🇪🇸',
    cities: [
      { name: 'Мадрид', address: 'Madrid, Blvr. de José Prat, 35, Vicálvaro, 28032' },
      { name: 'Валенсія', address: 'Av. de Pius XII, 2, local 117, Campanar' },
      { name: 'Барселона', address: 'Av. del Segle XXI, 6, 08840 Viladecans' },
    ],
  },
];
