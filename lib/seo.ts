import type { Metadata } from "next";
import { businessInfo, featuredServiceAreas, services, warrantyExclusion, type FAQItem, type Service } from "@/lib/data";

export const siteConfig = {
  name: "Fixaro AC Service Company",
  shortName: "Fixaro",
  description:
    "Premium AC service, repair, gas refilling and installation in Bangalore with clear pricing, clean work and written warranty terms.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fixarosolutions.com",
  city: "Bangalore",
  phone: "+91 91879 72801",
  defaultOgImage: "/images/ac-hero.svg",
} as const;

export type LocalPageType = "service" | "repair" | "gas" | "installation";

export type LocalSeoPageConfig = {
  type: LocalPageType;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  serviceType: string;
  primaryServiceNames: string[];
  mainCTA: string;
  whatsappMessage: string;
  benefits: string[];
  localCopy: string;
};

export const localSeoPages: LocalSeoPageConfig[] = [
  {
    type: "service",
    path: "/ac-service-bangalore",
    title: "AC Service in Bangalore | Fixaro AC Cleaning & Repair",
    metaDescription:
      "Book AC service in Bangalore with Fixaro. AC service from ₹499, deep cleaning from ₹649, water leakage service from ₹699, clear pricing and written warranty terms.",
    h1: "AC Service in Bangalore",
    subheading:
      "Book Fixaro AC service, deep cleaning, dust removal and water leakage service across Bangalore with transparent charges and clear warranty terms.",
    serviceType: "AC service",
    primaryServiceNames: ["Essential AC Service", "Deep Cleaning Service", "Dust Removal Service", "Water Leakage Service"],
    mainCTA: "Book AC Service on WhatsApp",
    whatsappMessage:
      "Hi Fixaro, I want to book AC service in Bangalore.\n\nArea:\nAC type:\nPreferred time:\n\nPlease confirm availability.",
    benefits: [
      "Regular cleaning and airflow check",
      "Deep cleaning for dusty ACs",
      "Water leakage support",
      "Clear service warranty",
    ],
    localCopy:
      "Fixaro helps Bangalore customers book routine AC cleaning, deep cleaning and leakage service with visible starting prices. The technician checks airflow, cooling and drainage needs before recommending any extra work.",
  },
  {
    type: "repair",
    path: "/ac-repair-bangalore",
    title: "AC Repair in Bangalore | Fixaro AC Check-up & Cooling Repair",
    metaDescription:
      "Book AC repair in Bangalore with Fixaro. AC check-up from ₹399, less/no cooling repair from ₹299, power issue repair from ₹399 and direct WhatsApp booking.",
    h1: "AC Repair in Bangalore",
    subheading:
      "Get AC check-up, power issue repair, less/no cooling repair and stabilizer fitting support from Fixaro technicians in Bangalore.",
    serviceType: "AC repair",
    primaryServiceNames: ["AC Check-up / Inspection", "Power Issue Repair", "Less / No Cooling Repair", "Stabilizer Fitting"],
    mainCTA: "Book AC Repair on WhatsApp",
    whatsappMessage:
      "Hi Fixaro, I want to book AC repair in Bangalore.\n\nArea:\nAC issue:\nAC type:\nPreferred time:\n\nPlease confirm availability.",
    benefits: [
      "Diagnosis before repair",
      "Power and cooling issue support",
      "Repair quote before extra work",
      "No spare replacement without approval",
    ],
    localCopy:
      "Fixaro repair visits focus on diagnosis first. Whether your AC is not cooling, not turning on, tripping or needs stabilizer support, the technician checks the issue and shares extra work estimates before proceeding.",
  },
  {
    type: "gas",
    path: "/ac-gas-refilling-bangalore",
    title: "AC Gas Refilling in Bangalore | Fixaro Gas Top-up & Charging",
    metaDescription:
      "Book AC gas refilling in Bangalore with Fixaro. Gas top-up from ₹1,799 and complete gas charging from ₹2,799. Warranty applies only on leak-free systems.",
    h1: "AC Gas Refilling in Bangalore",
    subheading:
      "Book AC gas top-up or complete gas charging after pressure and leak indication checks. Gas warranty applies only on leak-free systems.",
    serviceType: "AC gas refilling",
    primaryServiceNames: ["Gas Top-up", "Complete Gas Charging", "AC Check-up / Inspection", "Less / No Cooling Repair"],
    mainCTA: "Book Gas Refilling on WhatsApp",
    whatsappMessage:
      "Hi Fixaro, I want to book AC gas refilling in Bangalore.\n\nArea:\nAC type:\nCooling issue:\nPreferred time:\n\nPlease confirm availability.",
    benefits: ["Pressure check", "Leak indication check", "Gas top-up or complete gas charging", "Warranty only on leak-free systems"],
    localCopy:
      "Fixaro gas refilling support starts with pressure and leak indication checks. Gas warranty applies only when the AC system is leak-free, and leakage repair may be required before gas warranty can apply.",
  },
  {
    type: "installation",
    path: "/ac-installation-bangalore",
    title: "AC Installation in Bangalore | Fixaro Split AC Installation",
    metaDescription:
      "Book split AC installation in Bangalore with Fixaro. Split AC installation from ₹1,799 and uninstallation from ₹999 with workmanship warranty.",
    h1: "AC Installation in Bangalore",
    subheading:
      "Book split AC installation and uninstallation support in Bangalore with clear workmanship warranty and extra material approval before work.",
    serviceType: "AC installation",
    primaryServiceNames: ["Split AC Installation", "Split AC Uninstallation", "Stabilizer Fitting", "Essential AC Service"],
    mainCTA: "Book AC Installation on WhatsApp",
    whatsappMessage:
      "Hi Fixaro, I want to book AC installation or uninstallation in Bangalore.\n\nArea:\nService needed:\nAC type:\nPreferred time:\n\nPlease confirm availability.",
    benefits: [
      "Indoor and outdoor unit setup support",
      "Basic connection and testing",
      "Workmanship warranty",
      "Extra materials charged after approval",
    ],
    localCopy:
      "Fixaro installation support covers indoor mounting, outdoor placement support, drain setup and basic testing. Copper pipe, stand, extra wire, drain pipe, core cutting and added materials are charged only after approval.",
  },
];

export function createPageTitle(title: string): string {
  return title.includes("Fixaro") ? title : `${title} | Fixaro`;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

export function serviceMetadata(service: Service): Metadata {
  const hasWarranty = service.warranty !== "No Warranty";
  const description = hasWarranty
    ? `Book ${service.name} in Bangalore with Fixaro. Starting price ${service.price}, ${service.warranty}, trained AC technicians, clear pricing and direct WhatsApp booking.`
    : `Book ${service.name} in Bangalore with Fixaro. Starting price ${service.price}, professional diagnosis, clear pricing and direct WhatsApp booking.`;

  return {
    title: { absolute: `${service.name} in Bangalore | Fixaro` },
    description,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: `${service.name} in Bangalore | Fixaro`,
      description,
      url: absoluteUrl(`/services/${service.slug}`),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: service.image, width: 1200, height: 630, alt: `${service.name} in Bangalore` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} in Bangalore | Fixaro`,
      description,
      images: [service.image],
    },
  };
}

export function localPageMetadata(config: LocalSeoPageConfig): Metadata {
  return {
    title: { absolute: config.title },
    description: config.metaDescription,
    alternates: { canonical: absoluteUrl(config.path) },
    openGraph: {
      title: config.title,
      description: config.metaDescription,
      url: absoluteUrl(config.path),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: siteConfig.defaultOgImage, width: 1200, height: 630, alt: config.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.metaDescription,
      images: [siteConfig.defaultOgImage],
    },
  };
}

export function getNumericPrice(price: string): number | undefined {
  const match = price.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

export function getServiceFaqs(service: Service): FAQItem[] {
  const warrantyAnswer =
    service.warranty === "No Warranty"
      ? `${service.name} has no warranty because it is a diagnosis visit.`
      : `${service.warranty}. ${warrantyExclusion}`;

  const faqs: FAQItem[] = [
    {
      question: `What is the price for ${service.name} in Bangalore?`,
      answer: `Fixaro ${service.name} starts from ${service.price}. Extra materials or spare parts, if required, are charged only after customer approval.`,
      categories: ["Pricing"],
    },
    {
      question: `Does ${service.name} come with warranty?`,
      answer: warrantyAnswer,
      categories: ["Warranty"],
    },
    {
      question: `How do I book ${service.name}?`,
      answer: `You can call ${businessInfo.mainPhoneDisplay} or book on WhatsApp. Fixaro will confirm slot availability before the technician visit.`,
      categories: ["Booking"],
    },
  ];

  if (service.category === "Gas Refilling") {
    faqs.push({
      question: "Is gas refilling warranty valid for all ACs?",
      answer:
        "Gas warranty applies only when the AC system is leak-free. If leakage is found, leakage repair may be required before warranty applies.",
      categories: ["Gas", "Warranty"],
    });
  }

  if (service.category === "Installation") {
    faqs.push({
      question: "Are copper pipe and outdoor stand included?",
      answer:
        "No. Copper pipe, outdoor stand, extra wire, drain pipe, core cutting and additional materials are charged extra after customer approval.",
      categories: ["Installation", "Pricing"],
    });
  }

  return faqs;
}

export function getLocalPageFaqs(pageType: LocalPageType): FAQItem[] {
  const faqMap: Record<LocalPageType, FAQItem[]> = {
    service: [
      {
        question: "What is the AC service charge in Bangalore?",
        answer:
          "Fixaro AC Service starts from ₹499 in Bangalore. Deep Cleaning starts from ₹649, Dust Removal starts from ₹399 and Water Leakage Service starts from ₹699. Extra materials or spare parts are charged only after approval.",
        categories: ["Pricing"],
      },
      {
        question: "Does AC service include spare parts?",
        answer:
          "No. Service charges do not include spare parts or additional materials. Any extra charge is shared before replacement or additional work.",
        categories: ["Pricing"],
      },
      {
        question: "Do you provide warranty on AC cleaning?",
        answer:
          "Yes. AC Service has 7 Days Service Warranty, Deep Cleaning has 15 Days Service Warranty, Water Leakage Service has 10 Days Service Warranty and Dust Removal has 7 Days Service Warranty.",
        categories: ["Warranty"],
      },
      {
        question: "Which Bangalore areas do you cover?",
        answer:
      "Fixaro serves major Bangalore localities including Whitefield, HSR Layout, Koramangala, Indiranagar, Marathahalli, Electronic City, Bellandur, Hebbal, Banaswadi, Frazer Town and nearby areas. Availability depends on technician slots and exact location.",
        categories: ["Areas"],
      },
      {
        question: "How can I book AC service in Bangalore?",
        answer: "You can book through the website form, call +91 91879 72801, or message Fixaro on WhatsApp.",
        categories: ["Booking"],
      },
    ],
    repair: [
      {
        question: "What is the AC repair inspection charge in Bangalore?",
        answer:
          "Fixaro AC Check-up / Inspection starts from ₹399. Less / No Cooling Repair starts from ₹299, Power Issue Repair starts from ₹399 and Stabilizer Fitting starts from ₹399.",
        categories: ["Pricing"],
      },
      {
        question: "My AC is not cooling. Should I book repair or gas refilling?",
        answer:
          "Book Less / No Cooling Repair or AC Check-up / Inspection first. The technician will check airflow, cooling performance and gas pressure indication before suggesting gas refilling or repair.",
        categories: ["Repair"],
      },
      {
        question: "Is AC repair covered under warranty?",
        answer:
          "Selected repair services have warranty. Power Issue Repair has 30 Days Service Warranty, Stabilizer Fitting has 10 Days Service Warranty and Less / No Cooling Repair has 30 Days Service Warranty. AC Check-up / Inspection has no warranty.",
        categories: ["Warranty"],
      },
      {
        question: "Are spare parts included in AC repair price?",
        answer: "No. Spare parts and replacement parts are charged separately after customer approval.",
        categories: ["Pricing"],
      },
      {
        question: "How do I book AC repair in Bangalore?",
        answer: "Call +91 91879 72801 or book on WhatsApp. Fixaro will confirm service availability before the visit.",
        categories: ["Booking"],
      },
    ],
    gas: [
      {
        question: "What is the AC gas refilling price in Bangalore?",
        answer: "Fixaro Gas Top-up starts from ₹1,799 and Complete Gas Charging starts from ₹2,799.",
        categories: ["Pricing", "Gas"],
      },
      {
        question: "Does AC gas refilling have warranty?",
        answer:
          "Gas Top-up has 30 Days Warranty and Complete Gas Charging has 60 Days Warranty only when the AC system is leak-free.",
        categories: ["Warranty", "Gas"],
      },
      {
        question: "What happens if my AC has gas leakage?",
        answer:
          "If leakage is found or suspected, leakage repair may be required before warranty applies. The technician will check the system and confirm extra work before proceeding.",
        categories: ["Gas"],
      },
      {
        question: "Should I book gas refilling directly if my AC is not cooling?",
        answer:
          "If the exact issue is unclear, book AC Check-up / Inspection or Less / No Cooling Repair first. Low cooling can happen due to airflow, coil, gas pressure or other issues.",
        categories: ["Repair", "Gas"],
      },
      {
        question: "How can I book AC gas refilling in Bangalore?",
        answer: "Call +91 91879 72801 or message Fixaro on WhatsApp with your area, AC type and issue.",
        categories: ["Booking"],
      },
    ],
    installation: [
      {
        question: "What is the Split AC installation charge in Bangalore?",
        answer: "Fixaro Split AC Installation starts from ₹1,799. Split AC Uninstallation starts from ₹999.",
        categories: ["Pricing", "Installation"],
      },
      {
        question: "Is copper pipe included in installation price?",
        answer:
          "No. Copper pipe, outdoor stand, extra wire, drain pipe, core cutting and additional materials are charged extra after customer approval.",
        categories: ["Pricing", "Installation"],
      },
      {
        question: "Does installation have warranty?",
        answer: "Split AC Installation has 30 Days Workmanship Warranty. Split AC Uninstallation has 7 Days Workmanship Warranty.",
        categories: ["Warranty", "Installation"],
      },
      {
        question: "Do you uninstall AC for shifting?",
        answer: "Yes. Fixaro provides Split AC Uninstallation support for shifting, removal, relocation or replacement preparation.",
        categories: ["Installation"],
      },
      {
        question: "How do I book AC installation in Bangalore?",
        answer:
          "Call +91 91879 72801 or book on WhatsApp. Fixaro will confirm technician availability and any material requirements before work.",
        categories: ["Booking"],
      },
    ],
  };

  return faqMap[pageType];
}

export function getLocalBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: businessInfo.fullName,
    alternateName: businessInfo.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    priceRange: "₹₹",
    description: siteConfig.description,
    areaServed: ["Bangalore", "Bengaluru", ...featuredServiceAreas],
  };
}

export function getServiceJsonLd(service: Service): Record<string, unknown> {
  const numericPrice = getNumericPrice(service.price);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.category,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: businessInfo.fullName,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    areaServed: "Bangalore",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      ...(numericPrice ? { price: numericPrice } : {}),
    },
  };
}

export function getFaqJsonLd(faqs: FAQItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: { label: string; href?: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function getLocalPageConfig(type: LocalPageType): LocalSeoPageConfig {
  const config = localSeoPages.find((page) => page.type === type);
  if (!config) {
    throw new Error(`Missing local SEO page config for ${type}`);
  }
  return config;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
