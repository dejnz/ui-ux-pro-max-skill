import Link from "next/link";
import { BatteryFull, Radio, ShieldCheck, Wifi } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { SystemActive } from "@/components/ui/system-active";
import { SITE } from "@/lib/data/site";

export function Hero() {
  return (
    <section className="cut-b relative overflow-hidden bg-ink-soft pt-16 pb-28 sm:pt-24 sm:pb-36">
      {/* İnce kırmızı çizgi vurgusu */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SystemActive className="mb-6" label="7/24 Korumada" />
          <h1 className="display text-4xl text-fg sm:text-6xl lg:text-7xl">
            Güvenliği
            <br />
            satın alma.
            <br />
            <span className="text-signal">Kirala.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-soft">
            {SITE.altSlogan}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
              Kitimi Oluştur
            </Link>
            <Link
              href="/kitler"
              className={buttonClasses({ variant: "outline", size: "lg" })}
            >
              Hazır Kitleri Gör
            </Link>
          </div>
          <p className="numeric mt-6 text-xs tracking-wide text-fg-mute">
            Kurulum 90 dk · Taşınma dahil · Sözleşme sonunda sürpriz yok
          </p>
        </div>

        {/* Hub temsili — [[DOLDUR]] lisanslı ürün görseli gelince değişecek */}
        <div className="relative mx-auto w-full max-w-sm" aria-hidden>
          <div className="absolute -inset-8 rounded-full bg-signal/5 blur-3xl" />
          <div className="relative rounded-2xl border border-line bg-ink p-8 shadow-2xl shadow-black/50">
            <div className="mb-6 flex items-center justify-between">
              <span className="numeric text-xs tracking-[0.2em] text-fg-mute uppercase">
                Hub 2 Plus
              </span>
              <SystemActive label="Sistem Aktif" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: "Korumada", tone: "text-safe" },
                { icon: Wifi, label: "LTE + Eth", tone: "text-fg-soft" },
                { icon: Radio, label: "Jeweller", tone: "text-fg-soft" },
                { icon: BatteryFull, label: "Pil %98", tone: "text-safe" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-line bg-ink-soft py-4"
                >
                  <s.icon className={`size-5 ${s.tone}`} />
                  <span className="numeric text-[10px] text-fg-mute">
                    {s.label}
                  </span>
                </div>
              ))}
              <div className="col-span-3 mt-1 flex items-center justify-between rounded-lg border border-line bg-ink-soft px-4 py-3">
                <span className="text-xs text-fg-soft">Son olay</span>
                <span className="numeric text-xs text-fg-mute">
                  Kapı kuruldu · 23:41
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
