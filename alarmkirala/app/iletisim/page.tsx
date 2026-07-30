import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Soru, teklif ve destek için bize ulaş. Mesai saatlerinde 15 dakikada döneriz.",
};

export default function IletisimPage() {
  return (
    <Section containerClassName="max-w-3xl">
      <div className="mb-10">
        <p className="numeric mb-3 text-xs tracking-[0.2em] text-signal uppercase">
          İletişim
        </p>
        <h1 className="display text-4xl text-fg sm:text-5xl">Bize ulaş</h1>
        <p className="mt-4 text-fg-soft">
          Teklif, destek veya bayilik — hangi kanaldan istersen.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <MessageCircle className="mb-3 size-6 text-safe" aria-hidden />
          <h2 className="font-semibold text-fg">WhatsApp</h2>
          <p className="numeric mt-1 text-sm text-fg-soft">{SITE.whatsapp}</p>
        </Card>
        <Card>
          <Phone className="mb-3 size-6 text-signal" aria-hidden />
          <h2 className="font-semibold text-fg">Telefon</h2>
          <p className="numeric mt-1 text-sm text-fg-soft">{SITE.whatsapp}</p>
        </Card>
        <Card>
          <Mail className="mb-3 size-6 text-amber" aria-hidden />
          <h2 className="font-semibold text-fg">E-posta</h2>
          <p className="mt-1 text-sm text-fg-soft">{SITE.email}</p>
        </Card>
      </div>
      <p className="mt-6 text-xs text-fg-mute">
        {/* [[DOLDUR]] gerçek iletişim bilgileri + iletişim formu (FAZ 8 e-posta akışı) */}
        İletişim formu, e-posta altyapısıyla (Resend) FAZ 8'de bağlanacak.
      </p>
    </Section>
  );
}
