import { useState, useEffect } from 'react'
import { audienceSegments } from '../data/content'

export const AudienceSection = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0')
            setVisibleItems((prev) => new Set([...prev, itemId]))
          }
        })
      },
      { threshold: 0.3 }
    )

    const items = document.querySelectorAll('[data-item-id]')
    items.forEach((item) => observer.observe(item))

    return () => {
      items.forEach((item) => observer.unobserve(item))
    }
  }, [])

  return (
    <section id="audience" className="relative isolate overflow-hidden px-6 py-24 md:px-10">
      {/* Фоновое фото */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('/images/events/audience-bg.jpg')",
        }}
        aria-hidden
      />
      {/* Светлый оверлей с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand.light/50" aria-hidden />
      
      <div className="relative mx-auto max-w-6xl space-y-16">
        {/* Заголовок секции */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Для кого форум</p>
          <h2 className="font-display text-4xl font-semibold leading-tight text-brand.dark md:text-5xl">
            Профессионалам, которые отвечают за чистоту сделки
          </h2>
        </div>

        {/* Список аудитории */}
        <div className="grid gap-6 md:grid-cols-2">
          {audienceSegments.map((segment, index) => {
            const isVisible = visibleItems.has(index)
            return (
              <article
                key={segment.title}
                data-item-id={index}
                className={`group relative flex items-center gap-6 rounded-2xl border border-brand.dark/10 bg-white/80 p-6 backdrop-blur-sm transition-all duration-700 md:gap-8 md:p-8 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 shadow-lg shadow-brand.dark/10'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Крупный номер с акцентом */}
                <div className="relative flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand.red/20 to-brand.red/10 text-2xl font-bold text-brand.red transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-brand.red/30 group-hover:to-brand.red/20 md:h-20 md:w-20 md:text-3xl">
                    {index + 1}
                  </div>
                  {/* Декоративная линия */}
                  <div className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-brand.red/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Текст */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold leading-tight text-brand.dark transition-colors duration-300 group-hover:text-brand.red md:text-lg">
                    {segment.title}
                  </h3>
                </div>

                {/* Декоративный элемент справа */}
                <div className="hidden flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                  <div className="h-2 w-2 rounded-full bg-brand.red" />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

