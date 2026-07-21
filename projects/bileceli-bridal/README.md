# Bileceli Bridal — Web Sitesi

Sone Moda | Baran Bileceli gelinlik atölyesi için çok sayfalı statik web sitesi.
Tasarım dili: altın `#D4AF37` · koyu `#1C1C1E` · zemin `#FAFAF9` — Cinzel (logo/etiket),
Playfair Display (başlık), Manrope (metin).

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | Ana sayfa (dikey tam ekran Swiper: hero, koleksiyon, gelinlerimiz, süreç, hakkımızda) |
| `koleksiyonlar.html` | Gelinlik · Haute Couture · After Party (`#gelinlik`, `#haute-couture`, `#after-party`) |
| `gelinlerimiz.html` | Masonry galeri + lightbox |
| `blog.html` | Blog listeleme (öne çıkan + kartlar) |
| `blog-gelinlik-secim-rehberi.html` | Makale: vücut tipine göre silüet rehberi |
| `blog-prova-sureci.html` | Makale: 6 adımda prova süreci |
| `blog-2026-trendleri.html` | Makale: 2026 trendleri |
| `randevu.html` | Randevu formu (WhatsApp'a iletir) + iletişim (`#iletisim`) + SSS (`#sss`) |
| `kariyer.html` | Kariyer |
| `gizlilik.html`, `kvkk.html`, `cerez.html` | Kurumsal metinler (yayın öncesi hukuk kontrolü önerilir) |

Alt sayfalar `assets/site.css` + `assets/site.js` ortak altyapısını kullanır;
`index.html` kendi gömülü stil/scriptiyle bağımsızdır.

## Yayına almadan önce yapılacaklar

1. **WhatsApp numarası** — iki yerde güncelleyin:
   - `index.html` içinde `WHATSAPP_NUMBER` sabiti
   - `assets/site.js` içinde `WHATSAPP_NUMBER` sabiti
2. **Telefon** — `tel:+905000000000` geçen yerleri gerçek numarayla değiştirin.
3. **Adres** — `randevu.html` içindeki örnek adresi güncelleyin.
4. **E-posta** — `bilgi@bileceli.com` / `kariyer@bileceli.com` adreslerini doğrulayın.
5. **Görseller** — `assets/` klasöründeki placeholder'ları gerçek fotoğraflarla değiştirin
   (liste: `assets/README.md`). `assets/herovid.mp4` hero videosunu ekleyin.
6. **Kurumsal metinler** — gizlilik/KVKK/çerez sayfalarını hukuk danışmanınıza onaylatın.
7. `index.html` Tailwind'i CDN'den yükler; trafik büyürse derlenmiş Tailwind'e geçmek önerilir.

## Lokal önizleme

```bash
npx http-server projects/bileceli-bridal -p 8080
# http://localhost:8080
```
