"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import { businessInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Warranty", href: "#warranty" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
];

const whatsappUrl = createWhatsAppUrl("Hi Fixaro, I want to book an AC service. Please share available slots.");

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const homeHref = isHomePage ? "#home" : "/";
  const resolvedNavLinks = navLinks.map((link) => {
    if (link.label === "Home") {
      return { ...link, href: homeHref };
    }

    return { ...link, href: isHomePage ? link.href : `/${link.href}` };
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] border-b transition-all duration-300",
        isScrolled
          ? "border-aqua/20 bg-charcoal/86 shadow-[0_12px_48px_rgb(0_0_0_/_0.34),0_1px_0_rgb(18_199_195_/_0.18)] backdrop-blur-2xl"
          : "border-white/8 bg-charcoal/34 backdrop-blur-md",
      )}
    >
      <div className="container-premium flex h-20 items-center justify-between gap-4">
        <a href={homeHref} className="group flex min-w-0 items-center gap-3" aria-label="Fixaro home" onClick={closeMenu}>
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-aqua/20 bg-aqua/10 shadow-[0_0_28px_rgb(18_199_195_/_0.14)]">
            <Image
              src="/images/fixaro-logo-mark.png"
              alt="Fixaro logo mark"
              width={500}
              height={460}
              priority
              className="h-12 w-12 scale-125 object-contain drop-shadow-[0_0_10px_rgb(18_199_195_/_0.28)]"
            />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block text-xl font-extrabold tracking-normal text-white transition group-hover:text-aqua">
              {businessInfo.name}
            </span>
            <span className="mt-1 hidden text-[0.68rem] font-bold uppercase tracking-[0.22em] text-silver sm:block">
              AC Service Company
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-silver lg:flex" aria-label="Primary navigation">
          {resolvedNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-aqua shadow-[0_0_12px_rgb(18_199_195_/_0.8)] transition group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" className="min-h-11 px-4" aria-label="Call Fixaro now">
            <Phone aria-hidden="true" size={16} />
            Call Now
          </PremiumButton>
          <PremiumButton href={whatsappUrl} external className="min-h-11 px-4" aria-label="Book Fixaro AC service on WhatsApp">
            <MessageCircle aria-hidden="true" size={16} />
            WhatsApp Booking
          </PremiumButton>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-aqua/40 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-aqua/15 bg-[#080B0E] px-4 py-5 shadow-[0_30px_90px_rgb(0_0_0_/_0.55)] transition duration-300 md:hidden"
        >
          <div className="glass-card mx-auto max-w-md rounded-[1.5rem] p-4">
            <nav className="grid gap-1 text-base font-semibold text-silver" aria-label="Mobile navigation">
              {resolvedNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-4 transition hover:bg-white/5 hover:text-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 grid gap-3">
              <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" className="w-full" aria-label="Call Fixaro now">
                <Phone aria-hidden="true" size={17} />
                Call Now
              </PremiumButton>
              <PremiumButton href={whatsappUrl} external className="w-full" aria-label="Book Fixaro AC service on WhatsApp">
                <MessageCircle aria-hidden="true" size={17} />
                WhatsApp Booking
              </PremiumButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
