"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data/site";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="alarmkirala.com ana sayfa"
        >
          <ShieldCheck aria-hidden className="size-6 text-signal" />
          <span className="display-soft text-lg tracking-tight text-fg">
            alarm<span className="text-signal">kirala</span>
          </span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-fg-soft transition-colors hover:bg-ink-soft hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kit-olustur"
            className={buttonClasses({ size: "sm", className: "hidden sm:inline-flex" })}
          >
            Kitini Oluştur
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 cursor-pointer place-items-center rounded-md text-fg lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <div
        className={cn(
          "border-t border-line bg-ink lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobil menü" className="flex flex-col px-4 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3.5 text-base font-medium text-fg-soft transition-colors hover:bg-ink-soft hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kit-olustur"
            onClick={() => setOpen(false)}
            className={buttonClasses({ className: "mt-3" })}
          >
            Kitini Oluştur
          </Link>
        </nav>
      </div>
    </header>
  );
}
