/** Site geneli sabitler: slogan, nav, güven unsurları, SSS — brief §3, §9 */

export const SITE = {
  name: "alarmkirala.com",
  slogan: "Güvenliği satın alma. Kirala.",
  altSlogan:
    "Ajax tabanlı profesyonel alarm sistemi: sıfır yatırım, aylık sabit ücret, kurulum ve bakım bizden.",
  /** [[DOLDUR]] gerçek telefon / WhatsApp numarası */
  whatsapp: "+90 5XX XXX XX XX",
  email: "destek@alarmkirala.com",
} as const;

export const NAV_LINKS = [
  { href: "/kitler", label: "Hazır Kitler" },
  { href: "/cihazlar", label: "Cihazlar" },
  { href: "/cozumler/ev", label: "Çözümler" },
  { href: "/fiyatlar", label: "Fiyatlar" },
  { href: "/nasil-calisir", label: "Nasıl Çalışır" },
  { href: "/sss", label: "SSS" },
] as const;

/** Brief §1 — 4 engel / 4 cevap */
export const WHY_RENT = [
  {
    engel: "Yüksek peşin maliyet",
    detay: "25.000–80.000 TL peşin donanım yatırımı",
    cevap: "Sıfır yatırım, aylık sabit ücret",
    cevapDetay:
      "Donanım bedeli yok. Bütçeni bloke etmeden ilk günden tam koruma.",
  },
  {
    engel: '"Ya taşınırsam?"',
    detay: "Kalıcı montaj, duvarda kalan yatırım",
    cevap: "Sistem söküp yeni adrese taşınır",
    cevapDetay:
      "Yılda 1 taşınma aboneliğe dahil. Adres değişir, koruma değişmez.",
  },
  {
    engel: "Teknoloji eskir",
    detay: "5 yıl sonra demode cihazlarla kalırsın",
    cevap: "Donanım yenileme aboneliğe dahil",
    cevapDetay:
      "Cihazların güncel kalır; yeni nesil donanıma abonelik içinde geçersin.",
  },
  {
    engel: "Arıza / bakım derdi",
    detay: "Servis ücreti, pil değişimi, garanti takibi",
    cevap: "Bakım ve değişim bizde",
    cevapDetay:
      "Pil, bakım ve arızalı cihaz değişimi ücretsiz. Sen sadece uygulamayı aç.",
  },
] as const;

/** Brief §9 — Nasıl çalışır, 4 adım */
export const HOW_IT_WORKS = [
  {
    baslik: "Kitini seç",
    aciklama:
      "Hazır kitlerden birini al ya da kit oluşturucuyla evini tarif et — sistemini biz kurgulayalım.",
  },
  {
    baslik: "Randevu al",
    aciklama:
      "Online takvimden sana uyan günü seç. Sözleşme ve ödeme dijital — evrak koşturması yok.",
  },
  {
    baslik: "90 dakikada kurulum",
    aciklama:
      "Teknisyen ekibimiz kablosuz sistemi kurar, test eder, uygulamayı telefonuna tanımlar.",
  },
  {
    baslik: "Telefonundan yönet",
    aciklama:
      "Kur, çöz, izle. Alarm anında bildirim + fotoğraf doğrulama. 7/24 destek arkanda.",
  },
] as const;

/** Brief §3.5 — güven unsurları. [[DOLDUR]] gerçek sertifika/sayaç verisi */
export const TRUST_ITEMS = [
  { label: "Ajax yetkili iş ortağı", doldur: true },
  { label: "EN 50131 sertifikalı donanım", doldur: true },
  { label: "7/24 izleme merkezi bağlantısı", doldur: true },
  { label: "Kurulum garantisi", doldur: true },
] as const;

/** Brief §9 — cihaz vitrini: Ajax teknoloji kanıtları */
export const TECH_PROOFS = [
  { deger: "2 km", aciklama: "Jeweller radyo menzili — açık alanda" },
  { deger: "7 yıl", aciklama: "Pil ömrü — kablo yok, şarj derdi yok" },
  { deger: "0,15 sn", aciklama: "Alarm sinyali iletim süresi" },
  { deger: "113 dB", aciklama: "Dış siren ses seviyesi" },
] as const;

export const FAQ = [
  {
    soru: "Kiralama gerçekten satın almaktan mantıklı mı?",
    cevap:
      "Satın almada donanım, kurulum, bakım ve 5 yılda bir yenileme cebinden çıkar. Kiralamada tek kalem ödersin: aylık sabit ücret. Bakım, pil, arıza değişimi ve donanım yenileme dahildir. Fiyatlar sayfasındaki hesaplayıcıyla 5 yıllık toplam maliyeti karşılaştırabilirsin.",
  },
  {
    soru: "Sözleşme bitince ne olur?",
    cevap:
      "Üç seçenek: yenilersin, cihazları iade edersin ya da sembolik bedelle satın alırsın. Sözleşme sonunda sürpriz yok — seçenekler ilk günden yazılıdır.",
  },
  {
    soru: "Taşınırsam ne olacak?",
    cevap:
      "Taşınma hakkı aboneliğe dahildir (yılda 1). Talep aç, ekibimiz sistemi söker ve yeni adresine kurar. Sözleşmen adres güncellemesiyle devam eder.",
  },
  {
    soru: "Kurulum evime zarar verir mi?",
    cevap:
      "Hayır. Ajax cihazları kablosuzdur ve çoğu yapıştırmalı montajla takılır. Kiralık evde ev sahibinden izin gerektirecek bir tadilat yapılmaz.",
  },
  {
    soru: "Alarm çalarsa ne olur?",
    cevap:
      "Telefonuna anında bildirim düşer; fotoğraf doğrulamalı dedektör varsa olay karelerini görürsün. 7/24 izleme merkezi aboneliğin varsa operatör alarmı doğrular ve gerekirse kolluk kuvvetine bildirir.",
  },
  {
    soru: "İnternet ya da elektrik kesilirse sistem çalışır mı?",
    cevap:
      "Çalışır. Hub'ın yedek bataryası ve GSM hattı vardır: elektrik kesintisinde saatlerce, internet kesintisinde mobil şebeke üzerinden çalışmaya devam eder.",
  },
  {
    soru: "Evcil hayvanım yanlış alarma yol açar mı?",
    cevap:
      "Evcil hayvanlı evlerde evcil hayvan bağışıklıklı dedektör (MotionProtect Plus) kullanırız. Kit oluşturucuda 'evcil hayvan var' seçtiğinde öneri motoru bunu otomatik yapar.",
  },
  {
    soru: "Ödemeyi aksatırsam alarm kapanır mı?",
    cevap:
      "3 başarısız ödeme denemesinden sonra abonelik askıya alınır: izleme hizmeti durur ama alarm cihazların çalmaya devam eder. Bu ayrım sözleşmede açıkça yazılıdır.",
  },
] as const;

/**
 * Brief §11 — Teslim öncesi eksik veri listesi.
 * Bu liste dolana kadar site gerçek veriyle yayına alınamaz.
 */
export const MISSING_DATA = [
  "Ajax distribütör/bayi statüsü ve marka kullanım izni",
  "Kit içerikleri ve aylık kira fiyatları",
  "Süre indirim oranları (12/24/36 ay)",
  "Kurulum bedeli ve kapsamı",
  "7/24 izleme merkezi anlaşması ve aylık ücreti",
  "Hizmet verilen iller/ilçeler",
  "Şirket ünvanı, vergi no, adres, MERSİS",
  "Depozito politikası ve tutarı",
  "Erken çıkış / cayma bedeli politikası",
  "Sertifikalar (TSE, ISO, EN 50131, özel güvenlik izni)",
  "Logo / kurumsal kimlik dosyaları",
  "Ödeme sağlayıcı tercihi (iyzico / PayTR) ve recurring anlaşması",
  "Gerçek müşteri yorumları (isim + ilçe + segment)",
  "WhatsApp Business numarası",
] as const;
