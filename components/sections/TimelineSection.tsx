"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch } from "lucide-react";
import { EXPERIENCE } from "@/constants";
import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  "ThoughtWorks":           "primary",
  "DTC Infotech":           "secondary",
  "Mobile Programming LLC": "accent",
  "HCL Technologies":       "primary",
  "Konnecs Infotech":       "secondary",
};

const C_DOT: Record<string, string>    = { primary: "bg-primary shadow-[0_0_12px_hsl(var(--primary))]", secondary: "bg-secondary shadow-[0_0_12px_hsl(var(--secondary))]", accent: "bg-accent shadow-[0_0_12px_hsl(var(--accent))]" };
const C_BORDER: Record<string, string> = { primary: "border-primary/25 hover:border-primary/50", secondary: "border-secondary/25 hover:border-secondary/50", accent: "border-accent/25 hover:border-accent/50" };
const C_TEXT: Record<string, string>   = { primary: "text-primary", secondary: "text-secondary", accent: "text-accent" };
const C_LINE: Record<string, string>   = { primary: "bg-primary/30", secondary: "bg-secondary/30", accent: "bg-accent/30" };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
  show:   { opacity: 1, x: 0,   filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TimelineSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-30" />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-10 flex items-center gap-3">
          <div
            className="flex items-center gap-2 border border-primary/25 bg-primary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <GitBranch className="h-3 w-3 text-primary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-primary uppercase font-semibold">
              career.journey
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
        </motion.div>

        <motion.h2 variants={item} className="mb-16 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Career <span className="text-gradient">Journey</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent md:left-[22px]" />

          <div className="flex flex-col gap-0">
            {EXPERIENCE.map((exp, idx) => {
              const colorKey = COLORS[exp.company] ?? "primary";
              return (
                <motion.div key={exp.company} variants={item} className="relative pl-12 md:pl-14 pb-12">
                  {/* Dot */}
                  <div className={cn("absolute left-[11px] top-1.5 h-3 w-3 rounded-full border-2 border-background md:left-[15px]", C_DOT[colorKey])} />
                  {/* Connector line below dot */}
                  {idx < EXPERIENCE.length - 1 && (
                    <div className={cn("absolute left-[16px] top-5 w-0.5 h-[calc(100%-1.25rem)] md:left-[20px]", C_LINE[colorKey])} />
                  )}

                  {/* Card */}
                  <div
                    className={cn(
                      "border bg-card/40 backdrop-blur-sm p-5 transition-all duration-300",
                      C_BORDER[colorKey],
                    )}
                    style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <p className={cn("font-mono-accent text-[10px] uppercase tracking-widest mb-1", C_TEXT[colorKey])}>
                          {exp.duration}
                        </p>
                        <h3 className="text-base font-bold text-foreground leading-none">{exp.company}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">{exp.role}</p>
                      </div>
                      <span
                        className={cn("font-mono-accent text-[9px] uppercase tracking-widest border px-2 py-0.5", C_TEXT[colorKey],
                          idx === 0 ? "border-primary/40 bg-primary/10" : "border-white/10 bg-white/5")}
                        style={{ clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
                      >
                        {idx === 0 ? "Active" : "Completed"}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground/80 mb-3">{exp.description}</p>

                    {/* Client chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.achievements.map(a => (
                        <span
                          key={a.company}
                          className={cn("font-mono-accent text-[9px] uppercase tracking-wider border px-2 py-0.5", C_TEXT[colorKey], "border-current/20 bg-current/5")}
                          style={{ clipPath: "polygon(0 0,calc(100% - 3px) 0,100% 3px,100% 100%,3px 100%,0 calc(100% - 3px))" }}
                        >
                          {a.company}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
