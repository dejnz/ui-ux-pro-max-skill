import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="cut-t relative overflow-hidden bg-ink-soft py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent"
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="display text-4xl text-fg sm:text-5xl">
          Kur, kirala, <span className="text-signal">güvende kal.</span>
        </h2>
        <p className="mt-4 text-lg text-fg-soft">
          Ayda sabit ücret. Ömür boyu tetikte.
        </p>
        <div className="mt-8">
          <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
            Kitimi Oluştur
          </Link>
        </div>
      </div>
    </section>
  );
}
