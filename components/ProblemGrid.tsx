"use client";

import {
  AlertTriangle,
  Droplets,
  Fan,
  Gauge,
  MessageCircle,
  Phone,
  PlugZap,
  Settings,
  ShieldQuestion,
  Snowflake,
  Wind,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { PremiumButton } from "@/components/PremiumButton";
import { ProblemCard, type ProblemItem } from "@/components/ProblemCard";
import { SectionHeading } from "@/components/SectionHeading";
import { businessInfo, services } from "@/lib/data";
import { createWhatsAppUrl } from "@/lib/whatsapp";

function serviceBySlug(slug: string) {
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    throw new Error(`Missing Fixaro service data for problem card: ${slug}`);
  }
  return service;
}

function lowestServiceBySlug(slugs: string[]) {
  const matchedServices = slugs.map(serviceBySlug);
  return matchedServices.sort((a, b) => Number(a.price.replace(/[^0-9]/g, "")) - Number(b.price.replace(/[^0-9]/g, "")))[0];
}

const problems: ProblemItem[] = [
  {
    title: "AC Not Cooling",
    symptoms: "Room not cooling, weak cooling, compressor issue, or gas pressure concern.",
    recommendedService: "Less / No Cooling Repair",
    recommendedSlug: "less-no-cooling-repair",
    startingPrice: serviceBySlug("less-no-cooling-repair").price,
    warrantyNote: serviceBySlug("less-no-cooling-repair").warranty,
    icon: Snowflake,
    message: "Hi Fixaro, my AC is not cooling properly. Please help me book a diagnosis or repair visit.",
  },
  {
    title: "Water Leakage",
    symptoms: "Water dripping from indoor unit or drain blockage issue.",
    recommendedService: "Water Leakage Service",
    recommendedSlug: "water-leakage-service",
    startingPrice: serviceBySlug("water-leakage-service").price,
    warrantyNote: serviceBySlug("water-leakage-service").warranty,
    icon: Droplets,
    message: "Hi Fixaro, water is leaking from my AC. Please help me book a water leakage service.",
  },
  {
    title: "AC Not Turning On",
    symptoms: "AC has no power, display issue, tripping, or wiring concern.",
    recommendedService: "Power Issue Repair",
    recommendedSlug: "power-issue-repair",
    startingPrice: serviceBySlug("power-issue-repair").price,
    warrantyNote: serviceBySlug("power-issue-repair").warranty,
    icon: PlugZap,
    message: "Hi Fixaro, my AC is not turning on. Please help me book a power issue repair visit.",
  },
  {
    title: "Bad Smell From AC",
    symptoms: "Dust smell, moisture smell, dirty filter, or indoor unit cleaning needed.",
    recommendedService: "Deep Cleaning Service",
    recommendedSlug: "deep-cleaning-service",
    startingPrice: serviceBySlug("deep-cleaning-service").price,
    warrantyNote: serviceBySlug("deep-cleaning-service").warranty,
    icon: Fan,
    message: "Hi Fixaro, my AC has a bad smell. Please help me book deep cleaning service.",
  },
  {
    title: "Low Airflow / Dust",
    symptoms: "Low air throw, dusty filters, blocked airflow, or weak cooling feel.",
    recommendedService: "Dust Removal Service or Deep Cleaning Service",
    recommendedSlug: "dust-removal-service",
    startingPrice: serviceBySlug("dust-removal-service").price,
    warrantyNote: "7–15 Days Service Warranty depending on service",
    icon: Wind,
    message:
      "Hi Fixaro, my AC has low airflow or dust buildup. Please help me choose between dust removal and deep cleaning.",
  },
  {
    title: "Installation / Shifting",
    symptoms: "Need new split AC installation, AC shifting, or safe uninstallation.",
    recommendedService: "Split AC Installation / Uninstallation",
    recommendedSlug: "split-ac-installation",
    startingPrice: lowestServiceBySlug(["split-ac-installation", "split-ac-uninstallation"]).price,
    warrantyNote: "Workmanship warranty available",
    icon: Settings,
    message: "Hi Fixaro, I need AC installation or uninstallation support. Please share available slots.",
  },
  {
    title: "Gas Leakage / Low Gas",
    symptoms: "Gas pressure low, cooling drops quickly, or gas refill needed.",
    recommendedService: "AC Check-up / Inspection first",
    recommendedSlug: "ac-checkup-inspection",
    startingPrice: serviceBySlug("ac-checkup-inspection").price,
    warrantyNote: "Gas warranty applies only on leak-free systems",
    icon: Gauge,
    message: "Hi Fixaro, I think my AC has low gas or gas leakage. Please help me book an inspection.",
  },
  {
    title: "AC Making Noise",
    symptoms: "Unusual noise from indoor or outdoor unit, vibration, fan sound, or loose fitting.",
    recommendedService: "AC Check-up / Inspection",
    recommendedSlug: "ac-checkup-inspection",
    startingPrice: serviceBySlug("ac-checkup-inspection").price,
    warrantyNote: "Repair warranty depends on final service",
    icon: AlertTriangle,
    message: "Hi Fixaro, my AC is making unusual noise. Please help me book an inspection.",
  },
  {
    title: "Stabilizer Setup",
    symptoms: "Need stabilizer fitting or safer voltage setup for AC.",
    recommendedService: "Stabilizer Fitting",
    recommendedSlug: "stabilizer-fitting",
    startingPrice: serviceBySlug("stabilizer-fitting").price,
    warrantyNote: serviceBySlug("stabilizer-fitting").warranty,
    icon: PlugZap,
    message: "Hi Fixaro, I need stabilizer fitting for my AC. Please help me book the service.",
  },
];

const askUrl = createWhatsAppUrl("Hi Fixaro, I need help choosing the right AC service. My AC issue is:");

export function ProblemGrid() {
  const shouldReduceMotion = useReducedMotion();
  const [showMoreProblems, setShowMoreProblems] = useState(false);
  const visibleProblems = showMoreProblems ? problems : problems.slice(0, 6);

  return (
    <section id="problems" className="problem-grid-bg relative overflow-hidden border-b border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgb(18_199_195_/_0.14),transparent_28rem),radial-gradient(circle_at_78%_34%,rgb(200_164_93_/_0.09),transparent_24rem),linear-gradient(180deg,rgb(11_15_18_/_0.5),rgb(17_24_32_/_0.42))]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48 }}
        >
          <SectionHeading
            eyebrow="Find the Right Service"
            title="What Problem Are You Facing?"
            description="Choose your AC issue and Fixaro will help you book the right service after a quick diagnosis."
          />
        </motion.div>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleProblems.map((problem, index) => (
            <ProblemCard key={problem.title} problem={problem} index={index} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-aqua/25 bg-aqua/10 px-5 py-2.5 text-sm font-extrabold text-aqua transition hover:border-aqua/45 hover:bg-aqua/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            onClick={() => setShowMoreProblems((current) => !current)}
          >
            {showMoreProblems ? "Show Fewer Problems" : "View More Problems"}
          </button>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="glass-panel mt-8 rounded-[1.5rem] border-aqua/20 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <ShieldQuestion aria-hidden="true" size={24} />
              </span>
              <div>
                <h3 className="text-2xl font-extrabold text-white">Still confused?</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">
                  Send Fixaro your AC issue on WhatsApp. We&apos;ll help you choose the right service before booking.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[310px]">
              <PremiumButton href={askUrl} external aria-label="Ask Fixaro on WhatsApp for AC service help">
                <MessageCircle aria-hidden="true" size={17} />
                Ask on WhatsApp
              </PremiumButton>
              <PremiumButton href={businessInfo.mainPhoneHref} variant="secondary" aria-label="Call Fixaro now">
                <Phone aria-hidden="true" size={17} />
                Call Now
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
