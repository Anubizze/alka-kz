# АЛКА ЛОМБАРД - Веб-приложение

Профессиональное веб-приложение для группы компаний "Алка" - ломбард, ювелирный салон и финансовые услуги в Казахстане.

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- npm или yarn

### Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/Anubizze/alka-kz.git
cd alka-kz

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## 🔧 Настройка EmailJS

### 1. Получите ключи на [EmailJS](https://www.emailjs.com/)
### 2. Создайте файл `.env.local`:

```bash
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here

# Email Configuration
VITE_RECIPIENT_EMAIL=your_email@example.com
VITE_COMPANY_NAME=Your Company Name

# Google reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

### 3. Настройте шаблон EmailJS:
- **to_name**: Название компании
- **to_email**: Email получателя
- **from_name**: Имя отправителя
- **from_phone**: Телефон отправителя
- **from_email**: Email отправителя
- **message**: Сообщение

## 🚀 Развертывание на GitHub Pages

### 1. Настройте GitHub Secrets:
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_RECIPIENT_EMAIL`
- `VITE_COMPANY_NAME`
- `VITE_RECAPTCHA_SITE_KEY`

### 2. Включите GitHub Pages:
- Settings → Pages
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)

### 3. Настройте GitHub Actions:
- Actions → Deploy to GitHub Pages
- Разрешите выполнение workflow

## 📱 Функциональность

### Основные страницы:
- **Главная** - Услуги и новости компании
- **О компании** - Информация о группе компаний
- **Организации** - Ювелирный салон и ломбард
- **Контакты** - Контактная информация
- **Калькулятор** - Расчет залоговых кредитов
- **Новости** - Новости компании

### Административная панель:
- Управление новостями
- Управление контентом главной страницы
- Загрузка изображений

### Безопасность:
- Google reCAPTCHA v2
- Валидация форм
- Защита от спама

## 🛠️ Технологии

- **Frontend**: React 18, Vite
- **Роутинг**: React Router DOM
- **Стили**: CSS3, Responsive Design
- **Email**: EmailJS
- **Защита**: Google reCAPTCHA
- **Развертывание**: GitHub Pages, GitHub Actions

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
├── pages/              # Страницы приложения
├── context/            # React Context
├── utils/              # Утилиты
├── styles/             # Глобальные стили
└── assets/             # Статические ресурсы
```

## 🔒 Безопасность

- Все API ключи хранятся в переменных окружения
- Формы защищены reCAPTCHA
- Валидация на клиентской и серверной стороне
- Безопасная обработка пользовательского ввода

## 📞 Поддержка

При возникновении проблем:
1. Проверьте настройки EmailJS
2. Убедитесь, что все переменные окружения настроены
3. Проверьте логи в консоли браузера
4. Создайте Issue в GitHub

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.

---

**АЛКА ЛОМБАРД** - Ваш надежный партнер в финансовых услугах! 💎💰
