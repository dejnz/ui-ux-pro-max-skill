import { MessageCircle } from "lucide-react";

/**
 * WhatsApp Business butonu — TR'de dönüşüm için kritik (brief §8).
 * [[DOLDUR]]: gerçek numara eklenince href güncellenecek.
 */
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/90XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yaz"
      className="print-hide fixed right-4 bottom-4 z-50 grid size-14 cursor-pointer place-items-center rounded-full bg-safe text-ink shadow-lg shadow-black/40 transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
