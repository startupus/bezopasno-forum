import { partners } from '../data/content'

const tierLabels: Record<'general' | 'official' | 'info', string> = {
  general: 'Генеральные партнёры',
  official: 'Официальные партнёры',
  info: 'Инфопартнёры',
}

export const PartnersSection = () => (
  <section id="partners" className="bg-white px-6 py-20 md:px-10">
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Партнёры форума</p>
        <h2 className="section-title text-brand.dark">Вместе закрываем риски и создаём доверие</h2>
      </div>

      <div className="grid gap-8">
        {Object.entries(
          partners.reduce<Record<string, typeof partners>>((acc, partner) => {
            acc[partner.tier] = acc[partner.tier] ? [...acc[partner.tier], partner] : [partner]
            return acc
          }, {}),
        ).map(([tier, items]) => (
          <div key={tier} className="space-y-4">
            <h3 className="font-display text-2xl text-brand.dark">{tierLabels[tier as keyof typeof tierLabels]}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {items.map((partner) => (
                <article key={partner.name} className="rounded-2xl border border-brand.dark/10 bg-brand.light/40 p-4 text-brand.dark">
                  <p className="font-semibold">{partner.name}</p>
                  <p className="text-sm text-brand.dark/70">{partner.description}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

