"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  FileDown,
  Info,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Stepper } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DeviceGlyph } from "@/components/ui/device-glyph";
import {
  CATEGORY_LABELS,
  DEVICES,
  deviceBySlug,
  type DeviceCategory,
} from "@/lib/data/devices";
import type { KitItem } from "@/lib/data/kits";
import {
  MEKAN_LABELS,
  RISK_LABELS,
  recommend,
  type MekanTipi,
  type Risk,
} from "@/lib/recommendation";
import {
  ADDON_SERVICES,
  TERM_DISCOUNTS,
  validateConfiguration,
  type AddonId,
  type TermMonths,
} from "@/lib/pricing";
import { cn, formatTL } from "@/lib/utils";
import {
  decodeShareParam,
  encodeShareParam,
  INITIAL_STATE,
  loadDraft,
  saveDraft,
  STEPS,
  type WizardState,
} from "./wizard-context";
import { SummaryPanel } from "./summary-panel";

export function Wizard() {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [draftFound, setDraftFound] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Paylaşım linki veya kayıtlı taslak ile başlat (brief §4.3: girişsiz çalışır)
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("c");
    if (param) {
      const restored = decodeShareParam(param);
      if (restored) {
        setState(restored);
        return;
      }
    }
    if (loadDraft()) setDraftFound(true);
  }, []);

  const patch = (p: Partial<WizardState>) =>
    setState((s) => ({ ...s, ...p }));
  const patchInput = (p: Partial<WizardState["input"]>) =>
    setState((s) => ({ ...s, input: { ...s.input, ...p } }));

  const errors = useMemo(
    () => (state.step >= 4 ? validateConfiguration(state.items) : []),
    [state.items, state.step],
  );

  const next = () => {
    setState((s) => {
      // Riskler adımından çıkarken öneri motoru çalışır (brief §4.3 adım 4)
      if (s.step === 2) {
        const rec = recommend(s.input);
        return { ...s, step: 3, items: rec.items, reasons: rec.reasons };
      }
      return { ...s, step: Math.min(7, s.step + 1) };
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    patch({ step: Math.max(0, state.step - 1) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setItemCount = (deviceSlug: string, adet: number) => {
    setState((s) => ({
      ...s,
      items:
        adet <= 0
          ? s.items.filter((i) => i.deviceSlug !== deviceSlug)
          : s.items.some((i) => i.deviceSlug === deviceSlug)
            ? s.items.map((i) =>
                i.deviceSlug === deviceSlug ? { ...i, adet } : i,
              )
            : [...s.items, { deviceSlug, adet }],
    }));
  };

  const flash = (msg: string) => {
    setFeedback(msg);
    window.setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div>
        {draftFound && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-fg">
            <span>Kayıtlı bir taslağın var. Kaldığın yerden devam et?</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="paper"
                onClick={() => {
                  const d = loadDraft();
                  if (d) setState(d);
                  setDraftFound(false);
                }}
              >
                Devam et
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setDraftFound(false)}>
                Yeni başla
              </Button>
            </div>
          </div>
        )}

        {/* Adım göstergesi */}
        <ol className="mb-8 flex flex-wrap gap-2" aria-label="Sihirbaz adımları">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                disabled={i > state.step}
                aria-current={i === state.step ? "step" : undefined}
                onClick={() => patch({ step: i })}
                className={cn(
                  "numeric h-9 cursor-pointer rounded-full border px-3.5 text-xs font-medium transition-colors disabled:cursor-default disabled:opacity-40",
                  i === state.step
                    ? "border-signal bg-signal/10 text-fg"
                    : i < state.step
                      ? "border-line text-safe"
                      : "border-line text-fg-mute",
                )}
              >
                {i < state.step ? <Check className="inline size-3.5" aria-hidden /> : i + 1}
                <span className="ml-1.5 hidden sm:inline">{label}</span>
              </button>
            </li>
          ))}
        </ol>

        <p className="numeric mb-2 text-xs tracking-[0.2em] text-signal uppercase">
          Adım {state.step + 1} / {STEPS.length}
        </p>
        <h1 className="display mb-8 text-3xl text-fg sm:text-4xl">
          {STEPS[state.step]}
        </h1>

        {state.step === 0 && <StepMekan state={state} patchInput={patchInput} />}
        {state.step === 1 && <StepOlcu state={state} patchInput={patchInput} />}
        {state.step === 2 && <StepRisk state={state} patchInput={patchInput} />}
        {state.step === 3 && <StepOneri state={state} />}
        {state.step === 4 && (
          <StepOzellestir
            state={state}
            setItemCount={setItemCount}
            errors={errors}
          />
        )}
        {state.step === 5 && <StepSure state={state} patch={patch} />}
        {state.step === 6 && <StepEkHizmet state={state} patch={patch} />}
        {state.step === 7 && (
          <StepOzet
            state={state}
            onSave={() => flash(saveDraft(state) ? "Taslak kaydedildi." : "Kaydedilemedi.")}
            onShare={async () => {
              const url = `${window.location.origin}/kit-olustur?c=${encodeShareParam(state)}`;
              try {
                await navigator.clipboard.writeText(url);
                flash("Paylaşım linki kopyalandı.");
              } catch {
                flash(url);
              }
            }}
            onPdf={() => window.print()}
          />
        )}

        {feedback && (
          <p role="status" className="mt-4 text-sm font-medium text-safe">
            {feedback}
          </p>
        )}

        {/* Navigasyon */}
        <div className="print-hide mt-10 flex items-center justify-between border-t border-line pt-6">
          <Button variant="ghost" onClick={back} disabled={state.step === 0}>
            <ArrowLeft aria-hidden />
            Geri
          </Button>
          {state.step < 7 && (
            <Button onClick={next} disabled={state.step === 4 && errors.length > 0}>
              {state.step === 2 ? "Önerimi oluştur" : "İleri"}
              <ArrowRight aria-hidden />
            </Button>
          )}
        </div>
      </div>

      <div className="print-hide">
        <SummaryPanel items={state.items} term={state.term} addons={state.addons} />
        {state.step >= 3 && state.step < 7 && (
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => flash(saveDraft(state) ? "Taslak kaydedildi." : "Kaydedilemedi.")}
            >
              <Save aria-hidden />
              Sonra devam et
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Adım bileşenleri ─────────────────────────────────────────────── */

function ChipButton({
  active,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "h-12 cursor-pointer rounded-md border px-5 text-sm font-medium transition-colors",
        active
          ? "border-signal bg-signal/10 text-fg"
          : "border-line text-fg-soft hover:border-fg-mute",
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function StepMekan({
  state,
  patchInput,
}: {
  state: WizardState;
  patchInput: (p: Partial<WizardState["input"]>) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-4 text-fg-soft">
        Sistemi nereye kuracağız?
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {(Object.keys(MEKAN_LABELS) as MekanTipi[]).map((m) => (
          <ChipButton
            key={m}
            active={state.input.mekanTipi === m}
            onClick={() => patchInput({ mekanTipi: m })}
          >
            {MEKAN_LABELS[m]}
          </ChipButton>
        ))}
      </div>
    </fieldset>
  );
}

function StepOlcu({
  state,
  patchInput,
}: {
  state: WizardState;
  patchInput: (p: Partial<WizardState["input"]>) => void;
}) {
  const { input } = state;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Stepper
        label="Oda sayısı"
        value={input.odaSayisi}
        onChange={(v) => patchInput({ odaSayisi: v })}
        min={1}
      />
      <Stepper
        label="Kat sayısı"
        value={input.katSayisi}
        onChange={(v) => patchInput({ katSayisi: v })}
        min={1}
        max={10}
      />
      <Stepper
        label="Dış kapı sayısı"
        value={input.disKapiSayisi}
        onChange={(v) => patchInput({ disKapiSayisi: v })}
        min={1}
        max={10}
      />
      <Stepper
        label="Zemin kat penceresi"
        value={input.zeminPencereSayisi}
        onChange={(v) => patchInput({ zeminPencereSayisi: v })}
      />
      <div className="sm:col-span-2">
        <Label htmlFor="m2">Yaklaşık alan (m²)</Label>
        <Input
          id="m2"
          type="number"
          inputMode="numeric"
          min={20}
          max={2000}
          value={input.m2}
          onChange={(e) => patchInput({ m2: Number(e.target.value) || 0 })}
        />
      </div>
      <label className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-ink px-4 py-3.5 sm:col-span-2">
        <input
          type="checkbox"
          checked={input.bahce}
          onChange={(e) => patchInput({ bahce: e.target.checked })}
          className="size-5 accent-[#E8371C]"
        />
        <span className="text-sm font-medium text-fg-soft">
          Bahçe / dış alan var
        </span>
      </label>
    </div>
  );
}

function StepRisk({
  state,
  patchInput,
}: {
  state: WizardState;
  patchInput: (p: Partial<WizardState["input"]>) => void;
}) {
  const toggle = (r: Risk) =>
    patchInput({
      riskler: state.input.riskler.includes(r)
        ? state.input.riskler.filter((x) => x !== r)
        : [...state.input.riskler, r],
    });

  return (
    <fieldset>
      <legend className="mb-4 text-fg-soft">
        Neye karşı korunmak istiyorsun? Birden fazla seçebilirsin.
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {(Object.keys(RISK_LABELS) as Risk[]).map((r) => (
          <ChipButton
            key={r}
            active={state.input.riskler.includes(r)}
            onClick={() => toggle(r)}
          >
            {state.input.riskler.includes(r) && (
              <Check className="mr-1.5 inline size-4 text-signal" aria-hidden />
            )}
            {RISK_LABELS[r]}
          </ChipButton>
        ))}
      </div>
    </fieldset>
  );
}

function StepOneri({ state }: { state: WizardState }) {
  return (
    <div>
      <p className="mb-6 max-w-xl leading-relaxed text-fg-soft">
        Verdiğin bilgilere göre sistemin hazır. Her cihazın{" "}
        <strong className="text-fg">neden önerildiğini</strong> görebilir,
        sonraki adımda ekleyip çıkarabilirsin.
      </p>
      <ul className="space-y-3">
        {state.items.map((item) => {
          const d = deviceBySlug(item.deviceSlug);
          if (!d) return null;
          return (
            <li
              key={item.deviceSlug}
              className="flex gap-4 rounded-lg border border-line bg-ink-soft p-4"
            >
              <DeviceGlyph kategori={d.kategori} size="sm" />
              <div className="min-w-0">
                <p className="font-semibold text-fg">
                  {item.adet}× {d.ad}{" "}
                  <span className="numeric ml-1 text-sm font-normal text-fg-mute">
                    ₺{formatTL(d.aylikKiraTL * item.adet)}/ay
                  </span>
                </p>
                <p className="mt-1 flex items-start gap-1.5 text-sm leading-relaxed text-fg-soft">
                  <Info className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
                  {state.reasons[item.deviceSlug]}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StepOzellestir({
  state,
  setItemCount,
  errors,
}: {
  state: WizardState;
  setItemCount: (slug: string, adet: number) => void;
  errors: string[];
}) {
  const [category, setCategory] = useState<DeviceCategory>("hareket");
  const inKit = new Set(state.items.map((i) => i.deviceSlug));

  return (
    <div className="space-y-8">
      {errors.length > 0 && (
        <div
          role="alert"
          className="rounded-md border border-signal/40 bg-signal/10 px-4 py-3 text-sm text-fg"
        >
          <p className="mb-1 font-semibold">Uyumsuz kombinasyon:</p>
          <ul className="list-disc space-y-0.5 pl-5 text-fg-soft">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-fg-mute uppercase">
          Sistemindeki cihazlar
        </h2>
        <ul className="space-y-2.5">
          {state.items.map((item) => {
            const d = deviceBySlug(item.deviceSlug);
            if (!d) return null;
            return (
              <li
                key={item.deviceSlug}
                className="flex flex-wrap items-center gap-3 rounded-md border border-line bg-ink-soft p-3"
              >
                <DeviceGlyph kategori={d.kategori} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-fg">{d.ad}</p>
                  <p className="numeric text-xs text-fg-mute">
                    ₺{formatTL(d.aylikKiraTL)}/ay · {CATEGORY_LABELS[d.kategori]}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`${d.ad} azalt`}
                    onClick={() => setItemCount(item.deviceSlug, item.adet - 1)}
                    className="grid size-11 cursor-pointer place-items-center rounded-md border border-line text-fg hover:border-fg-mute"
                  >
                    −
                  </button>
                  <span className="numeric w-8 text-center font-semibold text-fg">
                    {item.adet}
                  </span>
                  <button
                    type="button"
                    aria-label={`${d.ad} artır`}
                    onClick={() => setItemCount(item.deviceSlug, item.adet + 1)}
                    className="grid size-11 cursor-pointer place-items-center rounded-md border border-line text-fg hover:border-fg-mute"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    aria-label={`${d.ad} kaldır`}
                    onClick={() => setItemCount(item.deviceSlug, 0)}
                    className="ml-1 grid size-11 cursor-pointer place-items-center rounded-md border border-line text-fg-mute hover:border-signal hover:text-signal"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-fg-mute uppercase">
          Cihaz ekle
        </h2>
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Kategoriler">
          {(Object.keys(CATEGORY_LABELS) as DeviceCategory[]).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "h-9 cursor-pointer rounded-full border px-3.5 text-xs font-medium transition-colors",
                category === c
                  ? "border-signal bg-signal/10 text-fg"
                  : "border-line text-fg-mute hover:border-fg-mute",
              )}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {DEVICES.filter((d) => d.kategori === category).map((d) => (
            <li
              key={d.slug}
              className="flex items-center gap-3 rounded-md border border-line bg-ink-soft p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-fg">{d.ad}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-fg-mute">
                  {d.kisaAciklama}
                </p>
                <p className="numeric mt-0.5 text-xs text-fg-soft">
                  ₺{formatTL(d.aylikKiraTL)}/ay
                </p>
              </div>
              <Button
                size="sm"
                variant={inKit.has(d.slug) ? "outline" : "primary"}
                aria-label={`${d.ad} ekle`}
                onClick={() =>
                  setItemCount(
                    d.slug,
                    (state.items.find((i) => i.deviceSlug === d.slug)?.adet ?? 0) + 1,
                  )
                }
              >
                <Plus aria-hidden />
                Ekle
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StepSure({
  state,
  patch,
}: {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-4 text-fg-soft">
        Süre uzadıkça aylık ücret düşer. Taşınma hakkı her sürede dahildir.
      </legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {([12, 24, 36] as TermMonths[]).map((term) => (
          <button
            key={term}
            type="button"
            aria-pressed={state.term === term}
            onClick={() => patch({ term })}
            className={cn(
              "cursor-pointer rounded-lg border p-5 text-left transition-colors",
              state.term === term
                ? "border-signal bg-signal/10"
                : "border-line bg-ink-soft hover:border-fg-mute",
            )}
          >
            <span className="numeric block text-3xl font-semibold text-fg">
              {term} <span className="text-base font-normal">ay</span>
            </span>
            <span
              className={cn(
                "mt-2 inline-block rounded-sm px-2 py-0.5 text-xs font-semibold",
                TERM_DISCOUNTS[term] > 0
                  ? "bg-safe/15 text-safe"
                  : "bg-line text-fg-mute",
              )}
            >
              {TERM_DISCOUNTS[term] > 0
                ? `%${Math.round(TERM_DISCOUNTS[term] * 100)} indirim`
                : "Standart fiyat"}
            </span>
            {term === 24 && (
              <span className="mt-2 block text-xs text-fg-mute">En popüler</span>
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function StepEkHizmet({
  state,
  patch,
}: {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}) {
  const toggle = (id: AddonId) =>
    patch({
      addons: state.addons.includes(id)
        ? state.addons.filter((a) => a !== id)
        : [...state.addons, id],
    });

  return (
    <div className="space-y-3">
      {ADDON_SERVICES.map((addon) => (
        <label
          key={addon.id}
          className={cn(
            "flex cursor-pointer items-start gap-4 rounded-lg border p-5 transition-colors",
            state.addons.includes(addon.id)
              ? "border-signal bg-signal/10"
              : "border-line bg-ink-soft hover:border-fg-mute",
          )}
        >
          <input
            type="checkbox"
            checked={state.addons.includes(addon.id)}
            onChange={() => toggle(addon.id)}
            className="mt-1 size-5 accent-[#E8371C]"
          />
          <span className="flex-1">
            <span className="font-semibold text-fg">{addon.ad}</span>
            <span className="mt-1 block text-sm leading-relaxed text-fg-soft">
              {addon.aciklama}
            </span>
          </span>
          <span className="numeric shrink-0 font-semibold text-fg">
            +₺{formatTL(addon.aylikTL)}
            <span className="text-xs font-normal text-fg-mute">/ay</span>
          </span>
        </label>
      ))}
    </div>
  );
}

function StepOzet({
  state,
  onSave,
  onShare,
  onPdf,
}: {
  state: WizardState;
  onSave: () => void;
  onShare: () => void;
  onPdf: () => void;
}) {
  return (
    <div className="space-y-8">
      <p className="max-w-xl leading-relaxed text-fg-soft">
        Sistemin hazır. Sağdaki özet, aylık toplamını ve tüm kalemleri
        gösteriyor. Şimdi kurulum randevusu için bilgilerini bırak — sözleşme ve
        ödeme adımı randevu onayıyla dijital olarak tamamlanır.
      </p>

      <div className="flex flex-wrap gap-2.5">
        <Button variant="outline" onClick={onSave}>
          <Save aria-hidden />
          Kitimi kaydet
        </Button>
        <Button variant="outline" onClick={onShare}>
          <Copy aria-hidden />
          Linkle paylaş
        </Button>
        <Button variant="outline" onClick={onPdf}>
          <FileDown aria-hidden />
          PDF teklif indir
        </Button>
      </div>

      <form
        className="space-y-4 rounded-lg border border-line bg-ink-soft p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Kurulum randevusu"
      >
        <h2 className="font-semibold text-fg">Kurulum randevusu</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="ad">Ad Soyad</Label>
            <Input id="ad" name="ad" autoComplete="name" required />
          </div>
          <div>
            <Label htmlFor="tel">Telefon</Label>
            <Input
              id="tel"
              name="tel"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="05__ ___ __ __"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="adres">Kurulum adresi (il / ilçe)</Label>
            <Input id="adres" name="adres" autoComplete="street-address" required />
          </div>
          <div>
            <Label htmlFor="tarih">Tercih ettiğin tarih</Label>
            <Input id="tarih" name="tarih" type="date" required />
          </div>
        </div>
        <Badge variant="amber">
          Randevu + sözleşme + ödeme akışı FAZ 8'de bağlanacak
        </Badge>
        <div>
          <Button type="submit" size="lg">
            Randevu talebi gönder
          </Button>
        </div>
        <p className="text-xs leading-relaxed text-fg-mute">
          Gönderdiğinde KVKK aydınlatma metnini kabul etmiş olursun. Ödeme
          bilgisi bu adımda istenmez; sözleşme e-imza ile dijital tamamlanır.
        </p>
      </form>
    </div>
  );
}
