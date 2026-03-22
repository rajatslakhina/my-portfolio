"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, MessageSquare } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const COLORS = ["primary", "secondary", "accent"] as const;
const C_BORDER: Record<string, string> = {
  primary:   "border-primary/20 hover:border-primary/45",
  secondary: "border-secondary/20 hover:border-secondary/45",
  accent:    "border-accent/20 hover:border-accent/45",
};
const C_QUOTE: Record<string, string> = {
  primary:   "text-primary/15",
  secondary: "text-secondary/15",
  accent:    "text-accent/15",
};
const C_NAME: Record<string, string> = {
  primary:   "text-primary",
  secondary: "text-secondary",
  accent:    "text-accent",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function TestimonialsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-25" />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-10 flex items-center gap-3">
          <div
            className="flex items-center gap-2 border border-secondary/25 bg-secondary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <MessageSquare className="h-3 w-3 text-secondary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-secondary uppercase font-semibold">
              recommendations
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-secondary/40 to-transparent" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="mb-12 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          What People <span className="text-gradient">Say</span>
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className={cn(
                  "relative flex flex-col gap-4 border bg-card/40 backdrop-blur-sm p-6 transition-all duration-300",
                  C_BORDER[color],
                )}
                style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
              >
                {/* Decorative quote */}
                <Quote className={cn("absolute top-4 right-4 h-8 w-8", C_QUOTE[color])} />
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-20" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-20" />

                <p className="relative text-sm leading-[1.8] text-foreground/85 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                  <div
                    className={cn("flex h-9 w-9 shrink-0 items-center justify-center font-mono-accent text-sm font-bold border", C_NAME[color], "border-current/30 bg-current/10")}
                    style={{ clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
                  >
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className={cn("font-mono-accent text-[11px] font-semibold uppercase tracking-wider", C_NAME[color])}>
                      {t.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
