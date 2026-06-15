import type { Metadata } from 'next';

const relatedServices = [
  {
    id: 'champagne-tower',
    name: 'Горка из шампанского',
    cost: 'Услуга 10000₽',
    includes: ['Горка на 35 и 56 бокалов'],
  },
  {
    id: 'chocolate-fountain',
    name: 'Шоколадный фонтан',
    cost: 'Услуга 8000₽',
    includes: ['Доставка', 'установка', '2 кг шоколада', 'шпажки', 'салфетки', 'тарелочки'],
  },
];

export const metadata: Metadata = {
  title: 'Сопутствующие услуги — Tatti Shef',
  description: 'Горка из шампанского и шоколадный фонтан для мероприятий от Tatti Shef.',
  keywords: 'сопутствующие услуги, горка из шампанского, шоколадный фонтан, Tatti Shef',
};

export default function RelatedServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151515] px-4 pb-16 pt-28 text-white">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/video/champagne.MP4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-[#151515]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl flex-col justify-center">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] md:text-6xl">
            Сопутствующие услуги
          </h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {relatedServices.map((service) => (
            <article
              key={service.id}
              className="rounded-lg border border-white/15 bg-[#151515]/80 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            >
              <div className="mb-5 flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
                <p className="text-lg font-bold text-[#f0b36d]">{service.cost}</p>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
                  Входит в услугу:
                </h3>
                <ul className="space-y-2 text-base leading-7 text-white/90">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0b36d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
