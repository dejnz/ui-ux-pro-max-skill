import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { WHY_RENT } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "alarmkirala.com: profesyonel güvenliği sahiplik zorunluluğundan ayıran abonelik platformu.",
};

export default function HakkimizdaPage() {
  return (
    <Section containerClassName="max-w-3xl">
      <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
        Hakkımızda
      </p>
      <h1 className="display text-4xl text-fg sm:text-5xl">
        Sistem bizden, huzur sizden.
      </h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-soft">
        <p>
          alarmkirala.com, profesyonel alarm sistemini bir sahiplik ürünü
          olmaktan çıkarıp bir hizmete dönüştürmek için kuruldu. Ajax Systems
          donanımını aylık abonelikle kiralıyor; kurulumdan bakıma, taşınmadan
          donanım yenilemeye kadar tüm yaşam döngüsünü tek sözleşmede
          üstleniyoruz.
        </p>
        <p>
          Korku pazarlaması yapmıyoruz. "Evin soyulacak" değil, "kontrol sende"
          diyoruz: net fiyat, net sözleşme, net süreç.
        </p>
      </div>
      <ul className="mt-8 space-y-2">
        {WHY_RENT.map((w) => (
          <li key={w.engel} className="signal-rule text-sm text-fg-soft">
            <strong className="text-fg">{w.cevap}.</strong> {w.cevapDetay}
          </li>
        ))}
      </ul>
      {/* [[DOLDUR]] şirket bilgisi, ekip, sertifikalar */}
      <p className="mt-8 text-xs text-fg-mute">
        Şirket ünvanı, sertifikalar ve ekip bilgisi yayın öncesi eklenecek.
      </p>
    </Section>
  );
}
