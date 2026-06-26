"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { acBrands } from "@/lib/data";
import { createWhatsAppUrl, brandSupportMessage } from "@/lib/whatsapp";

const brandSupportUrl = createWhatsAppUrl(brandSupportMessage());
const marqueeBrands = [...acBrands, ...acBrands];

export function BrandMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="brands" className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_22%,rgb(200_164_93_/_0.08),transparent_22rem),radial-gradient(circle_at_84%_24%,rgb(18_199_195_/_0.12),transparent_28rem)]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <SectionHeading
            eyebrow="AC Brands We Service"
            title="We Service All Major AC Brands"
            description="Fixaro supports split and window AC service, repair, gas refilling and installation for popular AC brands used across Bangalore homes and offices."
          />
          <p className="max-w-md rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-semibold leading-6 text-silver">
            Brand names are shown only to indicate service compatibility. Fixaro does not claim official partnership or authorization.
          </p>
        </motion.div>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgb(21_28_36_/_0.78),rgb(11_15_18_/_0.72))] p-4 shadow-[0_22px_70px_rgb(0_0_0_/_0.3)] backdrop-blur-xl">
          <div className="hidden overflow-hidden lg:block">
            <div className="brand-marquee flex w-max gap-3" style={{ animationPlayState: shouldReduceMotion ? "paused" : undefined }}>
              {marqueeBrands.map((brand, index) => (
                <BrandPill key={`${brand}-${index}`} brand={brand} />
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:hidden">
            {acBrands.map((brand) => (
              <BrandPill key={brand} brand={brand} />
            ))}
          </div>
        </div>

        <div className="glass-panel mt-8 flex flex-col gap-4 rounded-[1.75rem] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-aqua/20 bg-aqua/10 text-aqua">
              <Sparkles aria-hidden="true" size={22} />
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-white">Don&apos;t see your AC brand?</h3>
              <p className="mt-2 text-sm leading-6 text-silver">Ask Fixaro and share your AC type, brand and area before booking.</p>
            </div>
          </div>
          <PremiumButton href={brandSupportUrl} external className="shrink-0" aria-label="Ask Fixaro on WhatsApp about AC brand support">
            <MessageCircle aria-hidden="true" size={17} />
            Ask Fixaro on WhatsApp
          </PremiumButton>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted">Brand support depends on AC model and condition.</p>
      </div>
    </section>
  );
}

function BrandPill({ brand }: { brand: string }) {
  return (
    <span className="brand-pill inline-flex min-h-12 min-w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] px-5 text-sm font-extrabold text-silver">
      {brand}
    </span>
  );
}
