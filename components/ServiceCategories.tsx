"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceCategorySummary } from "@/components/ServiceCategorySummary";
import { ServiceTabs } from "@/components/ServiceTabs";
import { globalPriceNote, serviceCategories, services, type ServiceCategory } from "@/lib/data";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const diagnosisUrl = createWhatsAppUrl(
  "Hi Fixaro, I am not sure which AC service I need. Please help me choose the right service.",
);

export function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("AC Service");
  const [expandedServiceSlug, setExpandedServiceSlug] = useState<string | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const counts = useMemo(
    () =>
      serviceCategories.reduce(
        (acc, category) => {
          acc[category] = services.filter((service) => service.category === category).length;
          return acc;
        },
        {} as Record<ServiceCategory, number>,
      ),
    [],
  );

  const visibleServices = useMemo(
    () => services.filter((service) => service.category === selectedCategory),
    [selectedCategory],
  );
  const displayedServices = showAllServices ? visibleServices : visibleServices.slice(0, 2);

  const handleCategoryChange = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setExpandedServiceSlug(null);
    setShowAllServices(false);
  };

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden border-b border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgb(18_199_195_/_0.1),transparent_24rem),radial-gradient(circle_at_86%_24%,rgb(200_164_93_/_0.08),transparent_22rem)]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.48 }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Fixaro Services"
              title="Choose Your AC Service"
              description="Book AC service, repair, gas refilling and installation with clear pricing, clean work and written warranty terms."
            />
            <div className="max-w-md rounded-2xl border border-aqua/18 bg-aqua/[0.08] px-4 py-3 text-sm font-semibold leading-6 text-silver">
              Prices shown are service charges. Spare parts and extra materials are charged only after customer approval.
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <ServiceCategorySummary selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        </div>

        <div className="mt-6">
          <ServiceTabs selectedCategory={selectedCategory} counts={counts} onCategoryChange={handleCategoryChange} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-6 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {displayedServices.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                isExpanded={expandedServiceSlug === service.slug}
                onToggleDetails={() =>
                  setExpandedServiceSlug((current) => (current === service.slug ? null : service.slug))
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {visibleServices.length > 2 ? (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-aqua/25 bg-aqua/10 px-5 py-2.5 text-sm font-extrabold text-aqua transition hover:border-aqua/45 hover:bg-aqua/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              onClick={() => setShowAllServices((current) => !current)}
            >
              {showAllServices ? "Show Fewer Services" : `View All ${selectedCategory} Services`}
            </button>
          </div>
        ) : null}

        <div className="glass-panel mt-8 flex flex-col gap-4 rounded-[1.5rem] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-extrabold text-white">Not sure which service you need?</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">
              Clear pricing before booking. Extra material or spare part charges are shared before replacement.
            </p>
            <p className="mt-2 text-xs leading-5 text-muted">{globalPriceNote}</p>
          </div>
          <PremiumButton href={diagnosisUrl} external className="shrink-0" aria-label="Get AC diagnosis on WhatsApp">
            <MessageCircle aria-hidden="true" size={17} />
            Get AC Diagnosis on WhatsApp
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
