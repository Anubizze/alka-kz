import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/alka-kz/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Отключаем source maps для решения CSP проблем
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // PDF файлы размещаем в папке PDF для GitHub Pages
          if (assetInfo.name && assetInfo.name.endsWith('.pdf')) {
            return 'PDF/[name][extname]'
          }
          // Остальные файлы в assets
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  // Включаем PDF файлы в обработку
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.pdf'],
  // Копируем PDF файлы в папку PDF в dist
  publicDir: 'public'
})
