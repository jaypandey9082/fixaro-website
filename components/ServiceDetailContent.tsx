import type { ReactNode } from "react";
import { CheckCircle2, ClipboardCheck, MessageCircle, Phone, ShieldCheck, XCircle, type LucideIcon } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PremiumButton } from "@/components/PremiumButton";
import { RelatedServices } from "@/components/RelatedServices";
import { businessInfo, globalPriceNote, serviceAreas, warrantyExclusion, type FAQItem, type Service } from "@/lib/data";
import { createWhatsAppUrl, serviceBookingMessage } from "@/lib/whatsapp";
import { getFaqJsonLd } from "@/lib/seo";

const bestForBySlug: Record<string, string> = {
  "essential-ac-service": "Best for regular maintenance, basic cleaning, cooling check, and seasonal service.",
  "deep-cleaning-service": "Best for dusty ACs, bad smell, weak airflow, and indoor unit cleaning.",
  "water-leakage-service": "Best for water dripping from indoor unit, drain blockage, and drain tray issues.",
  "dust-removal-service": "Best for dusty filters, low airflow, and quick cleaning.",
  "ac-checkup-inspection": "Best for unknown AC issues, noise, no cooling, water leakage, power issue, or repair estimate.",
  "power-issue-repair": "Best for AC not turning on, tripping, no display, or power connection issues.",
  "stabilizer-fitting": "Best for stabilizer installation, voltage safety setup, or AC stabilizer connection.",
  "less-no-cooling-repair": "Best for low cooling, no cooling, weak airflow, possible gas pressure issue or coil/airflow issue.",
  "complete-gas-charging": "Best for ACs requiring complete gas charging after pressure and leak indication checks.",
  "gas-top-up": "Best for eligible ACs needing partial gas top-up after pressure check.",
  "split-ac-installation": "Best for new split AC installation, relocation setup, or installation after shifting.",
  "split-ac-uninstallation": "Best for AC shifting, removal, relocation, or replacement preparation.",
};

const checksByCategory: Record<Service["category"], string[]> = {
  "AC Service": [
    "Filter and airflow condition",
    "Indoor unit cleaning requirement",
    "Cooling performance",
    "Drainage condition",
    "Final function check",
  ],
  "AC Repair": [
    "Customer-reported issue",
    "Power and connection condition",
    "Cooling/function symptoms",
    "Possible repair requirement",
    "Extra work estimate before repair",
  ],
  "Gas Refilling": [
    "Pressure condition",
    "Leak indication",
    "Cooling performance",
    "Gas filling requirement",
    "Leak-free condition before warranty",
  ],
  Installation: [
    "Indoor unit placement",
    "Outdoor unit placement support",
    "Drain pipe path",
    "Basic connection and testing",
    "Extra material requirement",
  ],
};

const notIncluded = [
  "Spare parts",
  "Copper pipe",
  "Outdoor stand",
  "Extra wire",
  "Drain pipe",
  "Gas leakage repair",
  "Core cutting",
  "Replacement parts",
  "Any extra material",
  "Wall repair or civil work",
  "Full product warranty",
];

export function ServiceDetailContent({ service, faqs }: { service: Service; faqs: FAQItem[] }) {
  const bookingUrl = createWhatsAppUrl(serviceBookingMessage(service.name, service.price, service.warranty));
  const serviceAreasPreview = serviceAreas.slice(0, 10);

  return (
    <>
      <JsonLd data={getFaqJsonLd(faqs)} />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_8%,rgb(18_199_195_/_0.1),transparent_28rem)]" />
        <div className="container-premium grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div className="space-y-12">
            <InfoSection title="What's Included" icon={CheckCircle2}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-silver">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-aqua" />
                    {item}
                  </li>
                ))}
              </ul>
            </InfoSection>

            <InfoSection title="Best For" icon={ClipboardCheck}>
              <p className="rounded-2xl border border-aqua/15 bg-aqua/[0.08] p-5 text-base leading-8 text-silver">
                {bestForBySlug[service.slug]}
              </p>
            </InfoSection>

            <InfoSection title="What Technician Checks" icon={ClipboardCheck}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {checksByCategory[service.category].map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-silver">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-aqua" />
                    {item}
                  </li>
                ))}
              </ul>
            </InfoSection>

            <InfoSection title="What's Not Included" icon={XCircle}>
              <div className="grid gap-3 sm:grid-cols-2">
                {notIncluded.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-silver">
                    <XCircle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-[#E8D7A8]">{globalPriceNote}</p>
            </InfoSection>

            <InfoSection title="Warranty Note" icon={ShieldCheck}>
              <div className="rounded-2xl border border-aqua/15 bg-aqua/[0.08] p-5 text-sm leading-7 text-silver">
                <p>
                  Warranty: <strong className="text-white">{service.warranty}</strong>
                </p>
                {service.category === "Gas Refilling" ? <p className="mt-2">Gas warranty applies only when the AC system is leak-free.</p> : null}
                {service.slug === "ac-checkup-inspection" ? (
                  <p className="mt-2">AC Check-up / Inspection has no warranty because it is a diagnosis visit.</p>
                ) : null}
                {service.category === "Installation" ? <p className="mt-2">Installation warranty covers workmanship only.</p> : null}
                <p className="mt-2">{warrantyExclusion}</p>
              </div>
            </InfoSection>

            <InfoSection title="How Booking Works" icon={MessageCircle}>
              <ol className="grid gap-3 sm:grid-cols-3">
                {["Share your area and AC type", "Fixaro confirms availability", "Technician checks and completes approved work"].map(
                  (step, index) => (
                    <li key={step} className="glass-panel rounded-2xl p-4 text-sm leading-6 text-silver">
                      <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-aqua/20 bg-aqua/10 text-sm font-extrabold text-aqua">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ),
                )}
              </ol>
            </InfoSection>

            <RelatedServices service={service} />

            <InfoSection title="Service Areas in Bangalore" icon={ClipboardCheck}>
              <div className="flex flex-wrap gap-2">
                {serviceAreasPreview.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-silver">
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">Availability depends on technician slots and exact location.</p>
            </InfoSection>

            <InfoSection title={`${service.name} FAQs`} icon={ClipboardCheck}>
              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <article key={faq.question} className="faq-card rounded-[1.35rem] p-5">
                    <h3 className="text-lg font-extrabold text-white">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-silver">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </InfoSection>
          </div>

          <aside className="glass-panel rounded-[1.75rem] p-5 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua">Book Fixaro</p>
            <h2 className="mt-3 text-2xl font-extrabold text-white">{service.name}</h2>
            <p className="mt-3 text-sm leading-6 text-silver">Starting from {service.price}. Fixaro will confirm slot availability before the visit.</p>
            <div className="mt-5 grid gap-3">
              <PremiumButton href={bookingUrl} external aria-label={`Book ${service.name} on WhatsApp`}>
                <MessageCircle aria-hidden="true" size={17} />
                Book on WhatsApp
              </PremiumButton>
              <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
                <Phone aria-hidden="true" size={17} />
                Call Now
              </PremiumButton>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function InfoSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-5 flex items-center gap-3 text-3xl font-extrabold text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-aqua/20 bg-aqua/10 text-aqua">
          <Icon aria-hidden="true" size={21} />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
