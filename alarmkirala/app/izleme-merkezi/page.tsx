import type { Metadata } from "next";
import Link from "next/link";
import { Headset, ShieldCheck, Siren } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Monitoring } from "@/components/home/monitoring";

export const metadata: Metadata = {
  title: "7/24 İzleme Merkezi — Alarm çalarsa yalnız değilsin",
  description:
    "Alarm anında operatör doğrulaması, kolluk bildirimi ve mobil müdahale. İzleme merkezi hizmetinin dakika dakika akışı.",
};

export default function IzlemeMerkeziPage() {
  return (
    <>
      <Section>
        <div className="mb-12 max-w-2xl">
          <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
            7/24 izleme merkezi
          </p>
          <h1 className="display text-4xl text-fg sm:text-5xl">
            Alarm çalarsa yalnız değilsin.
          </h1>
          <p className="mt-4 text-fg-soft">
            Sistem alarmı sana bildirir; izleme merkezi aboneliği olayı bir
            insana teslim eder: doğrular, arar, gerekirse müdahale başlatır.
          </p>
          {/* [[DOLDUR]] izleme merkezi: kendi merkez mi, anlaşmalı firma mı */}
          <div className="mt-4">
            <Badge variant="amber">
              [[DOLDUR]] İzleme merkezi anlaşması ve ücreti netleşecek
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Headset,
              baslik: "İnsan doğrulaması",
              metin:
                "Her alarmı bir operatör inceler; fotoğraf doğrulamalı cihazlarda olay karelerini görür. Yanlış alarm sana yansımadan elenir.",
            },
            {
              icon: Siren,
              baslik: "Kolluk bildirimi",
              metin:
                "Doğrulanan olay, konum ve olay özeti ile kolluk kuvvetine bildirilir. Sen yoldayken süreç başlamış olur.",
            },
            {
              icon: ShieldCheck,
              baslik: "Mobil müdahale",
              metin:
                "Ek pakette en yakın devriye adresine yönlendirilir; sen gelene kadar mülkün gözetim altındadır.",
            },
          ].map((item) => (
            <div key={item.baslik} className="rounded-lg border border-line bg-ink-soft p-6">
              <item.icon className="mb-3 size-6 text-signal" aria-hidden />
              <h2 className="font-semibold text-fg">{item.baslik}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">
                {item.metin}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Monitoring />

      <Section containerClassName="text-center">
        <SectionHeading
          align="center"
          title="İzleme merkezini kitine ekle"
          lead="Kit oluşturucunun ek hizmetler adımında tek tıkla eklenir."
        />
        <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
          Kitimi Oluştur
        </Link>
      </Section>
    </>
  );
}
