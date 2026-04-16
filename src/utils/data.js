export const RESTAURANTS = [
  {
    id: 1,
    name: "Манас Гранд",
    cuisine: "Кыргызская кухня",
    address: "ул. Чуй, 114, Бишкек",
    phone: "+996 312 44-11-22",
    rating: 4.9,
    pricePerDish: 350,
    capacity: 80,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
    ],
    description: "Роскошный ресторан с традиционными кыргызскими блюдами в современной интерпретации. Панорамный вид на горы Ала-Тоо. Живая музыка по выходным.",
    workHours: "Пн–Вс: 11:00 – 23:00",
    tags: ["Панорамный вид", "Живая музыка", "Банкеты"],
    menu: [
      { name: "Бешбармак Королевский", desc: "Традиционное блюдо из конины и баранины", price: 490 },
      { name: "Дымлама", desc: "Тушёные овощи с мясом в казане", price: 320 },
      { name: "Манты с тыквой", desc: "На пару, с домашней сметаной", price: 280 },
      { name: "Самса тандырная", desc: "Свежая выпечка из тандыра", price: 150 },
      { name: "Лагман по-уйгурски", desc: "Тянутая лапша с овощами и мясом", price: 360 },
    ],
    status: "active",
    bookings: 248
  },
  {
    id: 2,
    name: "Иссык-Куль Терраса",
    cuisine: "Средиземноморская",
    address: "пр. Абдрахманова, 203, Бишкек",
    phone: "+996 312 55-22-33",
    rating: 4.7,
    pricePerDish: 520,
    capacity: 120,
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
    ],
    description: "Открытая терраса с видом на городской пейзаж. Средиземноморская кухня с кыргызским акцентом. Идеальное место для деловых ужинов и романтических вечеров.",
    workHours: "Пн–Пт: 12:00 – 00:00 | Сб–Вс: 11:00 – 01:00",
    tags: ["Терраса", "Деловые ужины", "Вино"],
    menu: [
      { name: "Тальята из говядины", desc: "С рукколой и пармезаном", price: 780 },
      { name: "Паста карбонара", desc: "Классический итальянский рецепт", price: 450 },
      { name: "Сёмга на гриле", desc: "С лимонным маслом и спаржей", price: 920 },
      { name: "Ризотто с грибами", desc: "Кремовое ризотто арборио", price: 520 },
      { name: "Тирамису", desc: "Классический итальянский десерт", price: 280 },
    ],
    status: "active",
    bookings: 186
  },
  {
    id: 3,
    name: "Ак-Буура Клуб",
    cuisine: "Авторская кухня",
    address: "ул. Токтогула, 88, Бишкек",
    phone: "+996 312 66-33-44",
    rating: 4.8,
    pricePerDish: 680,
    capacity: 50,
    image: "https://24.kg/files/media/65/65053.JPG",
    gallery: [
      "https://24.kg/files/media/65/65053.JPG",
      "https://24.kg/files/media/65/65053.JPG"
    ],
    description: "Закрытый гастрономический клуб для ценителей высокой кухни. Авторское меню от шеф-повара Айгерим Асановой. Только предварительная запись.",
    workHours: "Вт–Сб: 18:00 – 23:00",
    tags: ["Fine Dining", "Закрытый клуб", "Авторское меню"],
    menu: [
      { name: "Дегустационный сет (7 блюд)", desc: "Авторские блюда шеф-повара", price: 2800 },
      { name: "Тар-тар из форели", desc: "Местная форель с икрой", price: 850 },
      { name: "Томлёная баранина", desc: "Горная баранина, 72 часа", price: 1200 },
      { name: "Сорбе из облепихи", desc: "Кыргызские ягоды", price: 380 },
      { name: "Шоколадный фондан", desc: "С мороженым из кумыса", price: 450 },
    ],
    status: "active",
    bookings: 134
  },
  {
    id: 4,
    name: "Ош Базар Гриль",
    cuisine: "Узбекская и кыргызская",
    address: "ул. Ленина, 12, Ош",
    phone: "+996 322 25-66-77",
    rating: 4.6,
    pricePerDish: 280,
    capacity: 200,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80"
    ],
    description: "Аутентичный ресторан на юге Кыргызстана. Огромные порции настоящего плова и шашлыка на мангале. Семейная атмосфера и южное гостеприимство.",
    workHours: "Ежедневно: 09:00 – 22:00",
    tags: ["Семейный", "Мангал", "Большие порции"],
    menu: [
      { name: "Плов Ошский", desc: "Легендарный рецепт с 1948 года", price: 320 },
      { name: "Шашлык из баранины", desc: "На углях, с луком и зеленью", price: 420 },
      { name: "Куурдак", desc: "Жаркое из баранины и картофеля", price: 280 },
      { name: "Чучвара", desc: "Мелкие пельмени в бульоне", price: 220 },
      { name: "Лепёшка тандырная", desc: "Свежая, горячая", price: 80 },
    ],
    status: "active",
    bookings: 412
  },
  {
    id: 5,
    name: "Арпа Скай",
    cuisine: "Европейская",
    address: "ул. Боконбаева, 41, Бишкек",
    phone: "+996 312 77-44-55",
    rating: 4.5,
    pricePerDish: 890,
    capacity: 60,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80",
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80"
    ],
    description: "Ресторан на 18-м этаже с панорамным видом 360° на Бишкек и горы. Европейская кухня премиум-класса. Собственная коллекция вин.",
    workHours: "Пн–Вс: 17:00 – 02:00",
    tags: ["Скайбар", "Вина", "Панорама 360°"],
    menu: [
      { name: "Рибай стейк (350г)", desc: "Мраморная говядина, соус беарнез", price: 1850 },
      { name: "Лобстер Термидор", desc: "Классика французской кухни", price: 2400 },
      { name: "Утиная грудка", desc: "С соусом из черной смородины", price: 1200 },
      { name: "Трюфельный ризотто", desc: "Летний трюфель, пармезан 24 мес.", price: 1100 },
      { name: "Крем-брюле", desc: "Ванильный, с карамельной корочкой", price: 450 },
    ],
    status: "active",
    bookings: 97
  },
  {
    id: 6,
    name: "Нарын Хаус",
    cuisine: "Кочевая кухня",
    address: "ул. Сагынбаева, 5, Нарын",
    phone: "+996 352 22-33-44",
    rating: 4.8,
    pricePerDish: 220,
    capacity: 40,
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80"
    ],
    description: "Аутентичная юрта в центре горного Нарына. Традиционная кочевая кухня: кумыс, боорсоки, жаркое из конины. Подлинная атмосфера Великого шёлкового пути.",
    workHours: "Ежедневно: 10:00 – 21:00",
    tags: ["Юрта", "Традиционный", "Горная кухня"],
    menu: [
      { name: "Кесме", desc: "Домашняя лапша в мясном бульоне", price: 190 },
      { name: "Жаркое из конины", desc: "Горная конина с картофелем", price: 320 },
      { name: "Боорсоки", desc: "Жареное тесто с мёдом и каймаком", price: 120 },
      { name: "Курут", desc: "Солёный сыр из овечьего молока", price: 90 },
      { name: "Кымыз", desc: "Традиционный кисломолочный напиток", price: 150 },
    ],
    status: "active",
    bookings: 89
  }
];

export const USERS = [
  { id: 1, name: "Администратор", email: "admin@aizarest.kg", role: "admin", phone: "+996 700 111 222", avatar: "А", joined: "2023-01-15" },
  { id: 2, name: "Айгуль Маматова", email: "aigul@example.kg", role: "user", phone: "+996 555 333 444", avatar: "А", joined: "2023-06-20" },
  { id: 3, name: "Бакыт Жолдошев", email: "bakyt@example.kg", role: "user", phone: "+996 700 555 666", avatar: "Б", joined: "2023-09-01" },
  { id: 4, name: "Чынара Асанова", email: "chynara@example.kg", role: "user", phone: "+996 772 777 888", avatar: "Ч", joined: "2024-01-10" },
];

export const generateBookings = () => {
  const statuses = ["confirmed", "pending", "cancelled", "completed"];
  const names = ["Айгуль М.", "Бакыт Ж.", "Чынара А.", "Нурлан К.", "Жыргал С.", "Айдай Б.", "Эрлан У.", "Мира Т."];
  const bookings = [];
  for (let i = 1; i <= 24; i++) {
    const rest = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)];
    const guests = Math.floor(Math.random() * 6) + 1;
    const date = new Date(2026, Math.floor(Math.random() * 6) + 3, Math.floor(Math.random() * 28) + 1);
    const userId = i <= 8 ? 2 : Math.floor(Math.random() * 3) + 2;
    bookings.push({
      id: i,
      restaurantId: rest.id,
      restaurantName: rest.name,
      guestName: names[Math.floor(Math.random() * names.length)],
      userId,
      guests,
      date: date.toISOString().split('T')[0],
      time: `${11 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '00' : '30'}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      totalAmount: guests * rest.pricePerDish * (Math.floor(Math.random() * 3) + 2),
      phone: `+996 ${700 + Math.floor(Math.random() * 100)} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
      comment: Math.random() > 0.6 ? "Столик у окна, пожалуйста" : "",
    });
  }
  return bookings;
};
