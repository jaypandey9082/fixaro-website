"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Droplets,
  FileCheck2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  XCircle,
} from "lucide-react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { WarrantySeal } from "@/components/WarrantySeal";
import { businessInfo, warrantyExclusion, warrantyGroups, warrantyHighlights, type WarrantyBadge } from "@/lib/data";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl, warrantySupportMessage } from "@/lib/whatsapp";

const trustBadges = [
  { label: "Warranty Up to 60 Days", icon: ShieldCheck },
  { label: "Written Warranty Terms", icon: FileCheck2 },
  { label: "Workmanship Coverage", icon: Wrench },
  { label: "Leak-Free Gas Warranty", icon: Droplets },
  { label: "Direct Support", icon: MessageCircle },
];

const groupIcons = {
  "AC Service Warranty": ShieldCheck,
  "AC Repair Warranty": Wrench,
  "Gas Refilling Warranty": Droplets,
  "Installation Warranty": BadgeCheck,
} as const;

const badgeStyles: Record<WarrantyBadge, string> = {
  none: "border-white/12 bg-white/[0.045] text-muted",
  service: "border-aqua/20 bg-aqua/[0.08] text-aqua",
  repair: "border-aqua/20 bg-aqua/[0.08] text-aqua",
  gas: "border-gold/25 bg-gold/10 text-gold",
  workmanship: "border-gold/25 bg-gold/10 text-gold",
};

const coveredItems = [
  "Service workmanship issues",
  "Repeat issue related to eligible service",
  "Installation workmanship within warranty period",
  "Gas refilling warranty only on leak-free systems",
  "Technician support as per service warranty terms",
];

const notCoveredItems = [
  "Spare parts and replacement parts",
  "Physical damage",
  "Voltage fluctuations",
  "Rodent damage",
  "Misuse or tampering",
  "Customer-side installation changes",
  "Gas leakage from a non-leak-free system",
  "Check-up / inspection-only visits",
];

const claimSteps = [
  {
    title: "Contact Fixaro",
    description: "Call or message us on WhatsApp with your service details.",
  },
  {
    title: "Share Service Information",
    description: "Share your name, area, service date, AC issue, and technician/invoice details if available.",
  },
  {
    title: "Issue Review",
    description: "Fixaro checks whether the issue is covered under the relevant warranty terms.",
  },
  {
    title: "Support Visit",
    description: "If eligible, warranty support is arranged as per the service warranty period.",
  },
];

const supportUrl = createWhatsAppUrl(warrantySupportMessage());

export function WarrantySection() {
  const shouldReduceMotion = useReducedMotion();
  const [showFullTerms, setShowFullTerms] = useState(false);

  return (
    <section id="warranty" className="problem-grid-bg relative overflow-hidden border-b border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgb(200_164_93_/_0.1),transparent_22rem),radial-gradient(circle_at_82%_20%,rgb(18_199_195_/_0.13),transparent_28rem),linear-gradient(180deg,rgb(11_15_18_/_0.2),rgb(17_24_32_/_0.54))]" />
      <div className="container-premium">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.7fr]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.48 }}
          >
            <SectionHeading
              eyebrow="Fixaro Warranty"
              title="Clear Warranty Terms Before You Book"
              description="Eligible Fixaro services include clearly mentioned service workmanship warranty."
            />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-bold text-silver"
                  >
                    <Icon aria-hidden="true" size={15} className="text-aqua" />
                    {badge.label}
                  </span>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <WarrantySeal />
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {warrantyGroups.map((group, index) => {
            const Icon = groupIcons[group.title as keyof typeof groupIcons] || ShieldCheck;
            const displayedItems = showFullTerms ? group.items : group.items.slice(0, 3);
            return (
              <motion.article
                key={group.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                className="warranty-card warranty-shine rounded-[1.5rem] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-aqua/20 bg-aqua/10 text-aqua">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{group.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-silver">{group.description}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-2.5">
                  {displayedItems.map((item) => (
                    <div
                      key={item.service}
                      className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div>
                        <p className="text-sm font-bold text-white">{item.service}</p>
                        {item.note ? <p className="mt-1 text-xs font-semibold text-gold">{item.note}</p> : null}
                      </div>
                      <span
                        className={cn(
                          "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold",
                          badgeStyles[item.badge || "service"],
                        )}
                      >
                        {item.warranty === "No Warranty" ? (
                          <AlertTriangle aria-hidden="true" size={13} />
                        ) : (
                          <ShieldCheck aria-hidden="true" size={13} />
                        )}
                        {item.warranty}
                      </span>
                    </div>
                  ))}
                </div>

                {!showFullTerms && group.items.length > displayedItems.length ? (
                  <p className="mt-3 text-xs font-bold text-aqua">+{group.items.length - displayedItems.length} more terms</p>
                ) : null}

                {group.title === "Gas Refilling Warranty" ? (
                  <p className="mt-4 rounded-2xl border border-gold/20 bg-gold/10 p-3 text-sm leading-6 text-silver">
                    Gas warranty applies only when the AC system is leak-free.
                  </p>
                ) : null}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-aqua/25 bg-aqua/10 px-5 py-2.5 text-sm font-extrabold text-aqua transition hover:border-aqua/45 hover:bg-aqua/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            aria-expanded={showFullTerms}
            onClick={() => setShowFullTerms((current) => !current)}
          >
            {showFullTerms ? "Hide Full Warranty Terms" : "View Full Warranty Terms"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showFullTerms ? (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <CoverageCard title="Covered" icon="covered" items={coveredItems} />
                <CoverageCard title="Not Covered" icon="not-covered" items={notCoveredItems} />
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-extrabold text-white">How to Request Warranty Support</h3>
                <div className="mt-5 grid gap-4 lg:grid-cols-4">
                  {claimSteps.map((step, index) => (
                    <div key={step.title} className="claim-step-card relative rounded-3xl p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-aqua/25 bg-aqua/10 text-sm font-extrabold text-aqua">
                        {index + 1}
                      </div>
                      <h4 className="text-base font-extrabold text-white">{step.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-silver">{step.description}</p>
                      {index < claimSteps.length - 1 ? (
                        <div className="absolute -right-2 top-10 hidden h-px w-4 bg-aqua/35 lg:block" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="warranty-card mt-10 rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                      <MessageCircle aria-hidden="true" size={22} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">Need warranty support?</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">
                        Message Fixaro with your service details and issue. Our team will check the warranty terms and help you with the next step.
                      </p>
                      <p className="mt-3 text-sm font-semibold text-gold">
                        Second support number: {businessInfo.secondPhoneDisplay}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[330px]">
                    <PremiumButton href={supportUrl} external aria-label="Message Fixaro on WhatsApp for warranty support">
                      <MessageCircle aria-hidden="true" size={17} />
                      Message on WhatsApp
                    </PremiumButton>
                    <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro for warranty support">
                      <Phone aria-hidden="true" size={17} />
                      Call Now
                    </PremiumButton>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {warrantyHighlights.map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-silver">
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <p className="mt-6 text-sm leading-6 text-muted">{warrantyExclusion}</p>
      </div>
    </section>
  );
}

function CoverageCard({ title, icon, items }: { title: string; icon: "covered" | "not-covered"; items: string[] }) {
  const isCovered = icon === "covered";
  const Icon = isCovered ? CheckCircle2 : XCircle;

  return (
    <div className={cn("coverage-card rounded-[1.75rem] p-5", isCovered ? "coverage-card-covered" : "coverage-card-muted")}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl border",
            isCovered ? "border-aqua/25 bg-aqua/10 text-aqua" : "border-gold/25 bg-gold/10 text-gold",
          )}
        >
          <Icon aria-hidden="true" size={21} />
        </span>
        <h3 className="text-xl font-extrabold text-white">What Warranty {title === "Covered" ? "Covers" : "Does Not Cover"}</h3>
      </div>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-silver">
            <Icon aria-hidden="true" size={16} className={cn("mt-1 shrink-0", isCovered ? "text-aqua" : "text-gold")} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
