import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { SEGMENTS } from "@/lib/data/segments";

const HIZMETLER = [
  { href: "/kit-olustur", label: "Kit Oluşturucu" },
  { href: "/kitler", label: "Hazır Kitler" },
  { href: "/cihazlar", label: "Cihaz Kataloğu" },
  { href: "/izleme-merkezi", label: "7/24 İzleme Merkezi" },
  { href: "/fiyatlar", label: "Fiyatlar" },
  { href: "/nasil-calisir", label: "Nasıl Çalışır" },
];

const YASAL = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/mesafeli-sozlesme", label: "Mesafeli Kiralama Sözleşmesi" },
  { href: "/sss", label: "SSS" },
];

export function Footer() {
  return (
    <footer className="print-hide border-t border-line bg-ink-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="Ana sayfa">
            <ShieldCheck aria-hidden className="size-6 text-signal" />
            <span className="display-soft text-lg text-fg">
              alarm<span className="text-signal">kirala</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-mute">
            {SITE.slogan} Ajax tabanlı profesyonel alarm sistemleri, aylık
            abonelikle.
          </p>
          <p className="mt-4 text-xs text-fg-mute">
            {/* [[DOLDUR]] şirket ünvanı, adres, MERSİS */}
            Şirket ünvanı · Adres · MERSİS — yayın öncesi eklenecek
          </p>
        </div>

        <FooterCol title="Hizmetler" links={HIZMETLER} />
        <FooterCol
          title="Çözümler"
          links={SEGMENTS.map((s) => ({
            href: `/cozumler/${s.slug}`,
            label: s.ad,
          }))}
        />
        <div className="space-y-8">
          <FooterCol title="Yasal" links={YASAL} />
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-fg uppercase">
              İletişim
            </h3>
            <ul className="space-y-2 text-sm text-fg-mute">
              <li>{SITE.email}</li>
              <li>{SITE.whatsapp}</li>
              <li>
                <Link href="/bayilik" className="transition-colors hover:text-fg">
                  Bayilik Başvurusu
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5">
        <p className="mx-auto max-w-6xl px-4 text-xs text-fg-mute sm:px-6">
          © {new Date().getFullYear()} alarmkirala.com — Ajax Systems tescilli
          markadır; ürün adları yetkili iş ortağı sıfatıyla tanımlama amaçlı
          kullanılmaktadır.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-fg uppercase">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-fg-mute transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
