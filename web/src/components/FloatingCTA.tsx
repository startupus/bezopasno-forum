import { useEffect, useState } from 'react'
import { BOT_URL } from '../data/content'
import { CTAButton } from './CTAButton'

/** Прижатая кнопка регистрации, появляется только после скроллинга первого экрана */
export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку только после прокрутки на высоту экрана (100vh)
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      setIsVisible(scrollPosition > viewportHeight)
    }

    window.addEventListener('scroll', handleScroll)
    // Проверяем начальную позицию
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-4 z-40 drop-shadow-2xl transition-opacity duration-300 md:bottom-8 md:right-8">
      <CTAButton href={BOT_URL} label="Получить пропуск" />
    </div>
  )
}

