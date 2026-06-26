import Image from "next/image";
import { Clock, IndianRupee, MessageCircle, Phone, ShieldCheck, Tag } from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import type { Service } from "@/lib/data";
import { businessInfo } from "@/lib/data";
import { createWhatsAppUrl, serviceBookingMessage } from "@/lib/whatsapp";

export function ServiceDetailHero({ service }: { service: Service }) {
  const bookingUrl = createWhatsAppUrl(serviceBookingMessage(service.name, service.price, service.warranty));
  const warrantyBadge = service.warranty === "No Warranty" ? "Professional Diagnosis" : "Written Warranty";
  const stats = [
    { label: "Starting Price", value: service.price, icon: IndianRupee },
    { label: "Warranty", value: service.warranty, icon: ShieldCheck },
    { label: "Duration", value: service.duration, icon: Clock },
    { label: "Category", value: service.category, icon: Tag },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-8 sm:pb-20 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_16%,rgb(18_199_195_/_0.18),transparent_30rem),radial-gradient(circle_at_80%_18%,rgb(200_164_93_/_0.1),transparent_25rem)]" />
      <div className="container-premium grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-aqua">Fixaro Service</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {service.name} in Bangalore
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-silver sm:text-lg">{service.description}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["Clear Price", "Clean Work", warrantyBadge].map((badge) => (
              <span key={badge} className="rounded-full border border-aqua/20 bg-aqua/10 px-4 py-2 text-sm font-bold text-aqua">
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <PremiumButton href={bookingUrl} external aria-label={`Book ${service.name} on WhatsApp`}>
              <MessageCircle aria-hidden="true" size={18} />
              Book on WhatsApp
            </PremiumButton>
            <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
              <Phone aria-hidden="true" size={18} />
              Call Now
            </PremiumButton>
          </div>
        </div>

        <div className="glass-card glow-border rounded-[2rem] p-4 sm:p-5">
          <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_68%_18%,rgb(18_199_195_/_0.25),transparent_17rem),linear-gradient(145deg,#111820,#0B0F12)] p-5">
            <Image
              src={service.image}
              alt={`Fixaro ${service.name} in Bangalore`}
              width={760}
              height={520}
              priority
              className="h-72 w-full object-contain drop-shadow-[0_22px_42px_rgb(0_0_0_/_0.45)] sm:h-80"
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    <Icon aria-hidden="true" size={14} className="text-aqua" />
                    {stat.label}
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
