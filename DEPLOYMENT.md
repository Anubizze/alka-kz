# 🚀 Инструкция по развертыванию

## GitHub Pages

### 1. Подготовка проекта
```bash
# Убедитесь, что все изменения закоммичены
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Настройка GitHub Pages
1. Перейдите в настройки репозитория на GitHub
2. В разделе "Pages" выберите источник "GitHub Actions"
3. Создайте workflow файл `.github/workflows/deploy.yml`

### 3. Создание workflow файла
Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
        VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
        VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
        VITE_RECIPIENT_EMAIL: ${{ secrets.VITE_RECIPIENT_EMAIL }}
        VITE_COMPANY_NAME: ${{ secrets.VITE_COMPANY_NAME }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 4. Настройка секретов GitHub
В настройках репозитория добавьте секреты:
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_RECIPIENT_EMAIL`
- `VITE_COMPANY_NAME`

## Netlify

### 1. Подключение репозитория
1. Зарегистрируйтесь на [netlify.com](https://netlify.com)
2. Подключите ваш GitHub репозиторий
3. Настройте переменные окружения в разделе "Environment variables"

### 2. Переменные окружения
```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_RECIPIENT_EMAIL=your_email
VITE_COMPANY_NAME=Your Company
```

### 3. Настройка сборки
- Build command: `npm run build`
- Publish directory: `dist`

## Vercel

### 1. Подключение репозитория
1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Импортируйте ваш GitHub репозиторий
3. Настройте переменные окружения

### 2. Переменные окружения
Те же переменные, что и для Netlify

### 3. Автоматическое развертывание
Vercel автоматически развернет проект при каждом push в main ветку

## Локальное тестирование

### 1. Создание .env файла
```bash
cp env.example .env
# Отредактируйте .env с вашими данными
```

### 2. Запуск
```bash
npm run dev
```

### 3. Проверка
Откройте http://localhost:5173 в браузере

## Проверка безопасности

### ✅ Что проверено:
- EmailJS ключи вынесены в переменные окружения
- .env файлы добавлены в .gitignore
- Создан .env.example для настройки
- Убрано логирование конфиденциальных данных

### ⚠️ Рекомендации:
- Регулярно обновляйте EmailJS ключи
- Используйте сложные пароли для админ панели
- Ограничьте доступ к админ панели по IP (в продакшене)
- Добавьте двухфакторную аутентификацию

## Поддержка

При возникновении проблем:
1. Проверьте переменные окружения
2. Убедитесь, что .env файл создан
3. Проверьте консоль браузера на ошибки
4. Обратитесь к документации EmailJS

