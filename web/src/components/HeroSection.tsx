import { BOT_URL, heroContent } from '../data/content'
import { CTAButton } from './CTAButton'

export const HeroSection = () => {
  return (
    <section id="top" className="relative isolate overflow-hidden text-white">
      {/* Анимированный фон с фото */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-zoom"
        style={{
          backgroundImage: "url('/images/events/hero-bg.jpg')",
        }}
        aria-hidden
      />
      {/* Анимированный градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-brand.red/20 to-black/80 animate-gradient-loop" aria-hidden />
      
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 pb-20 pt-28 text-center md:px-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">
              II заседание Форума юристов по недвижимости
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">
              {heroContent.badge}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-balance max-w-4xl">
          <img
            src="/logos/bezopasno-f.svg"
            alt="Логотип БЕЗОПАСНОСДЕЛКА для темного фона"
            className="h-32 w-auto drop-shadow-lg md:h-48 mx-auto"
          />
          <p className="text-lg text-white/80 md:text-xl">{heroContent.description}</p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <CTAButton href={BOT_URL} label="Получить бесплатный пропуск" />
          <CTAButton href="#program" label="Смотреть программу" variant="secondary" />
        </div>
        <p className="text-sm text-white/60">
          Количество мест ограничено. Участие бесплатное по предварительной регистрации.
        </p>

        <div className="grid w-full max-w-4xl gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:grid-cols-3">
          <div>
            <p className="text-sm uppercase text-white/60">Дата</p>
            <p className="font-display text-2xl">{heroContent.date}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-white/60">Локация</p>
            <p className="font-display text-2xl">{heroContent.city}</p>
          </div>
          <div>
            <p className="text-sm uppercase text-white/60">Детали</p>
            <p className="text-white/80">{heroContent.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

