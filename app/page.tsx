import { BookingForm } from "@/components/BookingForm";
import { FAQSection } from "@/components/FAQSection";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PricingTable } from "@/components/PricingTable";
import { ProblemGrid } from "@/components/ProblemGrid";
import { ServiceCategories } from "@/components/ServiceCategories";
import { ServiceAreas } from "@/components/ServiceAreas";
import { TrustBar } from "@/components/TrustBar";
import { WarrantySection } from "@/components/WarrantySection";
import { getLocalBusinessJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <Hero />
      <TrustBar />
      <ServiceCategories />
      <PricingTable />
      <ProblemGrid />
      <WarrantySection />
      <ServiceAreas />
      <BookingForm />
      <FAQSection />
    </>
  );
}
