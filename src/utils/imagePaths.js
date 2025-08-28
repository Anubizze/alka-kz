// Утилита для правильных путей изображений на GitHub Pages
const getImagePath = (path) => {
  // Убираем начальный слеш если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Проверяем, находимся ли мы на GitHub Pages
  const isGitHubPages = window.location.hostname === 'anubizze.github.io';
  
  if (isGitHubPages) {
    // На GitHub Pages добавляем базовый путь
    return `/alka-kz/${cleanPath}`;
  }
  
  // Локально используем обычный путь
  return `/${cleanPath}`;
};

export default getImagePath;
