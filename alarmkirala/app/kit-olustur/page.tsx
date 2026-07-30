import type { Metadata } from "next";
import { Wizard } from "@/components/configurator/wizard";

export const metadata: Metadata = {
  title: "Kit Oluşturucu — Evini tarif et, sistemini kuralım",
  description:
    "Mekânını tarif et, öneri motoru Ajax cihazlarından kitini kurgulasın. Canlı fiyat, cihaz bazlı gerekçe, kaydet/paylaş/PDF teklif — üyeliksiz.",
};

export default function KitOlusturPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Wizard />
    </div>
  );
}
