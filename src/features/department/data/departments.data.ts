import type { Country } from '../types/department.types';

export const departments: Country[] = [
  {
    name: 'Україна',
    code: 'UA',
    cities: [
      { name: 'Київ (Шептицького)', address: 'вул. Митрополита А. Шептицького, 4 А', url: 'https://komod.pasport.org.ua/solutions/e-queue' },
      { name: 'Київ (Кільцева дорога)', address: 'вул. Кільцева дорога, 1', url: 'https://respublika.pasport.org.ua/solutions/e-queue' },
      { name: 'Київ (Алмазова)', address: 'вул. Генерала Алмазова, 11', url: 'https://gotovo.pasport.org.ua/solutions/e-queue' },
      { name: 'Київ (пл. Галицька)', address: 'пл. Галицька, 3', url: 'https://ukraina.pasport.org.ua/solutions/e-queue' },
      { name: 'Київ (Європейського Союзу)', address: 'пр-т. Європейського Союзу, 47', url: 'https://retroville.pasport.org.ua/solutions/e-queue' },
      { name: 'Київ (Бажана)', address: 'пр. М. Бажана, 38', url: 'https://kyiv2.pasport.org.ua/solutions/e-queue' },
      { name: 'Київ (Степана Бандери)', address: 'просп. Степана Бандери, 23', url: 'https://gorodok.pasport.org.ua/solutions/e-queue' },
      { name: 'Вишневе (Київ)', address: 'вул. Київська, 2л', url: 'https://vyshneve.pasport.org.ua/solutions/e-queue' },
      { name: 'Вінниця', address: 'просп. Коцюбинського, 4', url: 'https://vinnucya2.pasport.org.ua/solutions/e-queue' },
      { name: 'Дніпро', address: 'узвіз Крутогірний, 33', url: 'https://dnipro.pasport.org.ua/solutions/e-queue' },
      { name: 'Житомир', address: 'майдан Перемоги, 13а', url: 'https://zhytomyr.pasport.org.ua/solutions/e-queue' },
      { name: 'Запоріжжя', address: 'просп. Соборний, 144', url: 'https://zaporizhzhya2.pasport.org.ua/solutions/e-queue' },
      { name: 'Івано-Франківськ', address: 'вул. Незалежності, 44', url: 'https://ivano-frankivsk.pasport.org.ua/solutions/e-queue' },
      { name: 'Кривий Ріг', address: 'вул. Олександра Поля, 14', url: 'https://kruvui-rig.pasport.org.ua/solutions/e-queue' },
      { name: 'Луцьк', address: 'вул. Конякіна, 30', url: 'https://lutsk.pasport.org.ua/solutions/e-queue' },
      { name: 'Львів', address: 'вул. Юліуша Словацького, 1', url: 'https://lviv2.pasport.org.ua/solutions/e-queue' },
      { name: 'Миколаїв', address: 'вул. Садова, 3В', url: 'https://mukolaiv.pasport.org.ua/solutions/e-queue' },
      { name: 'Одеса', address: 'вул. Європейська 27/1', url: 'https://odesa3.pasport.org.ua/solutions/e-queue' },
      { name: 'Полтава', address: 'вул. Гоголя, 20.', url: 'https://poltava.pasport.org.ua/solutions/e-queue' },
      { name: 'Рівне', address: 'вул. 16-го Липня, 6А', url: 'https://rivne.pasport.org.ua/solutions/e-queue' },
      { name: 'Суми', address: 'Покровська площа, 11', url: 'https://sumy.pasport.org.ua/solutions/e-queue' },
      { name: 'Тернопіль', address: 'вул. Патріарха Йосипа Сліпого, 7', url: 'https://ternopil.pasport.org.ua/solutions/e-queue' },
      { name: 'Ужгород', address: 'вул. Івана Чендея, 10Б', url: 'https://uzhhorod.pasport.org.ua/solutions/e-queue' },
      { name: 'Харків', address: 'проспект Науки, 62', url: 'https://kharkiv.pasport.org.ua/solutions/e-queue' },
      { name: 'Хмельницький', address: 'вул. Прибузька, 30А', url: 'https://hmelnitsk.pasport.org.ua/solutions/e-queue' },
      { name: 'Черкаси', address: 'бул. Тараса Шевченка, 132', url: 'https://cherkasu.pasport.org.ua/solutions/e-queue' },
      { name: 'Чернівці', address: 'вул. Руська, 31А', url: 'https://chernivci.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Польща',
    code: 'PL',
    cities: [
      { name: 'Краків', address: 'Pawia 5, 31-154 Kraków', url: 'https://krakow.pasport.org.ua/solutions/e-queue' },
      { name: 'Гданськ', address: 'Aleja Grunwaldzka, 415', url: 'https://gdansk.pasport.org.ua/solutions/e-queue' },
      { name: 'Вроцлав', address: 'plac Grunwaldzki 22, 50-363', url: 'https://wroclaw.pasport.org.ua/solutions/e-queue' },
      { name: 'Варшава', address: 'Al. Jerozolimskie, 179', url: 'https://warszawa.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Чехія',
    code: 'CZ',
    cities: [
      { name: 'Прага', address: 'Michelská, 1552/58', url: 'https://prague.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Словаччина',
    code: 'SK',
    cities: [
      { name: 'Братислава', address: 'Prievozská 5434/6A', url: 'https://bratislava.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Німеччина',
    code: 'DE',
    cities: [
      { name: 'Берлін', address: 'Am Treptower Park 14', url: 'https://berlin.pasport.org.ua/solutions/e-queue' },
      { name: 'Кельн', address: 'Händelstraße 25-29', url: 'https://cologne.pasport.org.ua/solutions/e-queue' },
      { name: 'Мюнхен', address: 'Heinrich-Wieland-Straße 5, 81735', url: 'https://munich.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Іспанія',
    code: 'ES',
    cities: [
      { name: 'Мадрид', address: 'Madrid, Blvr. de José Prat, 35, Vicálvaro, 28032', url: 'https://madrid.pasport.org.ua/solutions/e-queue' },
      { name: 'Валенсія', address: 'Av. de Pius XII, 2, local 117, Campanar', url: 'https://valencia.pasport.org.ua/solutions/e-queue' },
      { name: 'Барселона', address: 'Av. del Segle XXI, 6, 08840 Viladecans', url: 'https://barcelona.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Італія',
    code: 'IT',
    cities: [
      { name: 'Мілан', address: 'Via Eugenio Curiel, 25, Rozzano', url: 'https://milan.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Болгарія',
    code: 'BG',
    cities: [
      { name: 'Варна', address: 'бул. Владислав Варненчик, 186', url: 'https://varna.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Молдова',
    code: 'MD',
    cities: [
      { name: 'Кишинів', address: 'Bd.Stefan cel Mare si Sfant, 8', url: 'https://chisinau.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Канада',
    code: 'CA',
    cities: [
      { name: 'Торонто', address: '99 Six Point Rd, Etobicoke, ON M8Z 2X3', url: 'https://toronto.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Сполучене Королівство Великої Британії та Північної Ірландії',
    code: 'GB',
    cities: [
      { name: 'Лондон', address: 'Ground Floor, The Foundry, 8-15 Dereham Place, EC2A 3HJ', url: 'https://london.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Бельгія',
    code: 'BE',
    cities: [
      { name: 'Кортрейк', address: 'Kloosterstraat 9 - 8510 Marke, Kortrijk, Belgium', url: 'https://kortrijk.pasport.org.ua/solutions/e-queue' },
    ],
  },
  {
    name: 'Словенія',
    code: 'SI',
    cities: [
      { name: 'Любляна', address: 'Leskoškova cesta, 12', url: 'https://ljubljana.pasport.org.ua/solutions/e-queue' },
    ],
  },
];
