import type { MetadataRoute } from "next";
import { DEVICES } from "@/lib/data/devices";
import { KITS } from "@/lib/data/kits";
import { SEGMENTS } from "@/lib/data/segments";

const BASE = "https://alarmkirala.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const statik = [
    "",
    "/kit-olustur",
    "/kitler",
    "/cihazlar",
    "/fiyatlar",
    "/nasil-calisir",
    "/izleme-merkezi",
    "/hakkimizda",
    "/sss",
    "/iletisim",
    "/bayilik",
  ].map((p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly" as const }));

  return [
    ...statik,
    ...SEGMENTS.map((s) => ({
      url: `${BASE}/cozumler/${s.slug}`,
      changeFrequency: "weekly" as const,
    })),
    ...KITS.filter((k) => !k.teklifBazli).map((k) => ({
      url: `${BASE}/kitler/${k.slug}`,
      changeFrequency: "weekly" as const,
    })),
    ...DEVICES.map((d) => ({
      url: `${BASE}/cihazlar/${d.slug}`,
      changeFrequency: "monthly" as const,
    })),
  ];
}
