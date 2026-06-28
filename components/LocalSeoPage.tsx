import Link from "next/link";
import { CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PremiumButton } from "@/components/PremiumButton";
import { businessInfo, featuredServiceAreas, globalPriceNote, serviceAreas, services } from "@/lib/data";
import type { FAQItem } from "@/lib/data";
import { createWhatsAppUrl, serviceBookingMessage } from "@/lib/whatsapp";
import type { LocalSeoPageConfig } from "@/lib/seo";
import { getFaqJsonLd } from "@/lib/seo";

export function LocalSeoPage({ config, faqs }: { config: LocalSeoPageConfig; faqs: FAQItem[] }) {
  const primaryServices = config.primaryServiceNames
    .map((name) => services.find((service) => service.name === name))
    .filter(Boolean)
    .slice(0, 4);
  const whatsappUrl = createWhatsAppUrl(config.whatsappMessage);
  const featuredAreaSet = new Set<string>(featuredServiceAreas);
  const moreServiceAreas = serviceAreas.filter((area) => !featuredAreaSet.has(area));

  return (
    <>
      <JsonLd data={getFaqJsonLd(faqs)} />
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-8 sm:pb-20 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgb(18_199_195_/_0.18),transparent_30rem),radial-gradient(circle_at_86%_20%,rgb(200_164_93_/_0.1),transparent_25rem)]" />
        <div className="container-premium">
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-aqua">Fixaro Bangalore Service</p>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">{config.h1}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-silver sm:text-lg">{config.subheading}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Clear pricing",
                  "Direct WhatsApp booking",
                  "Written warranty terms",
                  "Bangalore service areas",
                  "Same-day slots subject to availability",
                ].map((badge) => (
                  <span key={badge} className="rounded-full border border-aqua/20 bg-aqua/10 px-4 py-2 text-sm font-bold text-aqua">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
                <PremiumButton href={whatsappUrl} external aria-label={config.mainCTA}>
                  <MessageCircle aria-hidden="true" size={18} />
                  {config.mainCTA}
                </PremiumButton>
                <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
                  <Phone aria-hidden="true" size={18} />
                  Call Now
                </PremiumButton>
              </div>
            </div>

            <div className="glass-card glow-border rounded-[2rem] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Local service focus</p>
              <h2 className="mt-3 text-2xl font-extrabold text-white">{config.serviceType} across Bangalore</h2>
              <p className="mt-4 text-sm leading-7 text-silver">{config.localCopy}</p>
              <div className="mt-5 grid gap-3">
                {config.benefits.slice(0, 3).map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-silver">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-aqua" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgb(18_199_195_/_0.09),transparent_28rem)]" />
        <div className="container-premium space-y-14 py-16 sm:py-20">
          <section>
            <h2 className="text-3xl font-extrabold text-white">Primary Fixaro Services</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {primaryServices.map((service) => {
                if (!service) return null;
                const bookingUrl = createWhatsAppUrl(serviceBookingMessage(service.name, service.price, service.warranty));
                return (
                  <article key={service.slug} className="glass-panel rounded-[1.5rem] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua">{service.category}</p>
                    <h3 className="mt-3 text-xl font-extrabold leading-tight text-white">{service.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-silver">{service.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-aqua/20 bg-aqua/10 px-3 py-1 text-sm font-bold text-aqua">
                        {service.price}
                      </span>
                      <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-sm font-bold text-[#E8D7A8]">
                        {service.warranty}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-aqua/40 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                      >
                        View details
                      </Link>
                      <PremiumButton href={bookingUrl} external className="min-h-11 px-4" aria-label={`Book ${service.name} on WhatsApp`}>
                        <MessageCircle aria-hidden="true" size={16} />
                        Book
                      </PremiumButton>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-white">Why Book Fixaro</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {config.benefits.map((benefit) => (
                <div key={benefit} className="glass-panel rounded-[1.5rem] p-5">
                  <Sparkles aria-hidden="true" className="h-6 w-6 text-aqua" />
                  <h3 className="mt-4 text-lg font-extrabold text-white">{benefit}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-white">Transparent Pricing</h2>
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-aqua/18 bg-[linear-gradient(145deg,rgb(21_28_36_/_0.84),rgb(11_15_18_/_0.72))]">
              <div className="hidden lg:block">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
                    <tr>
                      <th className="px-5 py-4">Service</th>
                      <th className="px-5 py-4">Starting Price</th>
                      <th className="px-5 py-4">Warranty</th>
                      <th className="px-5 py-4 text-right">Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {primaryServices.map((service) =>
                      service ? (
                        <tr key={service.slug} className="border-b border-white/8 last:border-b-0">
                          <th className="px-5 py-4 text-white">
                            <Link href={`/services/${service.slug}`} className="hover:text-aqua">
                              {service.name}
                            </Link>
                          </th>
                          <td className="px-5 py-4 font-extrabold text-white">{service.price}</td>
                          <td className="px-5 py-4 text-silver">{service.warranty}</td>
                          <td className="px-5 py-4 text-right">
                            <PremiumButton
                              href={createWhatsAppUrl(serviceBookingMessage(service.name, service.price, service.warranty))}
                              external
                              className="min-h-10 px-4 py-2"
                              aria-label={`Book ${service.name} on WhatsApp`}
                            >
                              Book
                            </PremiumButton>
                          </td>
                        </tr>
                      ) : null,
                    )}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-3 p-3 lg:hidden">
                {primaryServices.map((service) =>
                  service ? (
                    <article key={service.slug} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                      <Link href={`/services/${service.slug}`} className="text-lg font-extrabold text-white hover:text-aqua">
                        {service.name}
                      </Link>
                      <p className="mt-2 text-2xl font-extrabold text-white">{service.price}</p>
                      <p className="mt-2 text-sm text-silver">{service.warranty}</p>
                    </article>
                  ) : null,
                )}
              </div>
            </div>
            <p className="mt-4 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-[#E8D7A8]">{globalPriceNote}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            {["Choose service and share area", "Fixaro confirms slot availability", "Technician checks and completes approved work"].map(
              (step, index) => (
                <article key={step} className="glass-panel rounded-[1.5rem] p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-aqua/20 bg-aqua/10 font-extrabold text-aqua">
                    {index + 1}
                  </span>
                  <h2 className="mt-4 text-xl font-extrabold text-white">{step}</h2>
                </article>
              ),
            )}
          </section>

          <section className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex gap-4">
              <ShieldCheck aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h2 className="text-2xl font-extrabold text-white">Warranty and Extra Charge Note</h2>
                <p className="mt-3 text-sm leading-7 text-silver">
                  Warranty covers service workmanship only. Spare parts, gas leakage repair, physical damage and customer-side
                  changes are not covered unless separately mentioned.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-white">Bangalore Service Areas</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-silver">
              Fixaro covers many Bangalore localities. Start with these commonly served areas, or open the full area list below.
            </p>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredServiceAreas.map((area) => (
                <span key={area} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-silver">
                  {area}
                </span>
              ))}
            </div>
            <details className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <summary className="cursor-pointer text-sm font-extrabold text-aqua marker:text-gold">
                More Bangalore areas
              </summary>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {moreServiceAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-silver">
                    {area}
                  </span>
                ))}
              </div>
            </details>
            <p className="mt-4 flex gap-2 text-sm leading-6 text-muted">
              <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-aqua" />
              Availability depends on technician slots and exact location.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-white">{config.h1} FAQs</h2>
            <div className="mt-6 grid gap-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="faq-card rounded-[1.35rem] p-5">
                  <h3 className="text-lg font-extrabold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-silver">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-card glow-border rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="text-3xl font-extrabold text-white">Book {config.serviceType} with Fixaro</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-silver">
              Send your area, AC type and preferred slot. Fixaro will confirm availability before the visit.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
              <PremiumButton href={whatsappUrl} external aria-label={config.mainCTA}>
                <MessageCircle aria-hidden="true" size={17} />
                {config.mainCTA}
              </PremiumButton>
              <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
                <Phone aria-hidden="true" size={17} />
                Call Now
              </PremiumButton>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
