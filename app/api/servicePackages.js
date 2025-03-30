export const servicePackages = {
  packages: [
    {
      id: 1001,
      name: "Пакет 1: Доставка и сервировка",
      price: 5000,
      cost: "от 5000 р / 1 стол (до 30 персон)",
      includes: [
        "доставка",
        "сервировка стола",
        "декор / инвентарь, одноразовая посуда, салфетки",
        "уборка"
      ],
      image: "https://i.ibb.co/2322s2RG/image-3.webp"
    },
    {
      id: 1002,
      name: "Пакет 2: С обслуживанием",
      price: 1500,
      cost: "от 1500 р / час (обслуживание от 2-х часов)",
      includes: [
        "доставка",
        "сервировка",
        "декор / инвентарь",
        "обслуживание официанта",
        "уборка"
      ],
      image: "https://i.ibb.co/21QHf5yW/image-2.webp"
    }
  ],
  extras: [
    {
      id: 2001,
      name: "Горка шампанского",
      price: 10000,
      cost: "10000 р",
      note: "Спиртное заказчика",
      image: "https://i.ibb.co/DgkmZJP2/image-1.webp"
    },
    {
      id: 2002,
      name: "Шоколадный фонтан",
      price: 10000,
      cost: "10000 р",
      note: "Шоколад Callebaut на выбор: белый / молочный / тёмный, фрукты",
      image: "https://i.ibb.co/wrLHQJgp/image-0.webp"
    }
  ]
}