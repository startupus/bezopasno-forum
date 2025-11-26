import { whatYouGet } from '../data/content'

export const ValueSection = () => (
  <section id="value" className="bg-brand.light px-6 py-20 md:px-10">
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Что вы получите</p>
        <h2 className="section-title text-brand.dark">Конкретные инструменты и поддержку после форума</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {whatYouGet.map((item) => (
          <article key={item} className="card-surface border-brand.dark/10 bg-white text-brand.dark shadow-brand.dark/5">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand.red/10 font-semibold text-brand.red">✓</span>
              <p className="text-base font-medium">{item}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

