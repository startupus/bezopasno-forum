import { audienceResult, audienceSegments } from '../data/content'

export const AudienceSection = () => (
  <section id="audience" className="relative isolate overflow-hidden px-6 py-20 md:px-10">
    {/* Фоновое фото */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{
        backgroundImage: "url('/images/events/audience-bg.jpg')",
      }}
      aria-hidden
    />
    {/* Светлый оверлей */}
    <div className="absolute inset-0 bg-white/80" aria-hidden />
    
    <div className="relative mx-auto max-w-6xl space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Для кого форум</p>
        <h2 className="font-display text-3xl font-semibold text-brand.dark md:text-4xl">Профессионалам, которые отвечают за чистоту сделки</h2>
        <p className="text-base leading-relaxed text-brand.dark/80">{audienceResult}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {audienceSegments.map((segment) => (
          <article key={segment.title} className="card-surface bg-white text-brand.dark shadow-lg shadow-brand.dark/5">
            <h3 className="font-semibold text-lg">{segment.title}</h3>
            <p className="mt-2 text-sm text-brand.dark/70">{segment.detail}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

