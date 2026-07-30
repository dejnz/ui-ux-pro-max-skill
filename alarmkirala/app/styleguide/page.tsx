import type { Metadata } from "next";
import { Bell, ShieldCheck, Truck } from "lucide-react";
import { Badge, ExamplePriceBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, HoverCard } from "@/components/ui/card";
import { DeviceGlyph } from "@/components/ui/device-glyph";
import { Section, SectionHeading } from "@/components/ui/section";
import { SystemActive } from "@/components/ui/system-active";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
};

const COLORS = [
  { name: "--ink", value: "#0B0D10", use: "Ana koyu zemin" },
  { name: "--ink-soft", value: "#14181D", use: "Kart / bölüm zemini" },
  { name: "--signal", value: "#E8371C", use: "Ana aksiyon (sinyal kırmızısı)" },
  { name: "--signal-dim", value: "#B32612", use: "Hover" },
  { name: "--amber", value: "#FFB020", use: "Uyarı / dikkat rozetleri" },
  { name: "--safe", value: "#17B26A", use: "Sistem aktif / korumada" },
  { name: "--paper", value: "#F5F6F7", use: "Açık bölümler" },
  { name: "--line", value: "#262C33", use: "Ayraç" },
];

export default function StyleguidePage() {
  return (
    <>
      <Section className="border-b border-line">
        <p className="numeric mb-2 text-xs tracking-[0.2em] text-signal uppercase">
          FAZ 1 · Tasarım Sistemi
        </p>
        <h1 className="display text-4xl sm:text-5xl">Styleguide</h1>
        <p className="mt-4 max-w-2xl text-fg-soft">
          alarmkirala.com kurumsal kimliği: koyu grafit zemin, seyrek ve vurucu
          sinyal kırmızısı, condensed başlıklar, mono sayılar. Kırmızı yalnızca
          aksiyon ve alarm durumu için kullanılır.
        </p>
      </Section>

      <Section>
        <SectionHeading kicker="01" title="Renk Paleti" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {COLORS.map((c) => (
            <Card key={c.name} className="p-4">
              <div
                className="mb-3 h-16 rounded-md border border-line"
                style={{ backgroundColor: c.value }}
              />
              <p className="numeric text-sm text-fg">{c.name}</p>
              <p className="numeric text-xs text-fg-mute">{c.value}</p>
              <p className="mt-1 text-xs text-fg-soft">{c.use}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading kicker="02" title="Tipografi" />
        <div className="space-y-8">
          <div>
            <Badge variant="mono">Archivo · display · uppercase</Badge>
            <p className="display mt-3 text-4xl sm:text-6xl">
              Güvenliği satın alma. Kirala.
            </p>
          </div>
          <div>
            <Badge variant="mono">Inter · gövde</Badge>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-fg-soft">
              Sen dili. Kısa cümle. Teknik terim kullanılıyorsa hemen yanında tek
              satır sade karşılığı. Korku pazarlaması yok — kontrol sende dili.
            </p>
          </div>
          <div>
            <Badge variant="mono">JetBrains Mono · sayı/veri</Badge>
            <p className="numeric mt-3 text-3xl text-fg">
              ₺1.249<span className="text-base text-fg-mute">/ay</span>{" "}
              <span className="text-base text-safe">· 2 km menzil · 7 yıl pil</span>
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading kicker="03" title="Butonlar & Rozetler" />
        <div className="flex flex-wrap items-center gap-4">
          <Button>Kitimi Oluştur</Button>
          <Button variant="outline">Hazır Kitleri Gör</Button>
          <Button variant="safe">Randevu Al</Button>
          <Button variant="ghost">Vazgeç</Button>
          <Button size="lg">Büyük CTA</Button>
          <Button size="sm">Küçük</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge>EN 50131</Badge>
          <Badge variant="signal">Alarm</Badge>
          <Badge variant="safe">Korumada</Badge>
          <Badge variant="amber">Batarya düşük</Badge>
          <ExamplePriceBadge />
          <SystemActive />
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading kicker="04" title="Kartlar & Glifler" />
        <div className="grid gap-4 sm:grid-cols-3">
          <HoverCard>
            <ShieldCheck className="mb-3 size-6 text-signal" aria-hidden />
            <h3 className="font-semibold text-fg">Hover kartı</h3>
            <p className="mt-1 text-sm text-fg-soft">
              Hafif kalkış + kenar aydınlanması. 200ms.
            </p>
          </HoverCard>
          <HoverCard>
            <Bell className="mb-3 size-6 text-amber" aria-hidden />
            <h3 className="font-semibold text-fg">İkonografi</h3>
            <p className="mt-1 text-sm text-fg-soft">
              Lucide, 1.5px stroke, tek renk. Emoji yok.
            </p>
          </HoverCard>
          <HoverCard>
            <Truck className="mb-3 size-6 text-safe" aria-hidden />
            <h3 className="font-semibold text-fg">Taşınma</h3>
            <p className="mt-1 text-sm text-fg-soft">
              Adres değişir, koruma değişmez.
            </p>
          </HoverCard>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <DeviceGlyph kategori="hub" />
          <DeviceGlyph kategori="hareket" />
          <DeviceGlyph kategori="yangin" />
          <DeviceGlyph kategori="su" />
          <DeviceGlyph kategori="siren" />
          <DeviceGlyph kategori="kontrol" />
        </div>
      </Section>

      <div className="cut-t bg-ink-soft">
        <Section>
          <SectionHeading
            kicker="05"
            title="Diagonal Kesim"
            lead="Bölüm geçişlerinde ana motif: .cut-t / .cut-b / .cut-tb yardımcı sınıfları. Mobilde kesim açısı otomatik küçülür."
          />
          <div className="signal-rule max-w-xl text-fg-soft">
            İnce kırmızı çizgi vurgusu: koyu zemin üzerinde seyrek kullanılan
            sinyal detayı.
          </div>
        </Section>
      </div>
    </>
  );
}
