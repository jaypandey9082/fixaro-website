import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import { services, type Service } from "@/lib/data";
import { createWhatsAppUrl, serviceBookingMessage } from "@/lib/whatsapp";

function getRelatedServices(service: Service): Service[] {
  const sameCategory = services.filter((item) => item.category === service.category && item.slug !== service.slug);
  const complementary = services.filter((item) => item.slug !== service.slug && !sameCategory.some((related) => related.slug === item.slug));

  if (service.slug === "less-no-cooling-repair") {
    return ["ac-checkup-inspection", "complete-gas-charging", "gas-top-up"]
      .map((slug) => services.find((item) => item.slug === slug))
      .filter(Boolean) as Service[];
  }

  if (service.slug === "complete-gas-charging") {
    return ["ac-checkup-inspection", "less-no-cooling-repair", "gas-top-up"]
      .map((slug) => services.find((item) => item.slug === slug))
      .filter(Boolean) as Service[];
  }

  if (service.slug === "split-ac-installation") {
    return ["split-ac-uninstallation", "stabilizer-fitting", "essential-ac-service"]
      .map((slug) => services.find((item) => item.slug === slug))
      .filter(Boolean) as Service[];
  }

  return [...sameCategory, ...complementary].slice(0, 4);
}

export function RelatedServices({ service }: { service: Service }) {
  const relatedServices = getRelatedServices(service);

  return (
    <section>
      <h2 className="text-3xl font-extrabold text-white">Related Services</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {relatedServices.map((related) => {
          const bookingUrl = createWhatsAppUrl(serviceBookingMessage(related.name, related.price, related.warranty));

          return (
            <article key={related.slug} className="glass-panel rounded-[1.5rem] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua">{related.category}</p>
              <h3 className="mt-3 text-xl font-extrabold leading-tight text-white">{related.name}</h3>
              <p className="mt-3 text-2xl font-extrabold text-white">{related.price}</p>
              <p className="mt-3 flex gap-2 text-sm leading-6 text-silver">
                <ShieldCheck aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-aqua" />
                {related.warranty}
              </p>
              <div className="mt-5 grid gap-3">
                <Link
                  href={`/services/${related.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-aqua/40 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                >
                  View details
                </Link>
                <PremiumButton href={bookingUrl} external className="min-h-11 px-4" aria-label={`Book ${related.name} on WhatsApp`}>
                  <MessageCircle aria-hidden="true" size={16} />
                  Book
                </PremiumButton>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
