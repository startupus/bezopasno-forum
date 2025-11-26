import { useState, useEffect, useRef } from 'react'
import { guestPhotos } from '../data/content'

export const GuestsSpotlight = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Автоматический скроллинг
  useEffect(() => {
    if (!scrollContainerRef.current || !isScrolling) return

    const container = scrollContainerRef.current
    let scrollPosition = 0
    const scrollSpeed = 1 // пикселей за кадр
    const scrollInterval = 16 // ~60fps

    const scroll = () => {
      if (!isScrolling) return
      
      scrollPosition += scrollSpeed
      container.scrollLeft = scrollPosition

      // Проверяем, достигли ли конца
      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0 // Возвращаемся к началу
      }
    }

    const intervalId = setInterval(scroll, scrollInterval)

    return () => clearInterval(intervalId)
  }, [isScrolling])

  // Проверка возможности прокрутки
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    )
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollability()
    container.addEventListener('scroll', checkScrollability)
    window.addEventListener('resize', checkScrollability)

    return () => {
      container.removeEventListener('scroll', checkScrollability)
      window.removeEventListener('resize', checkScrollability)
    }
  }, [])

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    setIsScrolling(false)
    scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    setTimeout(() => setIsScrolling(true), 2000)
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    setIsScrolling(false)
    scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    setTimeout(() => setIsScrolling(true), 2000)
  }

  return (
    <section id="guests" className="bg-[rgba(244,245,247,0.4)] py-20">
      <div className="mx-auto max-w-6xl space-y-10 px-6 md:px-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF0000]">Кого встретите в зале</p>
          <h2 className="font-display text-3xl font-semibold text-[#0F172A] md:text-4xl">Приглашённые гости и эксперты</h2>
        </div>
      </div>

      {/* Горизонтальная галерея от края до края */}
      <div className="relative mt-10">
        {/* Стрелка влево */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            onMouseEnter={() => setIsScrolling(false)}
            onMouseLeave={() => setIsScrolling(true)}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#0F172A] shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50"
            aria-label="Прокрутить влево"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Контейнер с прокруткой */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsScrolling(false)}
          onMouseLeave={() => setIsScrolling(true)}
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-4" style={{ width: 'max-content', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            {guestPhotos.map((photo, index) => (
              <div
                key={photo}
                className="flex-shrink-0 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
                style={{ width: '280px', height: '350px' }}
              >
                <img
                  src={photo}
                  alt={`Гость форума ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Стрелка вправо */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            onMouseEnter={() => setIsScrolling(false)}
            onMouseLeave={() => setIsScrolling(true)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#0F172A] shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50"
            aria-label="Прокрутить вправо"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
