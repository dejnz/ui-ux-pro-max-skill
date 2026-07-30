import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { WhyRent } from "@/components/home/why-rent";
import { HowItWorks } from "@/components/home/how-it-works";
import { KitsPreview } from "@/components/home/kits-preview";
import { ConfiguratorTeaser } from "@/components/home/configurator-teaser";
import { SegmentsGrid } from "@/components/home/segments-grid";
import { DeviceShowcase } from "@/components/home/device-showcase";
import { RentVsBuy } from "@/components/home/rent-vs-buy";
import { Monitoring } from "@/components/home/monitoring";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { FAQ } from "@/lib/data/site";

/** FAQPage + LocalBusiness schema.org — brief §8 SEO gereksinimi */
function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "alarmkirala.com",
        description:
          "Ajax tabanlı profesyonel kablosuz alarm sistemlerini aylık abonelikle kiralayan platform.",
        url: "https://alarmkirala.com",
        // [[DOLDUR]] adres, telefon, hizmet bölgesi
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.soru,
          acceptedAnswer: { "@type": "Answer", text: f.cevap },
        })),
      },
    ],
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <Hero />
      <TrustStrip />
      <WhyRent />
      <HowItWorks />
      <KitsPreview />
      <ConfiguratorTeaser />
      <SegmentsGrid />
      <DeviceShowcase />
      <RentVsBuy />
      <Monitoring />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
