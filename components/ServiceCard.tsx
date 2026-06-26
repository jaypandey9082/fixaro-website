"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, CheckCircle2, ChevronDown, Clock, IndianRupee, MessageCircle, ShieldCheck } from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import { globalPriceNote, type Service } from "@/lib/data";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl, serviceBookingMessage } from "@/lib/whatsapp";

const altTextBySlug: Record<string, string> = {
  "essential-ac-service": "Fixaro essential split AC service illustration",
  "deep-cleaning-service": "Fixaro AC deep cleaning service illustration",
  "water-leakage-service": "Fixaro water leakage AC service illustration",
  "dust-removal-service": "Fixaro dust removal AC service illustration",
  "ac-checkup-inspection": "Fixaro AC inspection service illustration",
  "power-issue-repair": "Fixaro AC power issue repair illustration",
  "stabilizer-fitting": "Fixaro stabilizer fitting service illustration",
  "less-no-cooling-repair": "Fixaro AC cooling repair service illustration",
  "complete-gas-charging": "Fixaro AC gas refilling service illustration",
  "gas-top-up": "Fixaro AC gas top-up service illustration",
  "split-ac-installation": "Fixaro split AC installation service illustration",
  "split-ac-uninstallation": "Fixaro split AC uninstallation service illustration",
};

type ServiceCardProps = {
  service: Service;
  isExpanded: boolean;
  onToggleDetails: () => void;
  index: number;
};

export function ServiceCard({ service, isExpanded, onToggleDetails, index }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const visibleIncludes = isExpanded ? service.includes : service.includes.slice(0, 2);
  const hiddenIncludeCount = service.includes.length - visibleIncludes.length;
  const bookingUrl = createWhatsAppUrl(serviceBookingMessage(service.name, service.price, service.warranty));

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : index * 0.04 }}
      className="service-card-tilt service-card-shine glass-card glow-border group flex h-full flex-col overflow-hidden rounded-[1.5rem]"
    >
      <div className="relative m-3 mb-0 overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_70%_26%,rgb(18_199_195_/_0.18),transparent_13rem),linear-gradient(145deg,#111820,#0B0F12)] p-3 sm:p-4">
        <div className="absolute right-4 top-4 rounded-full border border-aqua/20 bg-charcoal/60 px-3 py-1 text-xs font-bold text-aqua">
          {service.category}
        </div>
        <div className="relative flex min-h-32 items-center justify-center pt-4 sm:min-h-36">
          <Image
            src={service.image}
            alt={altTextBySlug[service.slug] || `Fixaro ${service.name} illustration`}
            width={420}
            height={315}
            className="h-32 w-full object-contain drop-shadow-[0_14px_26px_rgb(0_0_0_/_0.38)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03] sm:h-36"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-extrabold text-gold">
            {service.warranty}
          </span>
        </div>

        <h3 className="text-lg font-extrabold leading-tight text-white sm:text-xl">{service.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-silver">{service.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-aqua/15 bg-aqua/[0.08] p-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              <IndianRupee aria-hidden="true" size={13} />
              Price
            </div>
            <p className="mt-1.5 text-xl font-extrabold text-white">{service.price}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              <Clock aria-hidden="true" size={13} />
              Duration
            </div>
            <p className="mt-1.5 text-sm font-extrabold text-white">{service.duration}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Includes</p>
          <ul className="mt-2 grid gap-1.5">
            {visibleIncludes.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-5 text-silver">
                <CheckCircle2 aria-hidden="true" size={16} className="mt-1 shrink-0 text-aqua" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {hiddenIncludeCount > 0 ? (
            <p className="mt-2 text-sm font-bold text-aqua">+{hiddenIncludeCount} more</p>
          ) : null}
        </div>

        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              key="details"
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-3 border-t border-white/10 pt-5">
                <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-silver">
                  <ShieldCheck aria-hidden="true" size={17} className="mt-1 shrink-0 text-aqua" />
                  <span>
                    Warranty: <strong className="text-white">{service.warranty}</strong>
                  </span>
                </div>
                {service.importantNote ? (
                  <div className="flex gap-2 rounded-2xl border border-gold/20 bg-gold/10 p-3 text-sm leading-6 text-silver">
                    <AlertCircle aria-hidden="true" size={17} className="mt-1 shrink-0 text-gold" />
                    <span>{service.importantNote}</span>
                  </div>
                ) : null}
                {service.extraChargeNote ? (
                  <div className="flex gap-2 rounded-2xl border border-aqua/18 bg-aqua/[0.08] p-3 text-sm leading-6 text-silver">
                    <AlertCircle aria-hidden="true" size={17} className="mt-1 shrink-0 text-aqua" />
                    <span>{service.extraChargeNote}</span>
                  </div>
                ) : null}
                <p className="text-xs leading-5 text-muted">{globalPriceNote}</p>
                <PremiumButton href={bookingUrl} external className="w-full" aria-label={`Book ${service.name} on WhatsApp`}>
                  <MessageCircle aria-hidden="true" size={17} />
                  Book This Service
                </PremiumButton>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-auto grid gap-2.5 pt-5 sm:grid-cols-2">
          <PremiumButton href={bookingUrl} external aria-label={`Book ${service.name} on WhatsApp`}>
            <MessageCircle aria-hidden="true" size={17} />
            Book Now
          </PremiumButton>
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-aqua/45 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            aria-label={`View details for ${service.name}`}
          >
            View Details
          </Link>
          <button
            type="button"
            aria-expanded={isExpanded}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-bold text-silver transition duration-300 hover:-translate-y-0.5 hover:border-aqua/30 hover:bg-aqua/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:col-span-2"
            onClick={onToggleDetails}
          >
            {isExpanded ? "Hide Service Notes" : "Show Service Notes"}
            <ChevronDown
              aria-hidden="true"
              size={17}
              className={cn("transition duration-300", isExpanded && "rotate-180")}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
