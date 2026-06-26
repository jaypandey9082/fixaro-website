import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/seo";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="container-premium pt-28 sm:pt-32">
        <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? <ChevronRight aria-hidden="true" size={14} className="text-aqua/70" /> : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full px-1 py-1 transition hover:text-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
                  >
                    {index === 0 ? <Home aria-hidden="true" size={14} /> : null}
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-silver">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
