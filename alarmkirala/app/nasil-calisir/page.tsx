import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/button";
import { HOW_IT_WORKS } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Nasıl Çalışır — Bir randevu. 90 dakika. Bitti.",
  description:
    "Kit seçiminden telefonundan yönetime: alarm kiralama süreci 4 adımda. Kurulum, sözleşme ve ödeme akışının tamamı.",
};

const DETAYLAR = [
  [
    "Hazır kitlerden seç ya da kit oluşturucuda mekânını tarif et.",
    "Öneri motoru cihaz listeni 'neden bu cihaz?' açıklamalarıyla kurar.",
    "Fiyat canlı: cihaz ekle-çıkar, aylık toplamı anında gör.",
  ],
  [
    "Takvimden uygun gün ve saat aralığını seç.",
    "Sözleşme dijital hazırlanır, e-imza ile onaylarsın.",
    "İlk ödeme kurulum onayından sonra alınır.",
  ],
  [
    "Teknisyen cihazları yerleştirir — kablosuz, delme yok.",
    "Sistem test edilir: her sensör, siren ve bağlantı doğrulanır.",
    "Uygulama telefonuna kurulur, kullanıcılar tanımlanır.",
  ],
  [
    "Kur / çöz / gece modu tek dokunuşla.",
    "Alarmda bildirim + fotoğraf doğrulama.",
    "Batarya, sinyal ve olay geçmişi hesabından izlenir.",
  ],
] as const;

export default function NasilCalisirPage() {
  return (
    <>
      <Section>
        <div className="mb-12 max-w-2xl">
          <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
            Nasıl çalışır
          </p>
          <h1 className="display text-4xl text-fg sm:text-5xl">
            Bir randevu. 90 dakika. Bitti.
          </h1>
          <p className="mt-4 text-fg-soft">
            Karar verdiğin andan itibaren süreç bizde. Sen sadece kapıyı aç.
          </p>
        </div>

        <ol className="space-y-6">
          {HOW_IT_WORKS.map((step, i) => (
            <li
              key={step.baslik}
              className="grid gap-4 rounded-lg border border-line bg-ink-soft p-6 sm:grid-cols-[8rem_1fr]"
            >
              <div>
                <span className="numeric text-5xl font-semibold text-signal/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-semibold text-fg">{step.baslik}</h2>
              </div>
              <div>
                <p className="leading-relaxed text-fg-soft">{step.aciklama}</p>
                <ul className="mt-4 space-y-1.5">
                  {DETAYLAR[i].map((d) => (
                    <li key={d} className="text-sm text-fg-mute">
                      · {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* [[DOLDUR]] tanıtım videosu */}
        <p className="mt-8 text-xs text-fg-mute">
          Süreç videosu çekildiğinde bu sayfaya eklenecek.
        </p>
      </Section>

      <Section className="cut-t bg-ink-soft" containerClassName="text-center">
        <SectionHeading
          align="center"
          title="Adres değişir, koruma değişmez."
          lead="Taşınma, bakım ve donanım yenileme abonelik boyunca bizde."
        />
        <Link href="/kit-olustur" className={buttonClasses({ size: "lg" })}>
          Kitimi Oluştur
        </Link>
      </Section>
    </>
  );
}
