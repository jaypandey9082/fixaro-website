"use client";

import { MapPin, MessageCircle, Phone, Search, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { businessInfo, featuredServiceAreas, serviceAreaAliases, serviceAreas } from "@/lib/data";
import { areaAvailabilityMessage, createWhatsAppUrl } from "@/lib/whatsapp";

const generalAreaUrl = createWhatsAppUrl(areaAvailabilityMessage());

export function ServiceAreas() {
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const visibleAreas = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return featuredServiceAreas;
    }
    return serviceAreas.filter((area) => {
      const aliases = serviceAreaAliases[area] || [];
      return [area, ...aliases].some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [query]);

  return (
    <section id="service-areas" className="area-map-grid relative overflow-hidden border-b border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_22%,rgb(18_199_195_/_0.13),transparent_29rem),radial-gradient(circle_at_80%_30%,rgb(200_164_93_/_0.09),transparent_24rem),linear-gradient(180deg,rgb(11_15_18_/_0.44),rgb(17_24_32_/_0.46))]" />
      <div className="location-pulse left-[12%] top-[18%]" />
      <div className="location-pulse right-[16%] top-[32%] [animation-delay:700ms]" />
      <div className="location-pulse bottom-[18%] left-[50%] [animation-delay:1400ms]" />

      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48 }}
          className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end"
        >
          <SectionHeading
            eyebrow="Bangalore Service Areas"
            title="AC Service Across Bangalore"
            description="Book Fixaro AC service in major Bangalore localities. Availability depends on technician slots and your exact location."
          />

          <div className="rounded-[1.5rem] border border-aqua/18 bg-aqua/[0.07] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-aqua">Bangalore</p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-silver">
              <li className="flex gap-2"><Sparkles aria-hidden="true" size={16} className="mt-1 shrink-0 text-gold" /> Same-day slots subject to availability</li>
              <li className="flex gap-2"><MessageCircle aria-hidden="true" size={16} className="mt-1 shrink-0 text-aqua" /> Direct WhatsApp booking</li>
              <li>Main number: <a href={businessInfo.mainPhoneHref} className="font-extrabold text-white">{businessInfo.mainPhoneDisplay}</a></li>
              <li>Second number: <a href={businessInfo.secondPhoneHref} className="font-extrabold text-white">{businessInfo.secondPhoneDisplay}</a></li>
            </ul>
          </div>
        </motion.div>

        <div className="glass-panel mt-8 rounded-[1.5rem] p-5">
          <label className="text-sm font-extrabold text-white" htmlFor="area-search">
            Search your area
          </label>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-charcoal/60 px-4 py-3 focus-within:border-aqua/35 focus-within:ring-2 focus-within:ring-aqua/20">
            <Search aria-hidden="true" size={18} className="shrink-0 text-aqua" />
            <input
              id="area-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your area"
              className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-muted"
            />
          </div>

          {visibleAreas.length > 0 ? (
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleAreas.map((area, index) => {
                const areaUrl = createWhatsAppUrl(areaAvailabilityMessage(area));
                return (
                  <motion.a
                    key={area}
                    href={areaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.018 }}
                    className="area-pill flex min-h-12 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 text-sm font-extrabold text-silver transition duration-300 hover:-translate-y-0.5 hover:border-aqua/35 hover:bg-aqua/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                    aria-label={`Check AC service availability in ${area} on WhatsApp`}
                  >
                    <MapPin aria-hidden="true" size={17} className="shrink-0 text-aqua" />
                    {area}
                  </motion.a>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/10 p-5">
              <h3 className="text-lg font-extrabold text-white">Area not listed? Ask Fixaro on WhatsApp.</h3>
              <p className="mt-2 text-sm leading-6 text-silver">Share your location and service need so Fixaro can check service availability.</p>
              <PremiumButton href={generalAreaUrl} external className="mt-4" aria-label="Ask Fixaro about area service availability on WhatsApp">
                <MessageCircle aria-hidden="true" size={17} />
                Check on WhatsApp
              </PremiumButton>
            </div>
          )}
        </div>

        <div className="glass-panel mt-6 flex flex-col gap-4 rounded-[1.5rem] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-white">Area not listed?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">
              Message Fixaro with your location and we&apos;ll confirm service availability. Availability is subject to technician slots.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PremiumButton href={generalAreaUrl} external aria-label="Check Fixaro service availability on WhatsApp">
              <MessageCircle aria-hidden="true" size={17} />
              Check on WhatsApp
            </PremiumButton>
            <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
              <Phone aria-hidden="true" size={17} />
              Call Now
            </PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
