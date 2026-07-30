import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge, ExamplePriceBadge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { RentVsBuy } from "@/components/home/rent-vs-buy";
import { ADDON_SERVICES, TERM_DISCOUNTS } from "@/lib/pricing";
import { formatTL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fiyatlar — Gizli maliyet yok, sürpriz yok",
  description:
    "Aylık kira = cihaz toplamı × süre indirimi. Bakım, pil, arıza değişimi ve taşınma dahil. Kirala vs satın al hesaplayıcısıyla 5 yıllık maliyeti karşılaştır.",
};

const DAHIL = [
  "Bakım ve periyodik kontrol",
  "Pil değişimi",
  "Arızalı cihaz değişimi",
  "Yazılım güncellemeleri",
  "Mobil uygulama",
  "Taşınma hakkı (yılda 1)",
];

export default function FiyatlarPage() {
  return (
    <>
      <Section>
        <div className="mb-12 max-w-2xl">
          <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
            Fiyatlandırma
          </p>
          <h1 className="display text-4xl text-fg sm:text-5xl">
            Gizli maliyet yok. Sözleşme sonunda sürpriz yok.
          </h1>
          <p className="mt-4 text-fg-soft">
            Tek formül:{" "}
            <span className="numeric text-fg">
              aylık kira = cihaz toplamı × süre indirimi
            </span>
            . Kurulum bedeli tek seferliktir; kampanya dönemlerinde ücretsizdir.
          </p>
          <div className="mt-4">
            <ExamplePriceBadge />
          </div>
        </div>

        {/* 3 sütunlu süre karşılaştırması */}
        <div className="grid gap-4 sm:grid-cols-3">
          {([12, 24, 36] as const).map((term) => (
            <div
              key={term}
              className={
                term === 24
                  ? "rounded-lg border border-signal bg-signal/5 p-6"
                  : "rounded-lg border border-line bg-ink-soft p-6"
              }
            >
              {term === 24 && <Badge variant="signal">En popüler</Badge>}
              <p className="numeric mt-2 text-4xl font-semibold text-fg">
                {term}
                <span className="text-lg font-normal text-fg-mute"> ay</span>
              </p>
              <p className="mt-2 text-sm text-fg-soft">
                {TERM_DISCOUNTS[term] > 0 ? (
                  <>
                    Cihaz toplamında{" "}
                    <span className="font-semibold text-safe">
                      %{Math.round(TERM_DISCOUNTS[term] * 100)} indirim
                    </span>
                  </>
                ) : (
                  "Standart aylık fiyat"
                )}
              </p>
              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {DAHIL.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-fg-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-safe" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-ink-soft p-6">
            <h2 className="font-semibold text-fg">Ek ücretli hizmetler</h2>
            <ul className="mt-4 space-y-3">
              {ADDON_SERVICES.map((a) => (
                <li key={a.id} className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-fg">{a.ad}</p>
                    <p className="text-xs text-fg-mute">{a.aciklama}</p>
                  </div>
                  <span className="numeric shrink-0 text-sm text-fg-soft">
                    +₺{formatTL(a.aylikTL)}/ay
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-ink-soft p-6">
            <h2 className="font-semibold text-fg">Sözleşme sonunda ne olur?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-fg-soft">
              <li>
                <strong className="text-fg">Yenile:</strong> güncel donanımla devam
                et; sadakat indirimi uygulanır.
              </li>
              <li>
                <strong className="text-fg">İade et:</strong> ekibimiz söker, teslim
                alırsın — ek ücret yok.
              </li>
              <li>
                <strong className="text-fg">Satın al:</strong> cihazları sembolik
                bedelle devral.
              </li>
            </ul>
            <p className="mt-4 text-xs text-fg-mute">
              Erken çıkış ve cayma bedeli politikası sözleşmede net yazar.
              {/* [[DOLDUR]] erken çıkış oranı */}
            </p>
          </div>
        </div>
      </Section>

      <RentVsBuy />

      <Section className="border-t border-line" containerClassName="text-center">
        <SectionHeading
          align="center"
          title="Kendi fiyatını 2 dakikada gör"
          lead="Kit oluşturucu, mekânına göre sistemini kurar ve canlı fiyat gösterir."
        />
        <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
          Kitimi Oluştur
        </Link>
      </Section>
    </>
  );
}
