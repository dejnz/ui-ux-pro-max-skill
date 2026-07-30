import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Müşteri yorumları — brief §3.5: isim + ilçe + segment.
 * [[DOLDUR]]: Gerçek müşteri yorumları eklenene kadar bölüm placeholder
 * iskeletiyle yayınlanır; uydurma yorum KULLANILMAZ.
 */
export function Testimonials() {
  return (
    <Section id="yorumlar">
      <SectionHeading
        kicker="Müşterilerimiz"
        title="Gerçek adres, gerçek deneyim"
        lead="Yorumlar isim, ilçe ve segment bilgisiyle yayınlanır — anonim övgü değil."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} aria-hidden className="select-none">
            <Quote className="mb-4 size-6 text-line" />
            <div className="space-y-2.5">
              <div className="h-3 w-full rounded bg-line/60" />
              <div className="h-3 w-5/6 rounded bg-line/60" />
              <div className="h-3 w-2/3 rounded bg-line/60" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-line/60" />
                <div className="h-2 w-16 rounded bg-line/40" />
              </div>
              <Badge variant="amber">[[DOLDUR]]</Badge>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-xs text-fg-mute">
        Bu bölüm, ilk gerçek müşteri yorumları toplandığında yayına alınacak.
      </p>
    </Section>
  );
}
