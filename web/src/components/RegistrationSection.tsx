import { BOT_URL } from '../data/content'
import { CTAButton } from './CTAButton'

export const RegistrationSection = () => (
  <section id="registration" className="relative isolate overflow-hidden bg-gradient-to-br from-[rgba(255,0,0,0.05)] via-white to-[rgba(244,245,247,0.3)] px-6 py-20 md:px-10">
    
    <div className="relative mx-auto max-w-5xl space-y-6 text-center">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF0000]">Регистрация</p>
        <h2 className="font-display text-3xl font-semibold text-[#0F172A] md:text-4xl">Участие бесплатное по предварительной регистрации</h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#0F172A]/80">
          Нажмите на кнопку ниже, откроется форма регистрации. Заполните короткую анкету и получите электронный пропуск и напоминания.
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <CTAButton href={BOT_URL} label="Получить пропуск в боте" />
        <CTAButton href="#top" label="Перейти к началу" variant="secondary-light" />
      </div>
      
      <ul className="mx-auto mt-8 grid max-w-2xl gap-2 text-left text-sm text-[#0F172A]/70 md:grid-cols-2">
        <li className="flex items-start gap-2">
          <span className="mt-1 text-[#FF0000]">✓</span>
          <span>Допматериалы к выступлениям</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-[#FF0000]">✓</span>
          <span>Полная программа дня</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-[#FF0000]">✓</span>
          <span>Напоминания и обновления</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 text-[#FF0000]">✓</span>
          <span>Возможность подать заявку на выступление как спикер</span>
        </li>
      </ul>
    </div>
  </section>
)

