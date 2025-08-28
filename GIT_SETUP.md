# 🐙 Настройка Git репозитория

## Шаг 1: Инициализация Git

```bash
# Инициализируйте Git репозиторий
git init

# Добавьте все файлы в staging area
git add .

# Создайте первый коммит
git commit -m "Initial commit: ALKA Lombard web application"
```

## Шаг 2: Создание репозитория на GitHub

1. Перейдите на [github.com](https://github.com)
2. Нажмите "New repository"
3. Введите название: `alka-lombard` (или любое другое)
4. Выберите "Public" или "Private"
5. **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license"
6. Нажмите "Create repository"

## Шаг 3: Подключение к GitHub

```bash
# Добавьте удаленный репозиторий
git remote add origin https://github.com/YOUR_USERNAME/alka-lombard.git

# Переименуйте основную ветку в main (современный стандарт)
git branch -M main

# Отправьте код на GitHub
git push -u origin main
```

## Шаг 4: Настройка секретов GitHub

### Для GitHub Pages (если используете):

1. Перейдите в настройки репозитория
2. В левом меню выберите "Secrets and variables" → "Actions"
3. Нажмите "New repository secret"
4. Добавьте следующие секреты:

```
VITE_EMAILJS_PUBLIC_KEY=R76z8_rjN3YXj448h
VITE_EMAILJS_SERVICE_ID=service_unmqhcc
VITE_EMAILJS_TEMPLATE_ID=template_8g35gsf
VITE_RECIPIENT_EMAIL=haval.semey@mail.ru
VITE_COMPANY_NAME=АЛҚА ЛОМБАРД
```

## Шаг 5: Настройка GitHub Pages

1. В настройках репозитория перейдите в "Pages"
2. В разделе "Source" выберите "GitHub Actions"
3. GitHub Actions автоматически развернет проект при каждом push

## Шаг 6: Проверка развертывания

1. После push в main ветку, перейдите в "Actions" вкладку
2. Дождитесь завершения workflow "Deploy to GitHub Pages"
3. В настройках "Pages" появится ссылка на ваш сайт

## Структура файлов после настройки

```
alka-lombard/
├── .git/                    # Git репозиторий
├── .github/                 # GitHub Actions
│   └── workflows/
│       └── deploy.yml
├── .gitignore              # Исключения Git
├── env.example             # Пример переменных окружения
├── env.local               # Локальные переменные (не в Git)
├── package.json            # Зависимости проекта
├── README.md               # Документация
├── DEPLOYMENT.md           # Инструкции по развертыванию
├── GIT_SETUP.md            # Этот файл
├── src/                    # Исходный код
├── public/                 # Публичные файлы
└── dist/                   # Сборка (не в Git)
```

## Команды для ежедневной работы

```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push

# Получить обновления (если работаете в команде)
git pull
```

## Решение проблем

### Ошибка "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/alka-lombard.git
```

### Ошибка аутентификации
```bash
# Настройте Personal Access Token на GitHub
# Или используйте SSH ключи
git remote set-url origin git@github.com:YOUR_USERNAME/alka-lombard.git
```

### Проблемы с переменными окружения
1. Убедитесь, что .env файл создан локально
2. Проверьте, что секреты настроены в GitHub
3. Перезапустите GitHub Actions

## Безопасность

✅ **Что уже настроено:**
- .gitignore исключает конфиденциальные файлы
- EmailJS ключи вынесены в переменные окружения
- Создан .env.example для настройки

⚠️ **Что нужно сделать:**
- Создать .env файл локально
- Настроить секреты в GitHub
- Регулярно обновлять EmailJS ключи

## Поддержка

При возникновении проблем:
1. Проверьте консоль браузера
2. Посмотрите логи GitHub Actions
3. Убедитесь, что все секреты настроены
4. Проверьте переменные окружения

---

**🎉 Поздравляем! Ваш проект готов для GitHub!**

