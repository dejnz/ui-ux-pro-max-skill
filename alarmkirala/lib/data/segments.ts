/** Hedef segmentler ve çözüm landing içerikleri — brief §2 */

export interface Segment {
  slug: string;
  ad: string;
  kisaBaslik: string;
  heroBaslik: string;
  heroAlt: string;
  riskSenaryosu: string;
  onerilenKitSlug: string;
  ozellikler: string[];
  /** [[DOLDUR]] gerçek vaka örneği eklenecek */
  vakaOrnegi?: string;
}

export const SEGMENTS: Segment[] = [
  {
    slug: "ev",
    ad: "Kiracılar & Ev",
    kisaBaslik: "Kiracı / Ev",
    heroBaslik: "Kiralık evde kalıcı yatırım yapma",
    heroAlt:
      "Duvarı delmeden kurulur, taşınırken seninle gelir. Ev sahibinden izin istemek yok.",
    riskSenaryosu:
      "Türkiye'de her 3 haneden 1'i kirada oturuyor. Kalıcı alarm yatırımı yapmak mantıksız — ama korunmasız kalmak da değil.",
    onerilenKitSlug: "baslangic",
    ozellikler: [
      "Yapıştırmalı montaj — duvarda iz kalmaz",
      "Yılda 1 ücretsiz taşınma hakkı",
      "12 aydan başlayan esnek sözleşme",
    ],
  },
  {
    slug: "isyeri",
    ad: "Küçük İşletme & Mağaza",
    kisaBaslik: "İşyeri",
    heroBaslik: "Kasan, vitrinin ve deponun tetikte",
    heroAlt:
      "Kuyumcudan eczaneye: panik butonu, cam kırılma sensörü ve fotoğraf doğrulamalı dedektörlerle işletmene özel koruma.",
    riskSenaryosu:
      "Mesai dışı saatler işletmenin en savunmasız anları. Sigorta hasarı öder, kaybedilen iş günlerini ödemez.",
    onerilenKitSlug: "dukkan",
    ozellikler: [
      "Tezgâh altı sessiz panik butonu",
      "Çalışan bazlı şifre ve giriş kaydı",
      "Cephe sireni ile görünür caydırıcılık",
    ],
  },
  {
    slug: "villa",
    ad: "Villa / Müstakil / Yazlık",
    kisaBaslik: "Villa",
    heroBaslik: "Koruma bahçe kapısında başlar",
    heroAlt:
      "Dış mekân dedektörleri tehdidi eve ulaşmadan algılar. Yazlığın için sezonluk kiralama seçeneği.",
    riskSenaryosu:
      "Müstakil evler apartmana göre daha uzun süre boş kalır ve dış cepheden erişim kolaydır. Kışın boş kalan yazlık, aylarca kontrolsüzdür.",
    onerilenKitSlug: "villa",
    ozellikler: [
      "Bahçe ve cephe için dış mekân sensörleri",
      "Sezonluk kiralama (yazlık için)",
      "113 dB cephe sireni",
    ],
  },
  {
    slug: "santiye",
    ad: "Şantiye / Geçici Alan",
    kisaBaslik: "Şantiye",
    heroBaslik: "Proje sürene kadar kirala, bitince teslim et",
    heroAlt:
      "3–18 ay esnek süre. Elektrik ve internet altyapısı gerekmez — GSM bağlantılı sistem sahada çalışır.",
    riskSenaryosu:
      "Şantiyede kablo, jeneratör ve malzeme hırsızlığı proje takvimini haftalarca kaydırabilir. Bekçi maliyeti aylık sistem kirasının katbekatıdır.",
    onerilenKitSlug: "santiye",
    ozellikler: [
      "3–18 ay proje bazlı sözleşme",
      "GSM bağlantı — altyapı beklemez",
      "Proje bitiminde ücretsiz söküm",
    ],
  },
  {
    slug: "depo-ofis",
    ad: "Depo & Ofis",
    kisaBaslik: "Depo / Ofis",
    heroBaslik: "Mesai bitince sistem devralır",
    heroAlt:
      "Depo kapıları, yükleme rampaları ve ofis katları tek uygulamadan. Kim ne zaman girdi, kayıt altında.",
    riskSenaryosu:
      "Depo kayıplarının önemli kısmı mesai dışı erişimden gelir. Kamera kaydı olayı gösterir; alarm olayı durdurur.",
    onerilenKitSlug: "dukkan",
    ozellikler: [
      "Darbe sensörlü kapı dedektörleri",
      "Personel bazlı erişim kaydı",
      "Çoklu bölge (parsiyel) kurma",
    ],
  },
  {
    slug: "airbnb",
    ad: "Kısa Dönem Kiralama",
    kisaBaslik: "Airbnb",
    heroBaslik: "Misafir değişir, kontrol sende kalır",
    heroAlt:
      "Uzaktan kurma/çözme, misafir bazlı geçici şifre, sensörlerle boş ev takibi. Kamera zorunlu değil — KVKK dostu.",
    riskSenaryosu:
      "Kısa dönem kiralamada ev haftada birkaç kez el değiştirir. Anahtar kopyalama ve izinsiz kalabalık etkinlik riski yönetilmelidir.",
    onerilenKitSlug: "baslangic",
    ozellikler: [
      "Misafir bazlı geçici erişim kodu",
      "Uzaktan kurma / çözme",
      "Duman dedektörü ile misafir güvenliği",
    ],
  },
  {
    slug: "kurumsal",
    ad: "Kurumsal / Çok Şube",
    kisaBaslik: "Kurumsal",
    heroBaslik: "Tüm şubeler tek panelde",
    heroAlt:
      "Zincir mağaza, bayi ağı, franchise: merkezi kullanıcı yönetimi, şube bazlı raporlama, tek sözleşme.",
    riskSenaryosu:
      "Şube sayısı arttıkça güvenlik standardı şubeden şubeye değişir. Merkezi görünürlük olmadan zayıf halka fark edilmez.",
    onerilenKitSlug: "kurumsal",
    ozellikler: [
      "Merkezi yönetim ve raporlama",
      "Şube başına standart kit şablonu",
      "Tek fatura, tek sözleşme",
    ],
  },
];

export const segmentBySlug = (slug: string) =>
  SEGMENTS.find((s) => s.slug === slug);
