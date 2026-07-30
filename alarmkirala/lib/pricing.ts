/**
 * Fiyatlandırma modeli — brief §5
 *
 * Aylık kira = cihaz kiralarının toplamı × süre indirimi
 *
 * [[DOLDUR]]: Süre indirim oranları, kurulum bedeli, izleme merkezi
 * ücreti ve depozito politikası ÖRNEK değerlerdir (brief'teki örnek
 * oranlar). Gerçek değerler netleşmeden yayına alınamaz.
 */

import { DEVICES, deviceBySlug, PRICING_IS_PLACEHOLDER } from "./data/devices";
import type { Kit, KitItem } from "./data/kits";

export { PRICING_IS_PLACEHOLDER };

export type TermMonths = 12 | 24 | 36;

/** [[DOLDUR]] örnek oranlar: 12 ay %0, 24 ay %10, 36 ay %18 */
export const TERM_DISCOUNTS: Record<TermMonths, number> = {
  12: 0,
  24: 0.1,
  36: 0.18,
};

/** [[DOLDUR]] örnek ek hizmet fiyatları */
export const ADDON_SERVICES = [
  {
    id: "izleme",
    ad: "7/24 İzleme Merkezi",
    aciklama: "Alarm anında operatör doğrular, gerekirse kolluk kuvvetine bildirir.",
    aylikTL: 249,
  },
  {
    id: "mudahale",
    ad: "Mobil Müdahale Ekibi",
    aciklama: "Doğrulanan alarmda en yakın devriye adrese yönlendirilir.",
    aylikTL: 349,
  },
  {
    id: "ek-kullanici",
    ad: "Ek Kullanıcı Paketi (+5)",
    aciklama: "Aile bireyleri veya çalışanlar için ek uygulama erişimi.",
    aylikTL: 49,
  },
  {
    id: "yedek-gsm",
    ad: "Yedek GSM Hattı",
    aciklama: "İnternet kesilse bile sistem ikinci hat üzerinden bağlı kalır.",
    aylikTL: 79,
  },
] as const;

export type AddonId = (typeof ADDON_SERVICES)[number]["id"];

/** Cihaz listesinin indirimsiz aylık toplamı */
export function itemsMonthlyTotal(items: KitItem[]): number {
  return items.reduce((sum, item) => {
    const device = deviceBySlug(item.deviceSlug);
    return sum + (device ? device.aylikKiraTL * item.adet : 0);
  }, 0);
}

export function applyTermDiscount(total: number, term: TermMonths): number {
  return Math.round(total * (1 - TERM_DISCOUNTS[term]));
}

export function kitMonthlyPrice(kit: Kit, term: TermMonths = 12): number {
  return applyTermDiscount(itemsMonthlyTotal(kit.cihazlar), term);
}

export interface QuoteInput {
  items: KitItem[];
  term: TermMonths;
  addons: AddonId[];
}

export interface Quote {
  cihazToplam: number;
  sureIndirimi: number;
  indirimliCihazToplam: number;
  ekHizmetToplam: number;
  aylikToplam: number;
}

export function computeQuote({ items, term, addons }: QuoteInput): Quote {
  const cihazToplam = itemsMonthlyTotal(items);
  const indirimliCihazToplam = applyTermDiscount(cihazToplam, term);
  const ekHizmetToplam = ADDON_SERVICES.filter((a) =>
    addons.includes(a.id),
  ).reduce((s, a) => s + a.aylikTL, 0);
  return {
    cihazToplam,
    sureIndirimi: cihazToplam - indirimliCihazToplam,
    indirimliCihazToplam,
    ekHizmetToplam,
    aylikToplam: indirimliCihazToplam + ekHizmetToplam,
  };
}

/**
 * "Satın alsaydım vs kiralasam" — 5 yıllık toplam maliyet karşılaştırması.
 * [[DOLDUR]]: satın alma senaryosu varsayımları (donanım bedeli çarpanı,
 * yıllık bakım, 5. yılda cihaz yenileme) örnek değerlerdir.
 */
export function buyVsRent(monthlyRent: number) {
  const donanimBedeli = monthlyRent * 28; // örnek: ~28 aylık kiraya denk peşin bedel
  const yillikBakim = donanimBedeli * 0.08;
  const years = [1, 2, 3, 4, 5].map((yil) => ({
    yil,
    kiralama: monthlyRent * 12 * yil,
    satinAlma:
      donanimBedeli + yillikBakim * yil + (yil >= 5 ? donanimBedeli * 0.35 : 0),
  }));
  return { donanimBedeli, years };
}

/** Hub kapasitesi kontrolü için basit eşikler */
export const HUB_CAPACITY: Record<string, number> = {
  hub: 100,
  "hub-plus": 150,
  "hub-2": 100,
  "hub-2-plus": 200,
  "hub-hybrid": 100,
};

export function validateConfiguration(items: KitItem[]): string[] {
  const errors: string[] = [];
  const hubs = items.filter((i) => {
    const d = deviceBySlug(i.deviceSlug);
    return d?.kategori === "hub";
  });
  const hubCount = hubs.reduce((s, h) => s + h.adet, 0);
  if (hubCount === 0) errors.push("Her sistemde 1 kontrol paneli (hub) zorunludur.");
  if (hubCount > 1) errors.push("Bir sistemde yalnızca 1 kontrol paneli olabilir.");

  const deviceCount = items
    .filter((i) => deviceBySlug(i.deviceSlug)?.kategori !== "hub")
    .reduce((s, i) => s + i.adet, 0);

  if (hubCount === 1) {
    const hubSlug = hubs[0].deviceSlug;
    const capacity = HUB_CAPACITY[hubSlug] ?? 100;
    if (deviceCount > capacity)
      errors.push(
        `${deviceCount} cihaz, seçili panelin kapasitesini (${capacity}) aşıyor.`,
      );
    // Uyumluluk: cihaz hub'ı desteklemeli
    for (const item of items) {
      const d = deviceBySlug(item.deviceSlug);
      if (!d || d.kategori === "hub") continue;
      if (d.hubUyumlulugu.length > 0 && !d.hubUyumlulugu.includes(hubSlug)) {
        errors.push(`${d.ad}, seçili kontrol paneliyle uyumlu değil.`);
      }
    }
  }

  // Dış mekân cihazı varsa dış siren önerilir (engel değil, uyarı üstte ele alınır)
  return errors;
}

export const DEVICE_COUNT = DEVICES.length;
