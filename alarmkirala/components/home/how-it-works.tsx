import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { HOW_IT_WORKS } from "@/lib/data/site";

export function HowItWorks() {
  return (
    <div className="cut-tb bg-ink-soft">
      <Section id="nasil-calisir">
        <SectionHeading
          kicker="Nasıl çalışır"
          title="Bir randevu. 90 dakika. Bitti."
          lead="Kit seçiminden telefonundan yönetime dört adım."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <li
              key={step.baslik}
              className="relative rounded-lg border border-line bg-ink p-6"
            >
              <span
                aria-hidden
                className="numeric text-4xl font-semibold text-signal/80"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold text-fg">{step.baslik}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">
                {step.aciklama}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-fg-mute">
          Süreci ayrıntısıyla görmek için{" "}
          <Link
            href="/nasil-calisir"
            className="font-medium text-fg underline decoration-signal underline-offset-4 hover:text-white"
          >
            nasıl çalışır sayfasına
          </Link>{" "}
          bak.
        </p>
      </Section>
    </div>
  );
}
