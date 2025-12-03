import { useState, useEffect } from 'react'
import { programBlocks } from '../data/content'
import { SpeakerCard } from './SpeakerCard'

export const ProgramSection = () => {
  const [visibleBlocks, setVisibleBlocks] = useState<Set<number>>(new Set())

  // Анимация появления блоков при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const blockId = parseInt(entry.target.getAttribute('data-block-id') || '0')
            setVisibleBlocks((prev) => new Set([...prev, blockId]))
          }
        })
      },
      { threshold: 0.2 }
    )

    const blocks = document.querySelectorAll('[data-block-id]')
    blocks.forEach((block) => observer.observe(block))

    return () => {
      blocks.forEach((block) => observer.unobserve(block))
    }
  }, [])

  return (
    <section id="program" className="relative overflow-hidden bg-brand.dark px-6 py-20 text-white md:px-10">
      {/* Анимированный фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand.red/5 via-transparent to-brand.red/10 animate-gradient-loop" aria-hidden />

      <div className="relative mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Программа форума</p>
          <h2 className="section-title animate-pulse-slow">Три смысловых потока в течение одного дня</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Живое событие для энергии, общения и профессионального роста
          </p>
        </div>

        <div className="space-y-10">
          {programBlocks.map((block, blockIndex) => {
            const isVisible = visibleBlocks.has(blockIndex)
            return (
              <article
                key={block.id}
                data-block-id={blockIndex}
                className={`rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-700 md:p-10 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 shadow-lg shadow-brand.red/20'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-4 md:max-w-3xl">
                    <div className="flex items-start gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand.red/20 text-2xl font-bold text-brand.red flex-shrink-0">
                        {blockIndex + 1}
                      </span>
                      <h3 className="font-display text-3xl">{block.title}</h3>
                    </div>
                    <p className="text-lg text-white/80">{block.summary}</p>
                    <ul className="list-disc space-y-2 pl-5 text-white/80">
                      {block.bullets.map((item, idx) => (
                        <li
                          key={item}
                          className={`transition-all duration-500 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                          }`}
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-brand.red/30 bg-brand.red/10 p-4 text-sm text-white/80 animate-pulse-slow">
                    <p className="font-semibold text-white">{block.focus}</p>
                  </div>
                </div>

                {block.speakers.length > 0 ? (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {block.speakers.map((speaker, speakerIndex) => (
                      <div
                        key={`${block.id}-${speaker.name}`}
                        className={`transition-all duration-700 ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${(speakerIndex + 1) * 150}ms` }}
                      >
                        <SpeakerCard speaker={speaker} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`mt-8 rounded-2xl border border-brand.red/30 bg-brand.red/10 p-6 backdrop-blur-xl transition-all duration-700 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <h4 className="mb-3 font-display text-xl font-semibold text-white">Нетворкинг-сессия</h4>
                    <p className="mb-4 text-base text-white/90">
                      Живой обмен контактами и решение сложных кейсов в профессиональном кругу.
                      Специально организованные сессии для встреч «юрист–риэлтор–банк–страховщик».
                    </p>
                    <p className="text-sm text-white/70">
                      Этот блок строится вокруг творческих выступлений, travel-историй и живого нетворкинга.
                    </p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
