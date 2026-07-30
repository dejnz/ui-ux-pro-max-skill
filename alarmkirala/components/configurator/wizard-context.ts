import type { KitItem } from "@/lib/data/kits";
import type { ConfigInput } from "@/lib/recommendation";
import type { AddonId, TermMonths } from "@/lib/pricing";

export interface WizardState {
  step: number; // 0-7 → brief §4.3'teki 8 adım
  input: ConfigInput;
  /** Öneri motoru çıktısı; özelleştirme adımında düzenlenir */
  items: KitItem[];
  reasons: Record<string, string>;
  term: TermMonths;
  addons: AddonId[];
}

export const STEPS = [
  "Mekân tipi",
  "Ölçüler",
  "Riskler",
  "Önerilen kit",
  "Özelleştir",
  "Abonelik süresi",
  "Ek hizmetler",
  "Özet & randevu",
] as const;

export const INITIAL_STATE: WizardState = {
  step: 0,
  input: {
    mekanTipi: "daire",
    odaSayisi: 3,
    katSayisi: 1,
    m2: 100,
    disKapiSayisi: 1,
    zeminPencereSayisi: 0,
    bahce: false,
    riskler: ["hirsizlik"],
  },
  items: [],
  reasons: {},
  term: 24,
  addons: [],
};

const STORAGE_KEY = "alarmkirala:taslak";

/** "Kitimi kaydet" / "Sonra devam et" — anonim taslak (brief §4.3) */
export function saveDraft(state: WizardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function loadDraft(): WizardState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...INITIAL_STATE, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

/** "Linkle paylaş" — durumu URL'e gömer */
export function encodeShareParam(state: WizardState): string {
  const { step: _step, ...rest } = state;
  return btoa(encodeURIComponent(JSON.stringify(rest)));
}

export function decodeShareParam(param: string): WizardState | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(param)));
    return { ...INITIAL_STATE, ...parsed, step: 7 };
  } catch {
    return null;
  }
}
