import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "Alarm kiralama hakkında merak edilenler: sözleşme sonu, taşınma, kurulum, ödeme askıya alma ve daha fazlası.",
};

export default function SssPage() {
  return (
    <Section containerClassName="max-w-3xl">
      <div className="mb-10">
        <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
          SSS
        </p>
        <h1 className="display text-4xl text-fg sm:text-5xl">
          Sıkça sorulan sorular
        </h1>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.soru,
              acceptedAnswer: { "@type": "Answer", text: f.cevap },
            })),
          }),
        }}
      />
      <Accordion items={FAQ} />
    </Section>
  );
}
