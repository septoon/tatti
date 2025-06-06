# Tatti – сайт доставки авторской еды (кейтеринг)

## 📖 Описание проекта

**Tatti** – это современный и стильный сайт для заказа авторских блюд и услуг кейтеринга, созданный с использованием Next.js. Проект отличается быстрой загрузкой, SEO-оптимизацией и интуитивно понятным пользовательским интерфейсом.

🌐 **Студия разработки**: [LumaStack](https://lumastack.ru)

---

## ✨ Основные функции

- 📋 **Авторское меню**: подробное описание блюд, качественные изображения и актуальные цены.
- 📱 **Адаптивность**: корректное отображение на смартфонах, планшетах и компьютерах.
- 🗓 **Онлайн-заказ**: выбор даты и времени доставки при оформлении заказа.
- 💳 **Платёжные системы**: интеграция популярных методов оплаты для удобства пользователей.
- 🔍 **Удобная навигация**: простота и лёгкость в использовании.

---

## 💻 Технологический стек

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Работа с API**:
  - [Axios](https://axios-http.com/)

- **Деплой и безопасность**:
  - **Nginx**
  - **Certbot** (Let's Encrypt SSL)

---

## ⚙️ Установка и запуск

### 1️⃣ Клонирование репозитория
```bash
git clone https://github.com/septoon/tatti.git
cd tatti
```

### 2️⃣ Установка зависимостей
```bash
npm install
```

### 3️⃣ Запуск проекта в режиме разработки
```bash
npm run dev
```

Проект доступен на [http://localhost:3000](http://localhost:3000).

---

## 🗂 Структура проекта
```bash
tatti/
│
├── pages/          # Страницы и маршрутизация Next.js
├── components/     # Повторно используемые компоненты UI
├── styles/         # Стили Tailwind CSS и кастомные стили
├── public/         # Статические файлы и изображения
├── utils/          # Вспомогательные функции и API
└── package.json    # Управление зависимостями и скриптами
```

---

## 🌐 Развёртывание проекта

Проект развёрнут на сервере с использованием Nginx, а SSL-сертификат обеспечивается с помощью Certbot (Let's Encrypt).

Основные команды для управления сервером:

#### Запуск приложения через PM2:
```bash
pm2 start npm --name "tatti" -- run start
```

#### Тестирование и обновление SSL-сертификатов:
```bash
sudo certbot renew --dry-run
```

---

## 🔏 Лицензия

Проект распространяется по лицензии MIT.

---

## 🧑‍💻 Автор проекта

[Tigran Darchinyan](https://github.com/septoon)
