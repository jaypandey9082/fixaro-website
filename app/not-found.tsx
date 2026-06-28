import Link from "next/link";
import { Home, MessageCircle, SearchX } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const notFoundWhatsAppUrl = createWhatsAppUrl(
  "Hi Fixaro, I could not find the page I was looking for. I want to book an AC service.",
);

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 px-4 py-32 sm:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgb(18_199_195_/_0.16),transparent_30rem),radial-gradient(circle_at_82%_18%,rgb(200_164_93_/_0.1),transparent_24rem),linear-gradient(145deg,#0B0F12_0%,#111820_48%,#080B0E_100%)]" />
      <div className="container-premium">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-aqua/25 bg-aqua/10 text-aqua shadow-[0_0_34px_rgb(18_199_195_/_0.16)]">
            <SearchX aria-hidden="true" size={30} />
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.24em] text-aqua">{businessInfo.name}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-8 text-silver">
            The page you are looking for may have moved.
          </p>
          <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-aqua/45 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <Home aria-hidden="true" size={17} />
              Back to Home
            </Link>
            <a
              href={notFoundWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#057B80,#12C7C3)] px-6 py-3 text-sm font-bold text-white shadow-[0_0_34px_rgb(18_199_195_/_0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgb(18_199_195_/_0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <MessageCircle aria-hidden="true" size={17} />
              Book on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
