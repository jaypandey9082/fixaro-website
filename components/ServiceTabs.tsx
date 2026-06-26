"use client";

import { Gauge, PackageCheck, Snowflake, Wrench } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { ServiceCategory } from "@/lib/data";
import { serviceCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryIcons = {
  "AC Service": Snowflake,
  "AC Repair": Wrench,
  "Gas Refilling": Gauge,
  Installation: PackageCheck,
} satisfies Record<ServiceCategory, typeof Snowflake>;

type ServiceTabsProps = {
  selectedCategory: ServiceCategory;
  counts: Record<ServiceCategory, number>;
  onCategoryChange: (category: ServiceCategory) => void;
};

export function ServiceTabs({ selectedCategory, counts, onCategoryChange }: ServiceTabsProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, category: ServiceCategory) => {
    const currentIndex = serviceCategories.indexOf(category);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % serviceCategories.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + serviceCategories.length) % serviceCategories.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = serviceCategories.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    onCategoryChange(serviceCategories[nextIndex]);
  };

  return (
    <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        role="tablist"
        aria-label="Fixaro service categories"
        className="glass-panel tab-glow inline-flex min-w-max gap-2 rounded-full p-2"
      >
        {serviceCategories.map((category) => {
          const Icon = categoryIcons[category];
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={cn(
                "relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-silver transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
                isSelected
                  ? "bg-[linear-gradient(135deg,#057B80,#12C7C3)] text-white shadow-[0_0_28px_rgb(18_199_195_/_0.22)]"
                  : "hover:bg-white/[0.06] hover:text-white",
              )}
              onClick={() => onCategoryChange(category)}
              onKeyDown={(event) => handleKeyDown(event, category)}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{category}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs",
                  isSelected ? "bg-charcoal/[0.28] text-white" : "bg-white/[0.08] text-muted",
                )}
              >
                {counts[category]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
