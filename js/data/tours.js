export const toursData = [
  {
    id: 1,
    title: "Магія Синевиру",
    category: "mountains",
    price: 2800,
    img: "assets/img/synevir.png",
    gallery: [
      "assets/img/synevir.png",
      "assets/img/synevir-above.png",
      "assets/img/synevir-winter.png",
    ],
    description:
      "Найбільше озеро Українських Карпат, овіяне легендами. У програмі: відвідування центру реабілітації бурих ведмедів, водоспад Шипіт, підйом на крісельному витягу на гору Гимба та дегустація закарпатських вин. Ідеальний варіант для сімейного відпочинку та відновлення сил серед прадавніх смерек.",
    duration: "2 дні / 1 ніч",
    dates: ["2026-06-10", "2026-07-15", "2026-08-20"],
  },
  {
    id: 2,
    title: "Таємниці Львова",
    category: "history",
    price: 1950,
    img: "assets/img/lviv.png",
    gallery: [
      "assets/img/lviv.png",
      "assets/img/lviv-under.png",
      "assets/img/lviv-above.png",
    ],
    description:
      "Львів — це місто, яке надихає. Ми пройдемося середньовічними вуличками, спустимося у підземелля єзуїтів, піднімемося на Ратушу та скуштуємо найкращу каву в легендарних кнайпах. Вечірня екскурсія 'Нічна варта' додасть містики вашій подорожі.",
    duration: "1 день",
    dates: ["2026-06-05", "2026-06-12", "2026-06-19", "2026-06-26"],
  },
  {
    id: 3,
    title: "Одеса: Архітектура та Море",
    category: "sea",
    price: 3500,
    img: "assets/img/odesa.png",
    gallery: [
      "assets/img/odesa.png",
      "assets/img/odesa-above.png",
      "assets/img/odesa-sea.png",
    ],
    description:
      "Південна перлина України. Екскурсія двориками Молдаванки, величний Оперний театр, катакомби та відпочинок на пляжі Ланжерон. У вартість входить морська прогулянка на яхті на заході сонця.",
    duration: "3 дні / 2 ночі",
    dates: ["2026-07-01", "2026-07-15", "2026-08-01"],
  },
  {
    id: 4,
    title: "Королівський Кам'янець",
    category: "history",
    price: 1600,
    img: "assets/img/kamianets.png",
    gallery: [
      "assets/img/kamianets.png",
      "assets/img/kamianets-baloon.png",
      "assets/img/kamianets-people.png",
    ],
    description:
      "Подорож у часі. Відвідаємо Кам'янець-Подільську фортецю, Хотинський замок та Бакоту — затоплене село з неймовірними краєвидами на Дністер. Атмосфера середньовіччя гарантована.",
    duration: "2 дні",
    dates: ["2026-09-10", "2026-09-24"],
  },
  {
    id: 5,
    title: "Сходження на Говерлу",
    category: "mountains",
    price: 1300,
    img: "assets/img/hoverla.png",
    gallery: [
      "assets/img/hoverla.png",
      "assets/img/hoverla-people.png",
      "assets/img/hoverla-view.png",
    ],
    description:
      "Випробуй себе! Сходження на найвищу точку України (2061 м). Професійні гіди, безпечний маршрут та незабутні фотографії з хмарами під ногами. Після спуску — карпатський чан.",
    duration: "1 день",
    dates: ["2026-06-20", "2026-07-20", "2026-08-24"],
  },
  {
    id: 6,
    title: "Джарилгач: Українські Мальдіви",
    category: "sea",
    price: 2900,
    img: "assets/img/dgyrylhach.png",
    gallery: [
      "assets/img/dgyrylhach.png",
      "assets/img/dgyrylhach-sea.png",
      "assets/img/dgyrylhach-light.png",
    ],
    description:
      "Дикий острів, білий пісок та бірюзова вода. Життя в кемпінгу, спостереження за дельфінами, екскурсія до старого маяка Ейфеля. Повний детокс від цивілізації.",
    duration: "3 дні",
    dates: ["2026-07-10", "2026-08-10"],
  },
  {
    id: 7,
    title: "Тунель Кохання + Луцьк",
    category: "history",
    price: 1400,
    img: "assets/img/tunnel.png",
    gallery: [
      "assets/img/tunnel.png",
      "assets/img/lutsk-above.png",
      "assets/img/lutsk-castle.png",
    ],
    description:
      "Найромантичніше місце України. Фотосесія у Тунелі Кохання та екскурсія замком Любарта у Луцьку. Відвідаємо також музей дзвонів та будинок з химерами.",
    duration: "1 день",
    dates: ["2026-05-15", "2026-06-15"],
  },
  {
    id: 8,
    title: "Рафтинг на Чорному Черемоші",
    category: "mountains",
    price: 3100,
    img: "assets/img/cheremosh-rafting.png",
    gallery: [
      "assets/img/cheremosh-rafting.png",
      "assets/img/cheremosh.png",
      "assets/img/cheremosh-people.png",
    ],
    description:
      "Драйв та адреналін! Сплав по гірській річці, вечірні посиденьки біля ватри, гриль-вечірка. Спорядження та інструктаж входять у вартість. Досвід не обов'язковий.",
    duration: "2 дні",
    dates: ["2026-05-01", "2026-05-15", "2026-06-01"],
  },
];
/**
 * Знаходить повний об'єкт туру за його ID.
 * Ця функція необхідна для Wishlist та деталей туру.
 * @param {string | number} id - ID туру.
 * @returns {object | undefined}
 */
export function findTourById(id) {
  return toursData.find((t) => t.id == id);
}
