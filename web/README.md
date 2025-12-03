# Web-пакет Безопасно.Форум

Vite-приложение, отвечающее за лендинг приглашения. Главные файлы:
- `src/App.tsx` — сборка всех секций лендинга.
- `src/data/content.ts` — единый источник данных по героям программы, партнёрам и CTA.
- `src/components/*` — независимые секции (hero, аудитория, партнёры, регистрация и т.д.).
- `src/App.test.tsx` — smoke-тесты на рендер hero/CTA и программы.

## Команды
```bash
npm run dev        # локальный dev-server
npm run build      # прод сборка
npm run preview    # предпросмотр сборки
npm test           # Vitest (jsdom + coverage)
./deploy.sh        # деплой на продакшн сервер
```

## Деплой

Для деплоя на продакшн сервер используется скрипт `deploy.sh`, который:
1. Проверяет наличие собранной папки `dist/`
2. Загружает файлы на сервер через SSH/rsync
3. Синхронизирует содержимое с удаленным сервером

**Требования:**
- Установленный `sshpass` (для macOS: `brew install hudochenkov/sshpass/sshpass`)
- Собранный проект (`npm run build`)

**Конфигурация сервера:**
- Хост: `j176759b.beget.tech`
- Пользователь: `j176759b_forum`
- Путь: `~/public_html`
- Домен: `https://forum.bezopasno.org/`

Скрипт автоматически добавляет хост в `known_hosts` и использует безопасные опции SSH.

## Стек и ссылки
- React 19 + Vite 7 + TypeScript.[^1]
- Tailwind CSS 3.4 + tailgrids/plugin, кастомные utility в `src/index.css`.[^1][^2]
- Vitest + @testing-library для UI-тестов (Jest не используется).[^1]

[^1]: package.json  
[^2]: research/RESEARCH_STEP.md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
