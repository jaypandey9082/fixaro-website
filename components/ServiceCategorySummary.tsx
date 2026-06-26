"use client";

import { Gauge, PackageCheck, Snowflake, Wrench } from "lucide-react";
import { services, type ServiceCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

type SummaryItem = {
  category: ServiceCategory;
  price: string;
  description: string;
  icon: typeof Snowflake;
};

function numericPrice(price: string) {
  const match = price.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function categoryStartingPrice(category: ServiceCategory) {
  const lowestService = services
    .filter((service) => service.category === category)
    .sort((a, b) => numericPrice(a.price) - numericPrice(b.price))[0];

  return lowestService ? `From ${lowestService.price}` : "View services";
}

const summaryItems: SummaryItem[] = [
  {
    category: "AC Service",
    price: categoryStartingPrice("AC Service"),
    description: "Cleaning, leakage and maintenance services",
    icon: Snowflake,
  },
  {
    category: "AC Repair",
    price: categoryStartingPrice("AC Repair"),
    description: "Inspection, cooling and power issue repair",
    icon: Wrench,
  },
  {
    category: "Gas Refilling",
    price: categoryStartingPrice("Gas Refilling"),
    description: "Gas top-up and complete gas charging",
    icon: Gauge,
  },
  {
    category: "Installation",
    price: categoryStartingPrice("Installation"),
    description: "Split AC installation and uninstallation",
    icon: PackageCheck,
  },
];

type ServiceCategorySummaryProps = {
  selectedCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
};

export function ServiceCategorySummary({ selectedCategory, onCategoryChange }: ServiceCategorySummaryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map((item) => {
        const Icon = item.icon;
        const isSelected = selectedCategory === item.category;

        return (
          <button
            key={item.category}
            type="button"
            className={cn(
              "glass-card group rounded-3xl p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-aqua/35 hover:shadow-[0_24px_70px_rgb(18_199_195_/_0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
              isSelected && "border-aqua/40 bg-aqua/[0.08] shadow-[0_0_34px_rgb(18_199_195_/_0.12)]",
            )}
            onClick={() => onCategoryChange(item.category)}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-aqua/18 bg-aqua/10 text-aqua transition group-hover:bg-aqua/15">
                <Icon aria-hidden="true" size={20} />
              </span>
              <span className="price-glow rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-extrabold text-gold">
                {item.price}
              </span>
            </div>
            <h3 className="mt-4 text-base font-extrabold text-white">{item.category}</h3>
            <p className="mt-2 text-sm leading-6 text-silver">{item.description}</p>
          </button>
        );
      })}
    </div>
  );
}
