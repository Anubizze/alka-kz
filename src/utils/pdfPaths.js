// Утилита для правильных путей к PDF файлам в GitHub Pages
export const getPdfPath = (filename) => {
  // В режиме разработки используем относительные пути
  if (import.meta.env.DEV) {
    return `/PDF/${filename}`
  }
  
  // В продакшене (GitHub Pages) используем пути с base path
  // base: '/alka-kz/' в vite.config.js
  return `/alka-kz/PDF/${filename}`
}

// Список всех доступных PDF файлов
export const PDF_FILES = {
  // Договоры присоединения
  'Dogovor-prisoedineniya-do-50-MRP-01.10.2021-.pdf': 'Договор присоединения до 50 МРП',
  'Dogovor-prisoedineniya-svyshe-50-MRP-s-01.10.2021g.-.pdf': 'Договор присоединения свыше 50 МРП',
  'Prilozheniya-k-ZB-novyj.pdf': 'Приложение к ЗБ (новый)',
  'Pravila-lombarda-LOMBARD-ALKA.pdf': 'Правила ломбарда ЛОМБАРД АЛКА',
  'Uvedomlenie-Zaemshhiku-o-nevypolnenie-obyazatelstv.pdf': 'Уведомление Заемщику о невыполнение обязательств',
  'Pravila-LOMBARD-ALKA-ot-01.09.2021g.pdf': 'Правила ЛОМБАРД АЛКА от 01.09.2021г',
  
  // Финансовая отчетность
  'otchet-za-2024.pdf': 'Отчет за 2024 год',
  'Otchet-2023.pdf': 'Отчет за 2023 год',
  'Otchet-za-2022g.pdf': 'Отчет за 2022 год',
  'Otchet-2021_merged.pdf': 'Отчет за 2021 год',
  'Finansovaya-otchetnost-za-2020g.pdf': 'Финансовая отчетность за 2020г',
  
  // Другие документы
  'Poryadok-predostavleniya-otsrochki-platezhej-po-zajmam-fizicheskih-i-yuridicheskih-lits-postradavshih-v-rezultate-vvedeniya-chrezvychajnogo-polozheniya.pdf': 'Приказ о мерах поддержки',
  'Poryadok-i-kontaktnye-telefony-po-restrukturizatsii-zajma.pdf': 'Порядок и контактные телефоны по реструктуризации займа'
}

// Получить путь к PDF файлу по имени
export const getPdfPathByName = (filename) => {
  return getPdfPath(filename)
}

// Получить отображаемое имя PDF файла
export const getPdfDisplayName = (filename) => {
  return PDF_FILES[filename] || filename
}
