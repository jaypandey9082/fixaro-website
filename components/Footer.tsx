import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import { businessInfo, serviceAreas, warrantyExclusion } from "@/lib/data";
import { areaAvailabilityMessage, createWhatsAppUrl } from "@/lib/whatsapp";

const bookingUrl = createWhatsAppUrl("Hi Fixaro, I want to book an AC service. Please share available slots.");
const areaUrl = createWhatsAppUrl(areaAvailabilityMessage());

const serviceLinks = [
  { label: "AC Service", href: "/ac-service-bangalore" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning-service" },
  { label: "AC Repair", href: "/ac-repair-bangalore" },
  { label: "Gas Refilling", href: "/ac-gas-refilling-bangalore" },
  { label: "Split AC Installation", href: "/ac-installation-bangalore" },
  { label: "AC Uninstallation", href: "/services/split-ac-uninstallation" },
] as const;

const quickLinks = [
  { label: "Pricing", href: "/#pricing" },
  { label: "Warranty", href: "/#warranty" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Service Areas", href: "/#service-areas" },
  { label: "Book Service", href: "/#contact" },
  { label: "FAQs", href: "/#faq" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const previewAreas = serviceAreas.slice(0, 6);

  return (
    <footer className="footer-glow footer-grid-bg mobile-cta-safe border-t border-aqua/15 bg-[#080B0E] pb-28 pt-12 text-silver md:pb-10 lg:pt-16">
      <div className="container-premium">
        <div className="glass-panel overflow-hidden rounded-[1.75rem] p-5 sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-aqua">
                <Wrench aria-hidden="true" size={15} />
                Fixaro Support
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">Ready for cleaner cooling?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-silver sm:text-base">
                Book Fixaro AC service, repair, gas refilling or installation in Bangalore with clear pricing and written
                warranty terms.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[23rem]">
              <PremiumButton href={bookingUrl} external className="w-full" aria-label="Book Fixaro on WhatsApp">
                <MessageCircle aria-hidden="true" size={17} />
                Book on WhatsApp
              </PremiumButton>
              <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" className="w-full" aria-label="Call Fixaro now">
                <Phone aria-hidden="true" size={17} />
                Call Now
              </PremiumButton>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.85fr_0.85fr_1fr]">
          <section>
            <Image
              src="/images/fixaro-logo.png"
              alt="Fixaro AC Service Company logo"
              width={1234}
              height={812}
              className="h-24 w-auto object-contain drop-shadow-[0_0_18px_rgb(18_199_195_/_0.18)]"
            />
            <h3 className="mt-5 text-lg font-extrabold text-white">{businessInfo.fullName}</h3>
            <p className="mt-3 max-w-sm text-sm leading-7">
              Premium AC service, repair, gas refilling and installation in Bangalore with clear pricing, clean work and
              written warranty terms.
            </p>
            <div className="mt-5 grid gap-2 text-sm font-semibold">
              <a href={businessInfo.mainPhoneHref} className="inline-flex items-center gap-2 transition hover:text-aqua">
                <Phone aria-hidden="true" size={15} />
                Main: {businessInfo.mainPhoneDisplay}
              </a>
              <a href={businessInfo.secondPhoneHref} className="inline-flex items-center gap-2 transition hover:text-aqua">
                <Phone aria-hidden="true" size={15} />
                Second: {businessInfo.secondPhoneDisplay}
              </a>
            </div>
          </section>

          <FooterNav title="Services" links={serviceLinks} icon={Wrench} />
          <FooterNav title="Quick Links" links={quickLinks} icon={ChevronRight} />

          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
              <MapPin aria-hidden="true" size={16} className="text-aqua" />
              Bangalore Areas
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {previewAreas.map((area) => (
                <li key={area}>
                  <Link href="/#service-areas" className="transition hover:text-aqua">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={areaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-aqua/20 bg-aqua/10 px-4 py-3 text-sm font-bold text-aqua transition hover:border-aqua/45 hover:bg-aqua/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
              aria-label="Check Fixaro area availability on WhatsApp"
            >
              Check Area Availability
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </section>
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 text-sm text-muted lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-2">
            <p>© {year} {businessInfo.fullName}. All rights reserved.</p>
            <p className="flex gap-2 leading-6 text-[#E8D7A8]">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {warrantyExclusion}
            </p>
            <p>Brand names are used only to indicate service compatibility.</p>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-aqua/40 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
            aria-label="Back to top"
          >
            <ArrowUp aria-hidden="true" size={16} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({
  title,
  links,
  icon: Icon,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  icon: LucideIcon;
}) {
  return (
    <nav aria-label={title}>
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
        <Icon aria-hidden="true" size={16} className="text-aqua" />
        {title}
      </h3>
      <ul className="mt-5 grid gap-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="group inline-flex items-center gap-2 transition hover:text-aqua">
              <ChevronRight aria-hidden="true" size={14} className="text-aqua/70 transition group-hover:translate-x-0.5" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
