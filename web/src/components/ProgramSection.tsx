import { programBlocks } from '../data/content'
import { SpeakerCard } from './SpeakerCard'

export const ProgramSection = () => (
  <section id="program" className="bg-brand.dark px-6 py-20 text-white md:px-10">
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Программа форума</p>
        <h2 className="section-title">Три смысловых потока в течение одного дня</h2>
      </div>

      <div className="space-y-10">
        {programBlocks.map((block) => (
          <article key={block.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4 md:max-w-3xl">
                <h3 className="font-display text-3xl">{block.title}</h3>
                <p className="text-lg text-white/80">{block.summary}</p>
                <ul className="list-disc space-y-2 pl-5 text-white/80">
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-brand.red/30 bg-brand.red/10 p-4 text-sm text-white/80">
                <p className="font-semibold text-white">{block.focus}</p>
              </div>
            </div>

            {block.speakers.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {block.speakers.map((speaker) => (
                  <SpeakerCard speaker={speaker} key={`${block.id}-${speaker.name}`} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-brand.red/30 bg-brand.red/10 p-6 backdrop-blur-xl">
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
        ))}
      </div>
    </div>
  </section>
)

