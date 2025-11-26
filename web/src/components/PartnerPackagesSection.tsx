import { partnerPackages } from '../data/content'
import { CTAButton } from './CTAButton'

export const PartnerPackagesSection = () => (
  <section id="partner-packages" className="bg-brand.dark px-6 py-20 text-white md:px-10">
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand.red">Пакеты для партнёров и спонсоров</p>
          <h2 className="section-title">Варианты партнёрства</h2>
          <p className="text-white/70">
            Подробный КП готовим по запросу: фиксируем задачи бренда, подбираем блок программы и набор активностей.
          </p>
        </div>
        <CTAButton href="mailto:partners@bezopasnosdelka.ru" label="Стать партнёром форума" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {partnerPackages.map((pkg) => (
          <article key={pkg.name} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase text-brand.red">{pkg.target}</p>
            <h3 className="mt-1 font-display text-2xl text-white">{pkg.name}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              {pkg.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
)

