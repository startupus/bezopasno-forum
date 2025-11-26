# components

- `HeroSection` — анимированный hero с логотипами, датой, CTA.  
- `AudienceSection`, `OrganizersSection`, `ProgramSection`, `ValueSection`, `GuestsSpotlight`, `GallerySection`, `PartnersSection`, `PartnerPackagesSection`, `RegistrationSection`, `Footer` — тематические блоки лендинга.  
- `CTAButton`, `FloatingCTA`, `SpeakerCard` — переиспользуемые элементы и карточки.

Компоненты получают контент только из `../data/content.ts`. Новые блоки добавляем по тому же принципу: описываем данные → создаём компонент → подключаем в `App.tsx`. Это сохраняет согласованность с требованиями заказчика и протоколом документации.[^1]

[^1]: research/RESEARCH_STEP.md

