import {
  AppWindow,
  Camera,
  DoorOpen,
  Flame,
  KeyRound,
  Megaphone,
  Radar,
  Droplets,
  PanelsTopLeft,
  Plug,
} from "lucide-react";
import type { DeviceCategory } from "@/lib/data/devices";
import { cn } from "@/lib/utils";

/**
 * Cihaz görseli placeholder'ı.
 * [[DOLDUR]]: Gerçek ürün fotoğrafları Ajax bayi materyal kiti izniyle
 * eklenecek (brief §12) — o zamana kadar kategori bazlı stilize glif.
 */

const CATEGORY_ICONS: Record<DeviceCategory, React.ComponentType<{ className?: string }>> = {
  hub: PanelsTopLeft,
  hareket: Radar,
  acilma: DoorOpen,
  cam: AppWindow,
  yangin: Flame,
  su: Droplets,
  siren: Megaphone,
  kontrol: KeyRound,
  otomasyon: Plug,
  video: Camera,
};

export function DeviceGlyph({
  kategori,
  size = "md",
  className,
}: {
  kategori: DeviceCategory;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[kategori];
  return (
    <div
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-lg border border-line bg-ink",
        size === "sm" && "size-11",
        size === "md" && "size-16",
        size === "lg" && "size-24",
        className,
      )}
    >
      <Icon
        className={cn(
          "text-fg-soft",
          size === "sm" && "size-5",
          size === "md" && "size-7",
          size === "lg" && "size-10",
        )}
      />
    </div>
  );
}
