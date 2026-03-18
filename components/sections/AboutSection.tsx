"use client";
import { PROFILE_SUMMARY } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Terminal, ChevronRight, User, Cpu } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const formatMarkdownBold = (text: string): React.ReactNode[] =>
  text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-semibold text-primary/90">{part}</strong>
      : part
  );

const STATS = [
  { value: "10+", num: 10, suffix: "+", label: "Years XP",      color: "hsl(186 100% 50%)" },
  { value: "10+", num: 10, suffix: "+", label: "Apps Shipped",   color: "hsl(275 100% 60%)" },
  { value: "5+",  num: 5,  suffix: "+", label: "Enterprise",     color: "hsl(335 100% 55%)" },
  { value: "100%",num:100, suffix: "%", label: "Mobile Passion", color: "hsl(186 100% 50%)" },
];

function AnimatedCounter({ target, suffix = "", color }: { target: number; suffix?: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !inView) return;
    let frame = 0;
    const total = 60;
    const tick = () => {
      frame++;
      setCount(Math.min(Math.round((frame / total) * target), target));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, reduced]);
  return (
    <p ref={ref} className="font-mono-accent text-3xl font-black leading-none tabular-nums"
      style={{ color, textShadow: `0 0 16px ${color}60` }}>
      {reduced ? target : count}{suffix}
    </p>
  );
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="about">
      {/* Header */}
      <motion.div className="mb-14 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <User className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">01 / about.exe</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Who <span className="text-gradient font-serif italic">I Am</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
        variants={reduced ? undefined : stagger}
        initial={reduced ? false : "hidden"}
        whileInView="show" viewport={{ once: true }}
      >
        {STATS.map((s, i) => (
          <motion.div key={s.label} variants={reduced ? undefined : fadeUp}>
            <TiltCard intensity={12}>
              <div className="relative border bg-card/60 p-5 text-center transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: s.color + "30",
                  clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                }}
              >
                <div className="absolute inset-0 opacity-30"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}18, transparent 70%)` }} />
                <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l" style={{ borderColor: s.color + "80" }} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r" style={{ borderColor: s.color + "80" }} />
                <span className="absolute top-1.5 right-2 font-mono-accent text-[8px]" style={{ color: s.color + "40" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <AnimatedCounter target={s.num} suffix={s.suffix} color={s.color} />
                <p className="mt-2 font-mono-accent text-[10px] uppercase tracking-wider" style={{ color: s.color + "80" }}>{s.label}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Content grid */}
      <motion.div className="grid grid-cols-1 gap-10 lg:grid-cols-2"
        variants={reduced ? undefined : stagger}
        initial={reduced ? false : "hidden"}
        whileInView="show" viewport={{ once: true }}
      >
        {/* Bio — terminal block */}
        <motion.div variants={reduced ? undefined : fadeUp}>
          <div className="relative border border-primary/15 bg-card/50 backdrop-blur-xl overflow-hidden"
            style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
          >
            {/* Terminal top bar */}
            <div className="flex items-center gap-2 border-b border-primary/10 bg-primary/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="ml-2 font-mono-accent text-[9px] text-primary/50 tracking-widest">
                ~/profile/bio.md
              </span>
            </div>
            <div className="p-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono-accent text-[10px] text-primary tracking-widest">{PROFILE_SUMMARY.title}</span>
              </div>
              {PROFILE_SUMMARY.description.map((text, i) => (
                <p key={i} className="pl-5 border-l border-primary/20">{formatMarkdownBold(text)}</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core competencies */}
        <motion.div variants={reduced ? undefined : fadeUp}>
          <div className="flex items-center gap-2 mb-5">
            <Cpu className="h-4 w-4 text-secondary" />
            <h3 className="text-lg font-bold text-foreground">Core Competencies</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE_SUMMARY.coreCompetencies.map((competency, i) => (
              <motion.div
                key={competency}
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : i * 0.05, duration: 0.3 }}
                whileHover={reduced ? undefined : { scale: 1.05, transition: { duration: 0.15 } }}
                className="group flex items-center gap-1.5 border border-secondary/20 bg-secondary/5 px-3 py-1.5 cursor-default transition-all duration-200 hover:border-secondary/50 hover:bg-secondary/12"
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
              >
                <ChevronRight className="h-3 w-3 text-secondary/50 group-hover:text-secondary transition-colors duration-200 group-hover:translate-x-0.5" />
                <span className="font-mono-accent text-[10px] text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-none">
                  {competency}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
