/**
 * Hazır kitler — brief §4.2
 *
 * [[DOLDUR]]: Kit içerikleri brief'teki örnek kurgudur; nihai cihaz
 * listeleri ve fiyatlar distribütör anlaşması netleşince güncellenecek.
 * Aylık fiyat, cihaz kira toplamından türetilir (lib/pricing.ts).
 */

export interface KitItem {
  deviceSlug: string;
  adet: number;
}

export interface Kit {
  slug: string;
  ad: string;
  hedef: string;
  kapsam: string;
  aciklama: string;
  cihazlar: KitItem[];
  kurulumDakika: number;
  oneCikan: boolean;
  /** Kurumsal kit fiyat göstermez, teklif ister */
  teklifBazli?: boolean;
}

export const KITS: Kit[] = [
  {
    slug: "baslangic",
    ad: "Başlangıç",
    hedef: "1+1 / 2+1 daire",
    kapsam: "80 m²'ye kadar",
    aciklama:
      "Kiralık dairede yaşayanların ilk sistemi: giriş kapısı, salon ve cep kumandası. Duvara zarar vermeden kurulur, taşınırken seninle gelir.",
    cihazlar: [
      { deviceSlug: "hub-2", adet: 1 },
      { deviceSlug: "motionprotect", adet: 1 },
      { deviceSlug: "doorprotect", adet: 1 },
      { deviceSlug: "spacecontrol", adet: 1 },
      { deviceSlug: "homesiren", adet: 1 },
    ],
    kurulumDakika: 60,
    oneCikan: true,
  },
  {
    slug: "aile",
    ad: "Aile",
    hedef: "3+1 daire",
    kapsam: "120 m²'ye kadar",
    aciklama:
      "Fotoğraf doğrulamalı dedektörlerle alarmın gerçek mi yanlış mı olduğunu saniyeler içinde görürsün. Çocuklar için ayrı şifreli KeyPad dahil.",
    cihazlar: [
      { deviceSlug: "hub-2-plus", adet: 1 },
      { deviceSlug: "motioncam", adet: 2 },
      { deviceSlug: "doorprotect", adet: 2 },
      { deviceSlug: "glassprotect", adet: 1 },
      { deviceSlug: "keypad", adet: 1 },
      { deviceSlug: "homesiren", adet: 1 },
    ],
    kurulumDakika: 90,
    oneCikan: true,
  },
  {
    slug: "villa",
    ad: "Villa / Müstakil",
    hedef: "Bahçeli, çok katlı",
    kapsam: "250 m² + bahçe",
    aciklama:
      "Koruma bahçe kapısında başlar: dış mekân dedektörleri tehdidi eve ulaşmadan algılar, cephe sireni tüm mahalleyi uyarır.",
    cihazlar: [
      { deviceSlug: "hub-2-plus", adet: 1 },
      { deviceSlug: "motionprotect-outdoor", adet: 2 },
      { deviceSlug: "motioncam", adet: 3 },
      { deviceSlug: "doorprotect", adet: 3 },
      { deviceSlug: "streetsiren", adet: 1 },
      { deviceSlug: "keypad-touchscreen", adet: 1 },
    ],
    kurulumDakika: 150,
    oneCikan: true,
  },
  {
    slug: "dukkan",
    ad: "Dükkân / Mağaza",
    hedef: "Perakende",
    kapsam: "Tek kat işyeri",
    aciklama:
      "Vitrin camı, kasa bölgesi ve depo kapısı ayrı ayrı izlenir. Tezgâh altı panik butonu izleme merkezine sessiz sinyal gönderir.",
    cihazlar: [
      { deviceSlug: "hub-2-plus", adet: 1 },
      { deviceSlug: "motioncam", adet: 1 },
      { deviceSlug: "glassprotect", adet: 1 },
      { deviceSlug: "doorprotect", adet: 1 },
      { deviceSlug: "streetsiren-doubledeck", adet: 1 },
      { deviceSlug: "keypad", adet: 1 },
      { deviceSlug: "button", adet: 1 },
    ],
    kurulumDakika: 120,
    oneCikan: true,
  },
  {
    slug: "yangin-su",
    ad: "Yangın & Su",
    hedef: "Ek paket",
    kapsam: "Mevcut kite eklenir",
    aciklama:
      "Hırsızlıktan fazlası: duman, ısı, karbonmonoksit ve su kaçağı. WaterStop kaçak anında ana vanayı otomatik kapatır.",
    cihazlar: [
      { deviceSlug: "fireprotect-2-rb", adet: 2 },
      { deviceSlug: "leaksprotect", adet: 2 },
      { deviceSlug: "waterstop", adet: 1 },
    ],
    kurulumDakika: 60,
    oneCikan: false,
  },
  {
    slug: "santiye",
    ad: "Şantiye / Geçici",
    hedef: "3–18 ay projeler",
    kapsam: "Açık alan + konteyner",
    aciklama:
      "Elektrik ve internet altyapısı beklemez: GSM bağlantılı hub, dış mekân dedektörleri ve siren. Proje bitince söker, teslim alırız.",
    cihazlar: [
      { deviceSlug: "hub-2-plus", adet: 1 },
      { deviceSlug: "motionprotect-outdoor", adet: 3 },
      { deviceSlug: "streetsiren", adet: 1 },
      { deviceSlug: "motioncam", adet: 1 },
    ],
    kurulumDakika: 120,
    oneCikan: false,
  },
  {
    slug: "kurumsal",
    ad: "Kurumsal / Çok Şube",
    hedef: "Zincir işletmeler",
    kapsam: "Merkezi yönetim",
    aciklama:
      "Tüm şubeler tek panelden: merkezi kullanıcı yönetimi, şube bazlı raporlama, toplu sözleşme. Satış ekibimiz ihtiyaç analiziyle başlar.",
    cihazlar: [],
    kurulumDakika: 0,
    oneCikan: false,
    teklifBazli: true,
  },
];

export const kitBySlug = (slug: string) => KITS.find((k) => k.slug === slug);
