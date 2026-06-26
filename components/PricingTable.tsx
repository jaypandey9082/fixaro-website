"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Clock, IndianRupee, Info, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { serviceCategories, services, type Service, type ServiceCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl, serviceBookingMessage } from "@/lib/whatsapp";

type PricingCategory = "All" | ServiceCategory;

type PricingRow = Pick<Service, "name" | "slug" | "category" | "price" | "warranty" | "duration"> & {
  isRequestPrice?: boolean;
};

const pricingCategories: PricingCategory[] = ["All", ...serviceCategories];

const requestPriceRows: PricingRow[] = [
  {
    name: "Window AC Installation",
    slug: "window-ac-installation",
    category: "Installation",
    price: "Price on request",
    warranty: "30 Days Workmanship Warranty",
    duration: "After site check",
    isRequestPrice: true,
  },
  {
    name: "Window AC Uninstallation",
    slug: "window-ac-uninstallation",
    category: "Installation",
    price: "Price on request",
    warranty: "7 Days Workmanship Warranty",
    duration: "After site check",
    isRequestPrice: true,
  },
];

const pricingRows: PricingRow[] = [...services, ...requestPriceRows];

const helpUrl = createWhatsAppUrl("Hi Fixaro, I am not sure which AC service I need. Please help me choose the right service.");

export function PricingTable() {
  const [selectedCategory, setSelectedCategory] = useState<PricingCategory>("All");
  const shouldReduceMotion = useReducedMotion();

  const visibleRows = useMemo(
    () => pricingRows.filter((row) => selectedCategory === "All" || row.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <section id="pricing" className="relative overflow-hidden border-b border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgb(18_199_195_/_0.12),transparent_27rem),radial-gradient(circle_at_82%_24%,rgb(200_164_93_/_0.1),transparent_24rem)]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="AC Service Charges in Bangalore"
            description="Compare Fixaro service charges before you book. Extra materials or spare parts are charged only after customer approval."
          />
          <div className="max-w-xl rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-semibold leading-6 text-silver">
            <span className="mb-1 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-gold">
              <Info aria-hidden="true" size={14} />
              Price note
            </span>
            Prices shown are service charges. Spare parts and extra materials are charged only after customer approval.
          </div>
        </motion.div>

        <div className="mt-8 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
            {pricingCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full border px-4 py-2.5 text-sm font-extrabold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
                    isActive
                      ? "tab-glow border-aqua/40 bg-aqua/15 text-aqua"
                      : "border-white/10 bg-white/[0.045] text-silver hover:border-aqua/25 hover:bg-aqua/[0.08] hover:text-white",
                  )}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="pricing-glow mt-6 overflow-hidden rounded-[1.75rem] border border-aqua/18 bg-[linear-gradient(145deg,rgb(21_28_36_/_0.84),rgb(11_15_18_/_0.72))] shadow-[0_24px_86px_rgb(0_0_0_/_0.34)] backdrop-blur-xl"
        >
          <div className="hidden lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Fixaro AC service pricing table</caption>
              <thead>
                <tr className="border-b border-aqua/16 bg-white/[0.045] text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-5 py-3">Service</th>
                  <th scope="col" className="px-5 py-3">Category</th>
                  <th scope="col" className="px-5 py-3">Starting Price</th>
                  <th scope="col" className="px-5 py-3">Warranty</th>
                  <th scope="col" className="px-5 py-3">Duration</th>
                  <th scope="col" className="px-5 py-3 text-right">Book</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {visibleRows.map((row, index) => (
                    <PricingTableRow key={row.slug} row={row} index={index} shouldReduceMotion={shouldReduceMotion} />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={selectedCategory} className="grid gap-3 p-3 md:grid-cols-2 lg:hidden">
              {visibleRows.map((row, index) => (
                <PricingCard key={row.slug} row={row} index={index} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="glass-panel mt-6 flex flex-col gap-4 rounded-[1.5rem] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-extrabold text-white">Not sure which service is right?</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">
              Message Fixaro with your AC issue and we will help you choose before booking.
            </p>
          </div>
          <PremiumButton href={helpUrl} external className="shrink-0" aria-label="Get help choosing a Fixaro AC service">
            <Sparkles aria-hidden="true" size={17} />
            Need help choosing? Ask Fixaro on WhatsApp
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}

function PricingTableRow({
  row,
  index,
  shouldReduceMotion,
}: {
  row: PricingRow;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const bookingUrl = createWhatsAppUrl(serviceBookingMessage(row.name, row.price, row.warranty));

  return (
    <motion.tr
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.28, delay: shouldReduceMotion ? 0 : index * 0.02 }}
      className="premium-table-row border-b border-white/8 last:border-b-0"
    >
      <th scope="row" className="px-5 py-3 text-base font-extrabold text-white">
        {row.isRequestPrice ? (
          row.name
        ) : (
          <Link href={`/services/${row.slug}`} className="transition hover:text-aqua">
            {row.name}
          </Link>
        )}
      </th>
      <td className="px-5 py-3">
        <span className="rounded-full border border-aqua/20 bg-aqua/[0.08] px-3 py-1 text-xs font-extrabold text-aqua">
          {row.category}
        </span>
      </td>
      <td className="px-5 py-3">
        <span className="inline-flex items-center gap-1 text-lg font-extrabold text-white">
          {row.isRequestPrice ? null : <IndianRupee aria-hidden="true" size={16} className="text-aqua" />}
          {row.price}
        </span>
      </td>
      <td className="px-5 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold leading-5 text-silver">
          <ShieldCheck aria-hidden="true" size={16} className={row.warranty === "No Warranty" ? "text-muted" : "text-aqua"} />
          {row.warranty}
        </span>
      </td>
      <td className="px-5 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-silver">
          <Clock aria-hidden="true" size={16} className="text-gold" />
          {row.duration}
        </span>
      </td>
      <td className="px-5 py-3 text-right">
        <PremiumButton href={bookingUrl} external className="min-h-10 px-4 py-2" aria-label={`Book ${row.name} on WhatsApp`}>
          <MessageCircle aria-hidden="true" size={15} />
          Book
        </PremiumButton>
      </td>
    </motion.tr>
  );
}

function PricingCard({
  row,
  index,
  shouldReduceMotion,
}: {
  row: PricingRow;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const bookingUrl = createWhatsAppUrl(serviceBookingMessage(row.name, row.price, row.warranty));

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.03 }}
      className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="rounded-full border border-aqua/20 bg-aqua/[0.08] px-3 py-1 text-xs font-extrabold text-aqua">
            {row.category}
          </span>
          {row.isRequestPrice ? (
            <h3 className="mt-3 text-lg font-extrabold leading-tight text-white">{row.name}</h3>
          ) : (
            <Link href={`/services/${row.slug}`} className="mt-3 block text-lg font-extrabold leading-tight text-white transition hover:text-aqua">
              {row.name}
            </Link>
          )}
        </div>
        <p className="price-glow rounded-2xl border border-aqua/16 bg-aqua/[0.08] px-3 py-2 text-lg font-extrabold text-white">
          {row.price}
        </p>
      </div>
      <div className="mt-4 grid gap-3 text-sm leading-6 text-silver">
        <p className="flex gap-2">
          <ShieldCheck aria-hidden="true" size={16} className="mt-1 shrink-0 text-aqua" />
          <span>{row.warranty}</span>
        </p>
        <p className="flex gap-2">
          <Clock aria-hidden="true" size={16} className="mt-1 shrink-0 text-gold" />
          <span>{row.duration}</span>
        </p>
      </div>
      <PremiumButton href={bookingUrl} external className="mt-5 w-full" aria-label={`Book ${row.name} on WhatsApp`}>
        <MessageCircle aria-hidden="true" size={17} />
        Book
      </PremiumButton>
    </motion.article>
  );
}
