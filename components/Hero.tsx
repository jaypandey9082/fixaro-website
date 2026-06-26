import { Clock, IndianRupee, MessageCircle, ShieldCheck, Snowflake, Wind, Wrench } from "lucide-react";
import { HeroAC3D } from "@/components/HeroAC3D";
import { PremiumButton } from "@/components/PremiumButton";
import { businessInfo } from "@/lib/data";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const trustBadges = [
  { label: "Same-Day Slots", icon: Clock },
  { label: "Warranty Up to 60 Days", icon: ShieldCheck },
  { label: "Transparent Pricing", icon: IndianRupee },
  { label: "Trained Technicians", icon: Wrench },
  { label: "Split & Window AC Support", icon: Snowflake },
];

const whatsappUrl = createWhatsAppUrl("Hi Fixaro, I want to book an AC service. Please share available slots.");

export function Hero() {
  return (
    <section
      id="home"
      className="premium-grid-bg hero-spotlight noise-overlay relative isolate overflow-hidden border-b border-white/10 safe-bottom-padding pt-28 sm:pt-32 lg:min-h-[760px] lg:pb-24"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_34%,rgb(18_199_195_/_0.22),transparent_28rem),radial-gradient(circle_at_20%_24%,rgb(200_164_93_/_0.12),transparent_24rem),linear-gradient(145deg,#0B0F12_0%,#111820_48%,#080B0E_100%)]" />
      <div className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-white/7 blur-3xl animate-float-slow" />
      <div className="absolute right-[12%] top-16 -z-10 h-96 w-96 rounded-full bg-bright-teal/12 blur-3xl animate-pulse-glow" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-36 bg-gradient-to-b from-transparent to-charcoal" />

      <div className="container-premium relative z-10 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-3xl animate-slide-up">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.24em] text-aqua">
            Fixaro AC Service Company
          </p>
          <h1 className="text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            Premium AC Service & Repair at Your Doorstep
          </h1>
          <p className="mt-5 text-2xl font-extrabold leading-tight text-gradient-premium sm:text-3xl">
            Clear Price. Clean Work. Written Warranty.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-silver sm:text-lg">
            Book AC service, deep cleaning, repair, gas refilling and installation in Bangalore with trained technicians and transparent service charges.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <PremiumButton href={whatsappUrl} external aria-label="Book Fixaro AC service on WhatsApp">
              <MessageCircle aria-hidden="true" size={18} />
              Book on WhatsApp
            </PremiumButton>
            <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
              <Wind aria-hidden="true" size={18} />
              Call Now
            </PremiumButton>
          </div>

          <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-muted">
            Spare parts and extra materials are charged only after customer approval.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold text-silver shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06)] backdrop-blur sm:px-3.5"
                >
                  <Icon aria-hidden="true" size={15} className="text-aqua" />
                  {badge.label}
                </div>
              );
            })}
          </div>
        </div>

        <HeroAC3D className="lg:translate-x-4" />
      </div>
    </section>
  );
}
