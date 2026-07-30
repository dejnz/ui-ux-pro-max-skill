import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Bayilik Başvurusu",
  description:
    "Bölgende alarmkirala.com kurulum ve servis ağının parçası ol. Bayilik modeli ve başvuru koşulları.",
};

export default function BayilikPage() {
  return (
    <Section containerClassName="max-w-3xl">
      <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
        Bayilik
      </p>
      <h1 className="display text-4xl text-fg sm:text-5xl">
        Bölgende iş ortağımız ol
      </h1>
      <p className="mt-4 leading-relaxed text-fg-soft">
        Kurulum, servis ve keşif operasyonunu bölgesel iş ortaklarımızla
        büyütüyoruz. Elektrik/zayıf akım deneyimi olan ekipler için abonelik
        gelirinden pay modeli.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-fg">Senden beklenen</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-fg-soft">
            <li>· Teknik ekip (kurulum + servis)</li>
            <li>· Bölgesel keşif kapasitesi</li>
            <li>· Müşteri iletişim standardımıza uyum</li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-semibold text-fg">Bizden gelen</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-fg-soft">
            <li>· Donanım, envanter ve lojistik</li>
            <li>· Eğitim ve sertifikasyon</li>
            <li>· Randevu akışı ve merkezi panel</li>
          </ul>
        </Card>
      </div>
      <div className="mt-8">
        <Badge variant="amber">
          Başvuru formu FAZ 8 e-posta akışıyla bağlanacak
        </Badge>
      </div>
    </Section>
  );
}
