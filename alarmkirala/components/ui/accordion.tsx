"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  soru: string;
  cevap: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ soru, cevap, defaultOpen }: AccordionItemProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  const panelId = useId();

  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-semibold text-fg transition-colors hover:text-white"
      >
        {soru}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-5 shrink-0 text-fg-mute transition-transform duration-200",
            open && "rotate-180 text-signal",
          )}
        />
      </button>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className="pb-5 text-[15px] leading-relaxed text-fg-soft"
      >
        {cevap}
      </div>
    </div>
  );
}

export function Accordion({
  items,
}: {
  items: ReadonlyArray<{ soru: string; cevap: string }>;
}) {
  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <AccordionItem key={item.soru} {...item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
