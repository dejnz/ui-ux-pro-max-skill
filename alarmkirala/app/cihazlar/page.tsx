import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { DeviceCatalog } from "@/components/device-catalog";

export const metadata: Metadata = {
  title: "Cihaz Kataloğu — Ajax alarm cihazları kirada",
  description:
    "Hub'lardan hareket dedektörlerine, yangın sensörlerinden sirenlere: kiralayabileceğin tüm Ajax cihazları, aylık fiyatlarıyla.",
};

export default function CihazlarPage() {
  return (
    <Section>
      <div className="mb-10 max-w-2xl">
        <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
          Cihaz kataloğu
        </p>
        <h1 className="display text-4xl text-fg sm:text-5xl">
          Sistemin yapı taşları
        </h1>
        <p className="mt-4 text-fg-soft">
          Her cihaz tekil seri numarasıyla takip edilir; bakım, pil ve arıza
          değişimi kiraya dahildir.
        </p>
      </div>
      <DeviceCatalog />
    </Section>
  );
}
