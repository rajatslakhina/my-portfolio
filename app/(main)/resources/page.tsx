import { BookMarked, ExternalLink } from "lucide-react";
import { READING_LIST, CATEGORIES } from "@/data/reading-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Curated iOS, AI, architecture, and leadership resources recommended by Rajat Lakhina.",
};

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen py-24">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-30" />
      <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex items-center gap-2 border border-primary/25 bg-primary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}>
            <BookMarked className="h-3 w-3 text-primary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-primary uppercase font-semibold">reading.list</span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Curated <span className="text-gradient">Resources</span>
        </h1>
        <p className="mb-14 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Books, courses, and references I actually use and recommend — across iOS engineering, software architecture, AI, and technical leadership.
        </p>

        {CATEGORIES.map(cat => {
          const items = READING_LIST.filter(r => r.category === cat.id);
          if (!items.length) return null;
          return (
            <div key={cat.id} className="mb-14">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-6 bg-primary/60" />
                <span className="font-mono-accent text-[9px] tracking-[0.3em] text-primary/60 uppercase">{cat.label}</span>
                <div className="h-px flex-1 bg-primary/10" />
                <span className="font-mono-accent text-[8px] text-muted-foreground/30">{items.length} items</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map(r => (
                  <a
                    key={r.title}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-card flex flex-col gap-2 p-5 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors">{r.title}</p>
                      <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-mono-accent text-[10px] text-primary/50 uppercase tracking-wider">{r.author}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground/70">{r.description}</p>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
