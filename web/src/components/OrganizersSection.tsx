import { organizers } from '../data/content'

export const OrganizersSection = () => (
  <section id="organizers" className="bg-white px-6 py-20 md:px-10">
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Организаторы</p>
        <h2 className="font-display text-3xl font-semibold text-brand.dark md:text-4xl">Команды, которые задают стандарты безопасности</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {organizers.map((org) => (
          <article key={org.name} className="rounded-3xl border border-brand.red/20 bg-brand.light/40 p-6 text-brand.dark">
            <h3 className="font-display text-2xl font-semibold">{org.name}</h3>
            <p className="mt-3 text-base text-brand.dark/80">{org.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

