"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  Gauge,
  HelpCircle,
  IndianRupee,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PremiumButton } from "@/components/PremiumButton";
import { SectionHeading } from "@/components/SectionHeading";
import { businessInfo, faqCategories, faqItems, type FAQCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type ActiveCategory = (typeof faqCategories)[number];

const askQuestionUrl = createWhatsAppUrl("Hi Fixaro, I have a question about AC service.\n\nMy question:");

const categoryIcons: Record<FAQCategory | "All", LucideIcon> = {
  All: HelpCircle,
  Pricing: IndianRupee,
  Warranty: ShieldCheck,
  Repair: Wrench,
  Gas: Gauge,
  Installation: Wrench,
  Booking: MessageCircle,
  Areas: MapPin,
};

const defaultFaqQuestions = [
  "What is the AC service charge?",
  "Do you provide service warranty?",
  "Are spare parts included in the service price?",
  "Does gas refilling come with warranty?",
  "My AC is not cooling. Which service should I book?",
  "How do I book Fixaro AC service?",
];

export function FAQSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");
  const [query, setQuery] = useState("");
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.categories.includes(activeCategory);
      const matchesSearch =
        !normalizedQuery ||
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);
  const isDefaultPreview = activeCategory === "All" && !query.trim();
  const displayedItems = useMemo(() => {
    if (!isDefaultPreview || showAllFaqs) {
      return filteredItems;
    }

    return defaultFaqQuestions
      .map((question) => faqItems.find((item) => item.question === question))
      .filter((item): item is (typeof faqItems)[number] => Boolean(item));
  }, [filteredItems, isDefaultPreview, showAllFaqs]);

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
    [],
  );

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section id="faq" className="relative overflow-hidden border-b border-white/10 py-14 sm:py-16 lg:py-20">
      <JsonLd data={faqJsonLd} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgb(18_199_195_/_0.12),transparent_27rem),radial-gradient(circle_at_86%_22%,rgb(200_164_93_/_0.08),transparent_24rem)]" />
      <div className="container-premium">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <SectionHeading
            eyebrow="Questions Answered"
            title="AC Service FAQs"
            description="Clear answers about Fixaro pricing, warranty, booking, gas refilling, installation and service coverage."
          />
          <div className="max-w-md rounded-2xl border border-aqua/20 bg-aqua/[0.08] p-4 text-sm font-semibold leading-6 text-silver">
            {"Still have a question? Message Fixaro on WhatsApp and we'll help you choose the right service."}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : 0.06 }}
          className="mt-7 grid gap-4 lg:grid-cols-[1fr_18rem]"
        >
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
            {faqCategories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  className={cn("faq-filter-chip", isActive && "faq-filter-chip-active")}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                >
                  <Icon aria-hidden="true" size={15} />
                  {category}
                </button>
              );
            })}
          </div>

          <label className="sr-only" htmlFor="faq-search">
            Search FAQs
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            placeholder="Search FAQs"
            className="form-field-premium"
            onChange={(event) => setQuery(event.target.value)}
          />
        </motion.div>

        <div className="mt-6 grid gap-3">
          <AnimatePresence mode="popLayout">
            {displayedItems.length > 0 ? (
              displayedItems.map((item, index) => {
                const originalIndex = faqItems.indexOf(item);
                const isOpen = openItems.has(originalIndex);
                const answerId = `faq-answer-${originalIndex}`;
                const Icon = categoryIcons[item.categories[0] || "All"];

                return (
                  <motion.article
                    layout
                    key={item.question}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, delay: shouldReduceMotion ? 0 : Math.min(index * 0.025, 0.12) }}
                    className="faq-card accordion-shine rounded-[1.25rem]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-start gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:p-5"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(originalIndex)}
                    >
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-aqua/20 bg-aqua/10 text-aqua">
                        <Icon aria-hidden="true" size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-extrabold leading-6 text-white sm:text-lg">{item.question}</span>
                        <span className="mt-2 flex flex-wrap gap-2">
                          {item.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#E8D7A8]"
                            >
                              {category}
                            </span>
                          ))}
                        </span>
                      </span>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-aqua transition">
                        <ChevronDown
                          aria-hidden="true"
                          size={19}
                          className={cn("transition-transform duration-300", isOpen && "rotate-180")}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={answerId}
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="faq-answer mx-4 mb-4 rounded-2xl p-4 text-sm leading-7 text-silver sm:mx-5 sm:mb-5">
                            {item.answer}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.article>
                );
              })
            ) : (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                className="faq-card rounded-[1.5rem] p-6 text-center"
              >
                <HelpCircle aria-hidden="true" className="mx-auto h-8 w-8 text-aqua" />
                <h3 className="mt-4 text-xl font-extrabold text-white">No FAQ found.</h3>
                <p className="mt-2 text-sm leading-6 text-silver">Ask Fixaro on WhatsApp.</p>
                <PremiumButton href={askQuestionUrl} external className="mt-5" aria-label="Ask Fixaro on WhatsApp">
                  <MessageCircle aria-hidden="true" size={17} />
                  Ask on WhatsApp
                </PremiumButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isDefaultPreview && faqItems.length > displayedItems.length ? (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-aqua/25 bg-aqua/10 px-5 py-2.5 text-sm font-extrabold text-aqua transition hover:border-aqua/45 hover:bg-aqua/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              onClick={() => setShowAllFaqs((current) => !current)}
            >
              {showAllFaqs ? "Show Fewer FAQs" : "View More FAQs"}
            </button>
          </div>
        ) : null}

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.42 }}
          className="glass-panel mt-8 flex flex-col gap-5 rounded-[1.5rem] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h3 className="text-2xl font-extrabold text-white">Still have a question?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-silver">
              {"Send your AC issue to Fixaro on WhatsApp and we'll help you choose the right service."}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PremiumButton href={askQuestionUrl} external aria-label="Ask Fixaro on WhatsApp">
              <MessageCircle aria-hidden="true" size={17} />
              Ask on WhatsApp
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
