import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LocalSeoPage } from "@/components/LocalSeoPage";
import { getLocalBusinessJsonLd, getLocalPageConfig, getLocalPageFaqs, localPageMetadata } from "@/lib/seo";

const config = getLocalPageConfig("service");
const faqs = getLocalPageFaqs("service");

export const metadata: Metadata = localPageMetadata(config);

export default function AcServiceBangalorePage() {
  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: config.h1 }]} />
      <LocalSeoPage config={config} faqs={faqs} />
    </>
  );
}
