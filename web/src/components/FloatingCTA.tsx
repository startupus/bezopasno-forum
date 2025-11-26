import { BOT_URL } from '../data/content'
import { CTAButton } from './CTAButton'

/** Прижатая кнопка регистрации, всегда видимая на каждом экране */
export const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-4 z-40 drop-shadow-2xl md:bottom-8 md:right-8">
      <CTAButton href={BOT_URL} label="Получить пропуск" />
    </div>
  )
}

