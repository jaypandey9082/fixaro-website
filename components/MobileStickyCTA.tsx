import { MessageCircle, Phone } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function MobileStickyCTA() {
  const whatsappUrl = createWhatsAppUrl("Hi Fixaro, I want to book an AC service. Please share available slots.");

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-aqua/25 bg-charcoal/94 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-14px_42px_rgb(0_0_0_/_0.38),0_-1px_0_rgb(18_199_195_/_0.22)] backdrop-blur-xl md:hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/80 to-transparent" />
      <div className="grid grid-cols-2 gap-3">
        <a
          href={businessInfo.mainPhoneHref}
          className="inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] transition hover:border-aqua/40 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          aria-label="Call Fixaro now"
        >
          <Phone aria-hidden="true" size={16} />
          Call Now
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#057B80,#12C7C3)] text-sm font-extrabold text-white shadow-[0_0_28px_rgb(18_199_195_/_0.24)] transition hover:shadow-[0_0_38px_rgb(18_199_195_/_0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          aria-label="Book Fixaro on WhatsApp"
        >
          <MessageCircle aria-hidden="true" size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
