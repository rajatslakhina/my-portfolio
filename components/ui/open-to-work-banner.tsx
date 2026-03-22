"use client";
import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "otw-banner-dismissed-v1";

export default function OpenToWorkBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem(DISMISS_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;
  if (process.env.NEXT_PUBLIC_OPEN_TO_WORK !== "true") return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  return (
    <div className={cn(
      "relative z-40 w-full",
      "border-b border-primary/20 bg-primary/8 backdrop-blur-sm",
    )}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Zap className="h-3 w-3 text-primary shrink-0" />
            <p className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-foreground/80 truncate">
              <span className="text-primary font-semibold">Available</span>
              {" · "}Tech Lead · Engineering Manager · Staff+ iOS roles
              {" · "}
              <Link href="/contact" className="underline underline-offset-2 text-primary/80 hover:text-primary transition-colors">
                Let&apos;s talk
              </Link>
            </p>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
