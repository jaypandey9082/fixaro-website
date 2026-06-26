"use client";

import { CalendarClock, CheckCircle2, ListChecks, MessageCircle, Phone, ShieldCheck, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { businessInfo, processSteps } from "@/lib/data";
import { createWhatsAppUrl, processBookingMessage } from "@/lib/whatsapp";

const processIcons = [ListChecks, CalendarClock, Wrench, CheckCircle2, ShieldCheck] as const;
const processUrl = createWhatsAppUrl(processBookingMessage());

export function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgb(18_199_195_/_0.11),transparent_26rem),radial-gradient(circle_at_80%_20%,rgb(200_164_93_/_0.08),transparent_24rem)]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48 }}
        >
          <SectionHeading
            eyebrow="Simple Booking Process"
            title="How Fixaro Works"
            description="From choosing a service to warranty support, Fixaro keeps the process clear, direct and easy to book."
          />
        </motion.div>

        <div className="relative mt-12">
          <div className="process-line-glow absolute left-6 top-0 h-full w-px bg-aqua/20 lg:left-0 lg:right-0 lg:top-16 lg:mx-auto lg:h-px lg:w-full" />
          <div className="grid gap-5 lg:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index] || ListChecks;
              return (
                <motion.article
                  key={step.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : index * 0.05 }}
                  className="timeline-card relative ml-12 rounded-[1.5rem] p-5 lg:ml-0 lg:min-h-[250px]"
                >
                  <div className="absolute -left-[3.05rem] top-5 flex h-12 w-12 items-center justify-center rounded-full border border-aqua/35 bg-charcoal text-sm font-extrabold text-aqua shadow-[0_0_28px_rgb(18_199_195_/_0.2)] lg:relative lg:left-auto lg:top-auto lg:mb-5">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-aqua/20 bg-aqua/10 text-aqua">
                    <Icon aria-hidden="true" size={23} />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silver">{step.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="glass-panel mt-10 flex flex-col gap-4 rounded-[1.75rem] p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="text-2xl font-extrabold text-white">Ready to book your AC service?</h3>
            <p className="mt-2 text-sm leading-6 text-silver">Share your area and preferred time. Fixaro will confirm available slots.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PremiumButton href={processUrl} external aria-label="Book Fixaro AC service on WhatsApp">
              <MessageCircle aria-hidden="true" size={17} />
              Book on WhatsApp
            </PremiumButton>
            <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
              <Phone aria-hidden="true" size={17} />
              Call Now
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
