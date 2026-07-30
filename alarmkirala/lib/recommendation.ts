/**
 * Öneri motoru — brief §4.3
 *
 * Kurallar:
 *   her dış kapı              → 1 DoorProtect
 *   zemin kat her 2 pencere   → 1 GlassProtect
 *   her oda / her 20m²        → 1 MotionProtect (evcil hayvan → Plus)
 *   kat sayısı > 1            → merdiven boşluğuna 1 MotionCam
 *   bahçe seçili              → MotionProtect Outdoor + StreetSiren
 *   yangın riski              → mutfak + her kat 1 FireProtect 2
 *   su riski                  → LeaksProtect + WaterStop
 *   cihaz sayısı > 30         → Hub 2 Plus'a yükselt
 *   dükkân tipi               → panik butonu zorunlu
 */

import type { KitItem } from "./data/kits";

export type MekanTipi =
  | "daire"
  | "mustakil"
  | "dukkan"
  | "ofis"
  | "depo"
  | "santiye";

export const MEKAN_LABELS: Record<MekanTipi, string> = {
  daire: "Daire",
  mustakil: "Müstakil Ev",
  dukkan: "Dükkân",
  ofis: "Ofis",
  depo: "Depo",
  santiye: "Şantiye",
};

export type Risk =
  | "hirsizlik"
  | "yangin"
  | "su"
  | "gaz"
  | "dis-alan"
  | "evcil";

export const RISK_LABELS: Record<Risk, string> = {
  hirsizlik: "Hırsızlık",
  yangin: "Yangın",
  su: "Su baskını",
  gaz: "Gaz kaçağı",
  "dis-alan": "Dış alan / bahçe",
  evcil: "Evcil hayvan var",
};

export interface ConfigInput {
  mekanTipi: MekanTipi;
  odaSayisi: number;
  katSayisi: number;
  m2: number;
  disKapiSayisi: number;
  zeminPencereSayisi: number;
  bahce: boolean;
  riskler: Risk[];
}

export interface Recommendation {
  items: KitItem[];
  /** deviceSlug → "neden bu cihaz?" açıklaması */
  reasons: Record<string, string>;
}

function add(
  map: Map<string, number>,
  reasons: Record<string, string>,
  slug: string,
  adet: number,
  reason: string,
) {
  if (adet <= 0) return;
  map.set(slug, (map.get(slug) ?? 0) + adet);
  reasons[slug] = reasons[slug] ? `${reasons[slug]} ${reason}` : reason;
}

export function recommend(input: ConfigInput): Recommendation {
  const items = new Map<string, number>();
  const reasons: Record<string, string> = {};
  const evcil = input.riskler.includes("evcil");
  const isletme = ["dukkan", "ofis", "depo"].includes(input.mekanTipi);

  // Dış kapılar
  add(
    items,
    reasons,
    "doorprotect",
    Math.max(1, input.disKapiSayisi),
    `${Math.max(1, input.disKapiSayisi)} dış kapının her biri açılma anında sinyal versin diye.`,
  );

  // Zemin kat pencereleri
  const glass = Math.ceil(input.zeminPencereSayisi / 2);
  if (glass > 0)
    add(
      items,
      reasons,
      "glassprotect",
      glass,
      `Zemin kattaki ${input.zeminPencereSayisi} pencere için her 2 pencereye 1 akustik sensör.`,
    );

  // Hareket: her oda / her 20 m² — büyük olan
  const motionCount = Math.max(
    input.odaSayisi,
    Math.ceil(input.m2 / 20),
    1,
  );
  const motionSlug = evcil ? "motionprotect-plus" : "motionprotect";
  add(
    items,
    reasons,
    motionSlug,
    motionCount,
    evcil
      ? "Evcil hayvanın yanlış alarm üretmemesi için çift sensörlü, evcil hayvan bağışıklıklı model."
      : `${input.odaSayisi} oda / ${input.m2} m² için oda başına 1 hareket dedektörü.`,
  );

  // Çok katlı → merdiven boşluğuna fotoğraf doğrulamalı
  if (input.katSayisi > 1)
    add(
      items,
      reasons,
      "motioncam",
      1,
      "Katlar arası geçiş noktası merdiven boşluğu — fotoğraf doğrulama ile olayı gör.",
    );

  // Bahçe / dış alan
  if (input.bahce || input.riskler.includes("dis-alan")) {
    add(
      items,
      reasons,
      "motionprotect-outdoor",
      Math.max(1, Math.ceil(input.disKapiSayisi / 2)),
      "Tehdit daha bahçedeyken algılansın diye dış mekân dedektörü.",
    );
    add(
      items,
      reasons,
      "streetsiren",
      1,
      "Cephedeki siren tek başına caydırıcıdır; 113 dB'e kadar.",
    );
  }

  // Yangın
  if (input.riskler.includes("yangin") || input.riskler.includes("gaz")) {
    const fireSlug = input.riskler.includes("gaz")
      ? "fireprotect-2-rb"
      : "fireprotect-2";
    add(
      items,
      reasons,
      fireSlug,
      1 + input.katSayisi,
      input.riskler.includes("gaz")
        ? "Mutfak + her kat için duman/ısı/CO dedektörü — gaz kaçağı görünmez, sensör görür."
        : "Mutfak + her kat için duman ve ısı dedektörü. Sistem kapalıyken bile çalışır.",
    );
  }

  // Su
  if (input.riskler.includes("su")) {
    add(
      items,
      reasons,
      "leaksprotect",
      2,
      "Banyo ve mutfak için kaçak sensörü — ilk damlada bildirim.",
    );
    add(
      items,
      reasons,
      "waterstop",
      1,
      "Kaçak algılanınca ana vanayı otomatik kapatır.",
    );
  }

  // İşletme → panik butonu zorunlu + KeyPad; konut → kumanda
  if (input.mekanTipi === "dukkan") {
    add(
      items,
      reasons,
      "button",
      1,
      "Dükkân kitlerinde zorunlu: tezgâh altından sessiz panik sinyali.",
    );
  }
  if (isletme) {
    add(
      items,
      reasons,
      "keypad",
      1,
      "Çalışanlar kendi şifresiyle kurar/çözer; kim ne zaman girdi kayıtlıdır.",
    );
    add(
      items,
      reasons,
      input.mekanTipi === "dukkan" ? "streetsiren-doubledeck" : "homesiren",
      1,
      input.mekanTipi === "dukkan"
        ? "İşletme cephesinde görünür, aydınlatmalı çift katman siren."
        : "İçerideki siren davetsiz misafiri caydırır.",
    );
  } else if (input.mekanTipi !== "santiye") {
    add(
      items,
      reasons,
      "spacecontrol",
      1,
      "Telefonsuz kurma/çözme + panik butonu cep kumandası.",
    );
    if (!items.has("streetsiren"))
      add(
        items,
        reasons,
        "homesiren",
        1,
        "İçerideki siren davetsiz misafiri caydırır, komşuları uyarır.",
      );
  }

  // Şantiye: dış ağırlıklı zorunlular
  if (input.mekanTipi === "santiye") {
    add(
      items,
      reasons,
      "motionprotect-outdoor",
      Math.max(2, Math.ceil(input.m2 / 200)),
      "Açık saha çevresi için dış mekân dedektörleri.",
    );
    if (!items.has("streetsiren"))
      add(items, reasons, "streetsiren", 1, "Sahada yüksek sesli caydırıcı siren.");
  }

  // Hub seçimi: cihaz sayısı > 30 veya fotoğraf doğrulama → Hub 2 Plus
  const deviceCount = [...items.values()].reduce((s, n) => s + n, 0);
  const needsPlus =
    deviceCount > 30 ||
    input.mekanTipi === "santiye" ||
    input.katSayisi > 2 ||
    isletme;
  const hubSlug = needsPlus ? "hub-2-plus" : "hub-2";
  add(
    items,
    reasons,
    hubSlug,
    1,
    needsPlus
      ? "Cihaz sayısı ve mekân büyüklüğü için yüksek kapasiteli panel (200 cihaz, LTE)."
      : "Sistemin beyni: fotoğraf doğrulama destekli, çift yedekli bağlantı.",
  );

  return {
    items: [...items.entries()].map(([deviceSlug, adet]) => ({
      deviceSlug,
      adet,
    })),
    reasons,
  };
}
