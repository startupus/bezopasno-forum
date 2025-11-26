import { useState, useEffect } from 'react'
import { gallery } from '../data/content'

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
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
          alt={`Фото с мероприятия ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-full object-contain"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
          {currentIndex + 1} / {total}
        </div>
      </div>
    </div>
  )
}

/** Карусель с анимацией для галереи */
export const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Автопрокрутка карусели
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length)
    }, 5000) // Меняем фото каждые 5 секунд

    return () => clearInterval(interval)
  }, [])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % gallery.length)
  }

  const lightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  return (
    <>
      <section className="bg-brand.dark px-6 py-20 text-white md:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Атмосфера прошлых встреч</p>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Живой нетворкинг и тёплые залы</h2>
          </div>

          {/* Карусель */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {gallery.map((photo, index) => (
                <div key={photo} className="min-w-full">
                  <div
                    className="relative aspect-video cursor-pointer overflow-hidden"
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
                      alt={`Фото с мероприятия ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white">
                        Нажмите для просмотра
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Кнопки навигации */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Предыдущее фото"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Следующее фото"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Индикаторы */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-brand.red' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Перейти к фото ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Миниатюры для быстрого перехода */}
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-9">
            {gallery.map((photo, index) => (
              <button
                key={photo}
                onClick={() => setCurrentIndex(index)}
                className={`overflow-hidden rounded-xl border-2 transition-all ${
                  index === currentIndex ? 'border-brand.red scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Показать фото ${index + 1}`}
              >
                <img
                  src={photo}
                  alt={`Миниатюра ${index + 1}`}
                  className="aspect-video h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        photo={gallery[lightboxIndex]}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={lightboxNext}
        onPrev={lightboxPrev}
        currentIndex={lightboxIndex}
        total={gallery.length}
      />
    </>
  )
}
