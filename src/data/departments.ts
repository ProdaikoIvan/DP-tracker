import type { Country } from '../types/departments.types';

export const departments: Country[] = [
  {
    name: 'Польща',
    flag: '🇵🇱',
    cities: [
      { name: 'Краків', address: 'Pawia 5, 31-154 Kraków', disabled: true, url: 'https://krakow.pasport.org.ua/solutions/e-queue' },
      { name: 'Гданськ', address: 'Aleja Grunwaldzka, 415', disabled: true, url: 'https://gdansk.pasport.org.ua/solutions/e-queue' },
      { name: 'Вроцлав', address: 'plac Grunwaldzki 22, 50-363', disabled: true, url: 'https://wroclaw.pasport.org.ua/solutions/e-queue' },
      { name: 'Варшава', address: 'Al. Jerozolimskie, 179', disabled: true, url: 'https://warszawa.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Чехія',
    flag: '🇨🇿',
    cities: [
      { name: 'Прага', address: 'Michelská, 1552/58', disabled: true, url: 'https://prague.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Німеччина',
    flag: '🇩🇪',
    cities: [
      { name: 'Берлін', address: 'Am Treptower Park 14', disabled: true, url: 'https://berlin.pasport.org.ua/solutions/e-queue' },
      { name: 'Кельн', address: 'Händelstraße 25-29', disabled: true, url: 'https://cologne.pasport.org.ua/solutions/e-queue' },
      { name: 'Мюнхен', address: 'Heinrich-Wieland-Straße 5, 81735', disabled: true, url: 'https://munich.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Іспанія',
    flag: '🇪🇸',
    cities: [
      { name: 'Мадрид', address: 'Madrid, Blvr. de José Prat, 35, Vicálvaro, 28032', disabled: true, url: 'https://madrid.pasport.org.ua/solutions/e-queue' },
      { name: 'Валенсія', address: 'Av. de Pius XII, 2, local 117, Campanar', disabled: true, url: 'https://valencia.pasport.org.ua/solutions/e-queue' },
      { name: 'Барселона', address: 'Av. del Segle XXI, 6, 08840 Viladecans', disabled: true, url: 'https://barcelona.pasport.org.ua/solutions/e-queue' },
    ],
  },
];
