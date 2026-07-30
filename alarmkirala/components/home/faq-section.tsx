import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { FAQ } from "@/lib/data/site";

export function FaqSection() {
  return (
    <Section id="sss" containerClassName="max-w-3xl">
      <SectionHeading
        kicker="SSS"
        title="Gizli maliyet yok. Sürpriz yok."
        align="center"
      />
      <Accordion items={FAQ} />
      <p className="mt-8 text-center text-sm text-fg-mute">
        Cevabını bulamadın mı?{" "}
        <Link
          href="/iletisim"
          className="font-medium text-fg underline decoration-signal underline-offset-4 hover:text-white"
        >
          Bize yaz
        </Link>{" "}
        — mesai saatlerinde 15 dakikada döneriz.
      </p>
    </Section>
  );
}
