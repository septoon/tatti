import type { Metadata } from 'next';

type RelatedService = {
  id: number;
  name: string;
  price: number;
  cost?: string;
  includes?: string[];
  note?: string;
  image?: string;
};

type ServicePackagesResponse = {
  extras?: RelatedService[];
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.tatti-shef.ru').replace(/\/$/, '');

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Сопутствующие услуги — Tatti Shef',
  description: 'Горка из шампанского и шоколадный фонтан для мероприятий от Tatti Shef.',
  keywords: 'сопутствующие услуги, горка из шампанского, шоколадный фонтан, Tatti Shef',
};

async function getRelatedServices(): Promise<RelatedService[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/servicePackages.json`, {
      next: { revalidate },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as ServicePackagesResponse;
    return Array.isArray(data.extras) ? data.extras : [];
  } catch {
    return [];
  }
}

function getServiceIncludes(service: RelatedService): string[] {
  if (Array.isArray(service.includes) && service.includes.length > 0) return service.includes;
  if (service.note) return [service.note];
  return [];
}

export default async function RelatedServicesPage() {
  const relatedServices = await getRelatedServices();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151515] text-white">
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

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 pt-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] md:text-6xl">
            Сопутствующие услуги
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] md:text-xl">
            Эффектные детали для праздника: сначала атмосфера, затем выбирайте услугу.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {relatedServices.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-lg border border-white/15 bg-[#151515]/85 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            >
              {service.image ? (
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/30">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="p-5">
                <div className="mb-5 flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
                  <p className="text-lg font-bold text-[#f0b36d]">{service.cost || `Услуга ${service.price}₽`}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
                    Входит в услугу:
                  </h3>
                  <ul className="space-y-2 text-base leading-7 text-white/90">
                    {getServiceIncludes(service).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0b36d]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
