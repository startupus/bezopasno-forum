import { useState, useEffect } from 'react'
import type { Speaker } from '../data/content'

type SpeakerCardProps = {
  speaker: Speaker
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

/** Lightbox для просмотра фото спикера */
const SpeakerPhotoLightbox = ({ photo, name, isOpen, onClose }: { photo: string; name: string; isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (!isOpen) {
      // Восстанавливаем скролл при закрытии
      document.body.style.overflow = ''
      return
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Блокируем скролл body при открытом lightbox
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    // Предотвращаем скролл на touch устройствах
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault()
    }
    
    window.addEventListener('keydown', handleEscape)
    window.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEscape)
      window.removeEventListener('touchmove', preventScroll)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Фото ${name}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute right-4 top-4 z-[10000] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Закрыть"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative flex h-full w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo}
          alt={`${name} - фото спикера`}
          className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
          style={{
            maxHeight: '85vh',
            maxWidth: '85vw',
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>
    </div>
  )
}

export const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <article className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {speaker.photo ? (
            <button
              onClick={() => setLightboxOpen(true)}
              className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={`Увеличить фото ${speaker.name}`}
            >
              <img
                src={speaker.photo}
                alt={`${speaker.name}, ${speaker.role}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </button>
          ) : (
            <div className="h-24 w-24 flex-shrink-0 rounded-2xl bg-gradient-to-br from-brand.red to-brand.dark text-center text-2xl font-bold leading-[6rem]">
              {getInitials(speaker.name)}
            </div>
          )}
          <div>
            <p className="text-xs uppercase text-white/60">{speaker.block}</p>
            <h3 className="font-semibold">{speaker.name}</h3>
            <p className="text-sm text-white/70">
              {speaker.role}
              {speaker.organization ? ` · ${speaker.organization}` : ''}
            </p>
          </div>
        </div>
        <div className="relative rounded-xl border-l-4 border-brand.red/50 bg-brand.red/10 p-4 pl-5">
          <p className="text-base font-semibold leading-relaxed text-white">
            {speaker.topic}
          </p>
        </div>
      </article>

      {speaker.photo && (
        <SpeakerPhotoLightbox
          photo={speaker.photo}
          name={speaker.name}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
