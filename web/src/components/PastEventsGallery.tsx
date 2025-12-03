import { useState, useRef, useCallback, useEffect } from 'react'
import { pastEventsPhotos } from '../data/content'

/** Lightbox для просмотра фото в полном размере */
const Lightbox = ({ photo, isOpen, onClose, onNext, onPrev, currentIndex, total }: {
  photo: string
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  currentIndex: number
  total: number
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'ArrowLeft') onPrev()
  }, [isOpen, onClose, onNext, onPrev])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фото"
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Закрыть"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Предыдущее фото"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Следующее фото"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo}
          alt={`Фото с прошедшего мероприятия ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-full object-contain"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
          {currentIndex + 1} / {total}
        </div>
      </div>
    </div>
  )
}

/** Галерея прошедших мероприятий - с автоматической прокруткой */
export const PastEventsGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<number | null>(null)
  const isPausedRef = useRef(false)
  const isUserScrollingRef = useRef(false)

  const goToNext = useCallback(() => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = 320 + 16 // ширина карточки + gap
    
    // Если достигли конца, прокручиваем в начало
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }, [])

  const goToPrev = useCallback(() => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = 320 + 16 // ширина карточки + gap
    
    // Если в начале, прокручиваем в конец
    if (container.scrollLeft <= 10) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }, [])

  // Автоматическая прокрутка
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) return
      
      autoScrollIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current && !isUserScrollingRef.current && scrollContainerRef.current) {
          goToNext()
        }
      }, 3000) // Прокрутка каждые 3 секунды
    }

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }

    // Запускаем автопрокрутку
    startAutoScroll()

    // Обработчики для паузы при наведении
    const container = scrollContainerRef.current
    if (container) {
      const handleMouseEnter = () => {
        isPausedRef.current = true
      }

      const handleMouseLeave = () => {
        isPausedRef.current = false
      }

      // Обработчик ручной прокрутки
      let scrollTimeout: number | undefined
      const handleScroll = () => {
        isUserScrollingRef.current = true
        if (scrollTimeout) clearTimeout(scrollTimeout)
        scrollTimeout = window.setTimeout(() => {
          isUserScrollingRef.current = false
        }, 2000) // Возобновляем автопрокрутку через 2 секунды после остановки ручной
      }

      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      container.addEventListener('scroll', handleScroll)

      return () => {
        stopAutoScroll()
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
        container.removeEventListener('scroll', handleScroll)
        clearTimeout(scrollTimeout)
      }
    }

    return () => {
      stopAutoScroll()
    }
  }, [goToNext])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % pastEventsPhotos.length)
  }

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + pastEventsPhotos.length) % pastEventsPhotos.length)
  }

  return (
    <>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl space-y-8 px-6 md:px-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF0000]">Прошедшие мероприятия</p>
            <h2 className="font-display text-3xl font-semibold text-[#0F172A] md:text-4xl">Атмосфера и масштаб наших встреч</h2>
            <p className="text-base text-[#0F172A]/70">
              Гости, залы, живое общение — так проходили встречи ранее в рамках Жилконгресса и других мероприятий
            </p>
          </div>
        </div>

        {/* Горизонтальная галерея с прокруткой - от края до края */}
        <div className="relative w-full mt-10">
          {/* Кнопки навигации */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#0F172A] shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50"
            aria-label="Предыдущее фото"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#0F172A] shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50"
            aria-label="Следующее фото"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Контейнер с прокруткой - на всю ширину */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 scrollbar-hide w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-4" style={{ width: 'max-content', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
              {pastEventsPhotos.map((photo, index) => (
                <div
                  key={photo}
                  className="flex-shrink-0 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                  style={{ width: '320px', height: '400px' }}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightbox(index)
                    }
                  }}
                  aria-label={`Открыть фото ${index + 1} в полном размере`}
                >
                  <img
                    src={photo}
                    alt={`Фото с прошедшего мероприятия ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photo={pastEventsPhotos[lightboxIndex]}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={lightboxNext}
        onPrev={lightboxPrev}
        currentIndex={lightboxIndex}
        total={pastEventsPhotos.length}
      />
    </>
  )
}

