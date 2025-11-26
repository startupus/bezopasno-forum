# src каталог

- `components/` — UI-секции и вспомогательные элементы (cta, floating button, карточки спикеров).  
- `data/content.ts` — централизованные данные о героях, блоках программы, партнёрах и CTA.  
- `index.css` — глобальные стили, импорты Tailwind, кастомные utility (`card-surface`, `section-title`).  
- `App.tsx` — композиция всего лендинга.  
- `App.test.tsx` и `setupTests.ts` — Vitest + RTL smoke-проверки.

Правило: все контентные правки сначала меняем в `data/content.ts`, затем используем пропсы/маппинг в компонентах — никаких хардкодов в JSX.[^1]

[^1]: research/RESEARCH_STEP.md

