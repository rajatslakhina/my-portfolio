"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Users2, Layers, Zap, UserPlus, Share2, ShieldCheck } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface Stat {
  index: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  color: "primary" | "secondary" | "accent";
}

interface Competency {
  icon: React.ElementType;
  label: string;
  desc: string;
  color: "primary" | "secondary" | "accent";
}

/* ── Data ── */
const STATS: Stat[] = [
  { index: "01", value: 10,  suffix: "+", label: "Years",     sub: "in mobile engineering", color: "primary"   },
  { index: "02", value: 10,  suffix: "+", label: "Apps",      sub: "shipped to production", color: "secondary" },
  { index: "03", value: 50,  suffix: "+", label: "Engineers", sub: "mentored to senior",    color: "accent"    },
  { index: "04", value: 3,   suffix: "+", label: "Countries", sub: "teams led across",      color: "primary"   },
];

const COMPETENCIES: Competency[] = [
  { icon: Users2,      label: "Team Leadership",      desc: "Scale & mentor high-performance mobile teams",  color: "primary"   },
  { icon: Layers,      label: "Mobile Architecture",  desc: "iOS platform design, modular systems",          color: "secondary" },
  { icon: Zap,         label: "AI-First Development", desc: "LLM tooling & engineering transformation",      color: "accent"    },
  { icon: UserPlus,    label: "Hiring & Growing",     desc: "Build, onboard & retain senior-level talent",   color: "primary"   },
  { icon: Share2,      label: "Cross-functional",     desc: "Stakeholder alignment & delivery leadership",   color: "secondary" },
  { icon: ShieldCheck, label: "App Security",         desc: "Enterprise-grade privacy & compliance",         color: "accent"    },
];

/* ── Color maps ── */
const C_BORDER: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "border-primary/20 hover:border-primary/45",
  secondary: "border-secondary/20 hover:border-secondary/45",
  accent:    "border-accent/20 hover:border-accent/45",
};
const C_BG: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "bg-primary/8",
  secondary: "bg-secondary/8",
  accent:    "bg-accent/8",
};
const C_BRACKET: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "border-primary",
  secondary: "border-secondary",
  accent:    "border-accent",
};
const C_VALUE: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "text-primary",
  secondary: "text-secondary",
  accent:    "text-accent",
};
const C_SUB: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "text-primary/50",
  secondary: "text-secondary/50",
  accent:    "text-accent/50",
};
const C_ICON_BG: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "bg-primary/12 border-primary/25 text-primary",
  secondary: "bg-secondary/12 border-secondary/25 text-secondary",
  accent:    "bg-accent/12 border-accent/25 text-accent",
};
const C_COMP_HOVER: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "hover:border-primary/30 hover:bg-primary/5",
  secondary: "hover:border-secondary/30 hover:bg-secondary/5",
  accent:    "hover:border-accent/30 hover:bg-accent/5",
};
const C_COMP_BRACKET_HOVER: Record<"primary"|"secondary"|"accent", string> = {
  primary:   "group-hover:border-primary/50",
  secondary: "group-hover:border-secondary/50",
  accent:    "group-hover:border-accent/50",
};

/* ── Animation variants ── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-40" />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >

        {/* ── Section badge ── */}
        <motion.div variants={fadeUp} className="mb-10 flex items-center gap-3">
          <div
            className="flex items-center gap-2 border border-primary/25 bg-primary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <Terminal className="h-3 w-3 text-primary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-primary uppercase font-semibold">
              02 / leadership.profile
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2 variants={fadeUp} className="mb-12 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Who <span className="text-gradient">I Am</span>
        </motion.h2>

        {/* ── Stat cards ── */}
        <motion.div variants={container} className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <motion.div key={stat.index} variants={fadeUp}>
              <TiltCard
                className={cn(
                  "relative p-5 border transition-all duration-300 cursor-default",
                  C_BORDER[stat.color],
                  C_BG[stat.color],
                )}
                style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
              >
                <span className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2", C_BRACKET[stat.color])} />
                <span className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2", C_BRACKET[stat.color])} />
                <span className={cn("absolute top-2.5 right-3 font-mono-accent text-[9px] font-bold tracking-widest", C_SUB[stat.color])}>
                  {stat.index}
                </span>

                <p className={cn("font-mono-accent text-4xl font-black leading-none tracking-tight", C_VALUE[stat.color])}
                  style={{ textShadow: `0 0 20px currentColor` }}>
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className={cn("mt-1 font-mono-accent text-[13px] font-semibold text-foreground/80 leading-none")}>
                  {stat.label}
                </p>
                <p className={cn("mt-1 font-mono-accent text-[9px] uppercase tracking-wider leading-tight", C_SUB[stat.color])}>
                  {stat.sub}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Profile + Competencies ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">

          {/* Profile */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-primary/60" />
              <span className="font-mono-accent text-[9px] tracking-[0.3em] text-primary/50 uppercase">Profile.dat</span>
              <div className="h-px flex-1 bg-primary/10" />
            </div>

            {/* Bio with highlighted entities */}
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              <span className="font-semibold text-primary" style={{ textShadow: "0 0 10px hsl(186 100% 50%/0.5)" }}>Senior Consultant</span>{" "}
              at{" "}
              <span className="font-semibold text-secondary">ThoughtWorks</span>{" "}
              with{" "}
              <span className="font-semibold text-foreground/90">10+ years</span>{" "}
              architecting and shipping high-performance iOS platforms across{" "}
              <span className="font-medium text-foreground/90">fintech, real estate, and social</span>.
              I own the full stack of mobile delivery — from{" "}
              <span className="font-medium text-foreground/90">solution architecture</span>{" "}
              to hands-on Swift code — and build the teams that sustain it.
            </p>

            {/* Status indicators */}
            <div className="flex flex-wrap gap-2">
              {[
                { dot: "bg-primary animate-pulse", text: "Available for Tech Lead roles" },
                { dot: "bg-secondary",             text: "Based in Gurugram, India" },
                { dot: "bg-accent",                text: "Open to Remote / Hybrid" },
              ].map(({ dot, text }) => (
                <div key={text}
                  className="flex items-center gap-2 border border-white/8 bg-white/4 px-3 py-1.5"
                  style={{ clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))" }}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
                  <span className="font-mono-accent text-[9px] uppercase tracking-wider text-muted-foreground/70">{text}</span>
                </div>
              ))}
            </div>

            {/* Quote manifesto */}
            <div
              className="relative mt-2 overflow-hidden border border-primary/30 bg-card/60 p-6"
              style={{ clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))" }}
            >
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
              {/* Subtle left accent bar */}
              <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />

              <p className="font-mono-accent text-[8px] tracking-[0.3em] text-primary/70 uppercase mb-4 pl-3">
                Engineering Philosophy
              </p>
              <p className="relative text-[13px] leading-[1.9] text-foreground/90 pl-3">
                The best mobile platforms aren&apos;t built by lone architects — they&apos;re built by{" "}
                <span className="font-semibold text-primary" style={{ textShadow: "0 0 12px hsl(var(--primary)/0.4)" }}>well-structured teams</span>{" "}
                with{" "}
                <span className="font-semibold text-secondary">clear ownership and fast feedback loops</span>.
                {" "}My job is to set the technical direction, remove every obstacle in the way, and then trust the engineers I&apos;ve hired.
              </p>
            </div>
          </motion.div>

          {/* Competencies */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-secondary/60" />
              <span className="font-mono-accent text-[9px] tracking-[0.3em] text-secondary/50 uppercase">Core Attributes</span>
              <div className="h-px flex-1 bg-secondary/10" />
              <span className="font-mono-accent text-[8px] text-muted-foreground/30">{COMPETENCIES.length} modules</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {COMPETENCIES.map(({ icon: Icon, label, desc, color }) => (
                <div
                  key={label}
                  className={cn(
                    "group relative flex items-start gap-3 p-4 border border-white/6 bg-card/25 backdrop-blur-sm",
                    "transition-all duration-300 cursor-default",
                    C_COMP_HOVER[color],
                  )}
                  style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
                >
                  {/* HUD corners — appear on hover */}
                  <span className={cn("absolute top-0 left-0 w-3 h-3 border-t border-l border-transparent transition-colors duration-300", C_COMP_BRACKET_HOVER[color])} />
                  <span className={cn("absolute bottom-0 right-0 w-3 h-3 border-b border-r border-transparent transition-colors duration-300", C_COMP_BRACKET_HOVER[color])} />

                  {/* Icon */}
                  <div
                    className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300", C_ICON_BG[color])}
                    style={{ clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="font-mono-accent text-[11px] font-semibold uppercase tracking-wider text-foreground/90 leading-none">
                      {label}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-muted-foreground/55">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
