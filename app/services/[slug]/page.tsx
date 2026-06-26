import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ServiceDetailContent } from "@/components/ServiceDetailContent";
import { ServiceDetailHero } from "@/components/ServiceDetailHero";
import { services } from "@/lib/data";
import {
  getLocalBusinessJsonLd,
  getServiceBySlug,
  getServiceFaqs,
  getServiceJsonLd,
  serviceMetadata,
} from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return serviceMetadata(service);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: service.name },
  ];
  const faqs = getServiceFaqs(service);

  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <JsonLd data={getServiceJsonLd(service)} />
      <Breadcrumbs items={breadcrumbs} />
      <ServiceDetailHero service={service} />
      <ServiceDetailContent service={service} faqs={faqs} />
    </>
  );
}
