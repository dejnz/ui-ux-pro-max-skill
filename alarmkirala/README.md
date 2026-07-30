# alarmkirala.com

Ajax Systems tabanlı profesyonel kablosuz alarm sistemlerini **satın alma
zorunluluğu olmadan aylık abonelikle** kiralatan SaaS platformu.

> Güvenliği satın alma. Kirala.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim derlemesi
npm run typecheck  # tsc --noEmit
```

Gereksinim: Node 20+. Veritabanı olmadan tüm sayfalar statik/istemci veriyle
çalışır (`lib/data/*`).

### Veritabanı (opsiyonel, FAZ 2 şeması)

```bash
npm i -D prisma tsx && npm i @prisma/client
export DATABASE_URL=postgresql://...
npx prisma migrate dev
npm run db:seed    # Ajax katalog + kitleri yükler, eksik veri listesini konsola basar
```

## Faz durumu

| Faz | Kapsam | Durum |
|-----|--------|-------|
| 1 | Kurulum + tasarım sistemi (`/styleguide`) | ✅ |
| 2 | Prisma şeması + seed (envanter/sözleşme yaşam döngüleri dahil) | ✅ şema hazır, DB bağlanınca migrate |
| 3 | Ana sayfa — 14 bölüm | ✅ |
| 4 | Kit oluşturucu — 8 adım + öneri motoru + canlı fiyat + kaydet/paylaş/PDF | ✅ (randevu→sözleşme→ödeme FAZ 8'e bağlanacak) |
| 5 | Katalog: kitler, cihazlar, 7 çözüm landing'i, fiyatlar, SSS, izleme merkezi | ✅ |
| 6 | Müşteri paneli (`/hesap`) | ⬜ |
| 7 | Admin paneli + seri no envanter | ⬜ |
| 8 | Ödeme (iyzico/PayTR recurring), e-imza, Resend e-posta | ⬜ |
| 9 | KVKK metinleri, i18n açılışı, Lighthouse turu | ⬜ kısmen (schema.org, sitemap, robots, reduced-motion hazır) |

## Mimari notlar

- **Tek doğruluk kaynağı:** `lib/data/*` — cihazlar, kitler, segmentler,
  SSS. UI ve Prisma seed aynı modülden beslenir.
- **Öneri motoru:** `lib/recommendation.ts` — brief §4.3 kuralları birebir;
  her cihaz için "neden bu cihaz?" gerekçesi üretir.
- **Fiyat modeli:** `lib/pricing.ts` — `aylık = cihaz toplamı × süre indirimi`,
  hub kapasite/uyumluluk doğrulaması, kirala-vs-satın-al projeksiyonu.
- **Tasarım tokenları:** `app/globals.css` (`@theme`) — grafit zemin, sinyal
  kırmızısı yalnızca aksiyon/alarm, diagonal kesimler (`.cut-*`),
  Archivo/Inter/JetBrains Mono.
- **Kırmızı kural:** `--signal` yalnızca aksiyon ve alarm durumunda. Durum
  yeşili `--safe`, uyarı `--amber`.

## ⚠️ Eksik veri ([[DOLDUR]])

Tüm fiyatlar **örnek placeholder'dır** ve UI'da "örnek fiyat" rozetiyle
işaretlenir. Yayın öncesi zorunlu liste (`lib/data/site.ts → MISSING_DATA`):

1. Ajax distribütör/bayi statüsü ve marka + görsel kullanım izni
2. Kit içerikleri ve aylık kira fiyatları
3. Süre indirim oranları (12/24/36 ay)
4. Kurulum bedeli ve kapsamı
5. 7/24 izleme merkezi anlaşması ve ücreti
6. Hizmet verilen iller/ilçeler
7. Şirket ünvanı, vergi no, adres, MERSİS
8. Depozito politikası
9. Erken çıkış / cayma bedeli oranı
10. Sertifikalar (TSE, ISO, EN 50131, özel güvenlik izni)
11. Logo / kurumsal kimlik
12. Ödeme sağlayıcı (iyzico/PayTR) recurring anlaşması
13. Gerçek müşteri yorumları (isim + ilçe + segment)
14. WhatsApp Business numarası

Müşteri yorumları bölümü placeholder iskelet olarak yayınlanır — uydurma
yorum kullanılmaz (brief kuralı: **UYDURMA**).
