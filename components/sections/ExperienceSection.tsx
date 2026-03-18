"use client";
import { EXPERIENCE } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, Award, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

/* ── Color per company ── */
const COMPANY_COLORS: Record<string, { color: string; dim: string; label: string }> = {
  "ThoughtWorks":           { color: "hsl(186 100% 50%)",  dim: "hsl(186 100% 50% / 0.12)", label: "ACTIVE"    },
  "DTC Infotech":           { color: "hsl(275 100% 60%)",  dim: "hsl(275 100% 60% / 0.12)", label: "COMPLETED" },
  "Mobile Programming LLC": { color: "hsl(335 100% 55%)",  dim: "hsl(335 100% 55% / 0.12)", label: "COMPLETED" },
  "HCL Technologies":       { color: "hsl(186 100% 50%)",  dim: "hsl(186 100% 50% / 0.10)", label: "COMPLETED" },
  "Konnecs Infotech":       { color: "hsl(275 100% 60%)",  dim: "hsl(275 100% 60% / 0.10)", label: "COMPLETED" },
};

const STATS = [
  { icon: Calendar,   value: "10+",  label: "Years",     color: "hsl(186 100% 50%)" },
  { icon: Briefcase,  value: "5",    label: "Companies", color: "hsl(275 100% 60%)" },
  { icon: Shield,     value: "12+",  label: "Clients",   color: "hsl(335 100% 55%)" },
  { icon: TrendingUp, value: "$2M+", label: "Delivered", color: "hsl(186 100% 50%)" },
];

const fade = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const slideLeft  = { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const slideRight = { hidden: { opacity: 0, x:  32 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export default function ExperienceSection() {
  const reduced  = useReducedMotion();
  const [open, setOpen] = useState<string | null>(EXPERIENCE[0]?.company ?? null);

  return (
    <SectionWrapper id="experience">

      {/* Header */}
      <motion.div className="mb-14 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <Briefcase className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">04 / career.log</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Career <span className="text-gradient font-serif italic">Journey</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-4"
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true }}
        variants={reduced ? undefined : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {STATS.map(({ icon: Icon, value, label, color }) => (
          <motion.div key={label} variants={reduced ? undefined : fade}>
            <TiltCard intensity={10}
              className="relative border bg-card/60 p-4 text-center transition-all duration-300"
              style={{ borderColor: color + "30", clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
            >
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l" style={{ borderColor: color + "80" }} />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r" style={{ borderColor: color + "80" }} />
              <Icon className="mx-auto mb-2 h-4 w-4" style={{ color }} />
              <p className="font-mono-accent text-2xl font-black" style={{ color, textShadow: `0 0 12px ${color}60` }}>{value}</p>
              <p className="font-mono-accent text-[9px] tracking-widest uppercase mt-1" style={{ color: color + "80" }}>{label}</p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Glow line */}
        <div className="absolute left-6 top-0 bottom-0 w-px lg:left-1/2"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(186 100% 50% / 0.35) 10%, hsl(275 100% 60% / 0.35) 50%, hsl(186 100% 50% / 0.35) 90%, transparent)" }}
        />

        <div className="space-y-0">
          {EXPERIENCE.map((exp, idx) => {
            const theme  = COMPANY_COLORS[exp.company] ?? { color: "hsl(186 100% 50%)", dim: "hsl(186 100% 50% / 0.10)", label: "COMPLETED" };
            const isOpen = open === exp.company;
            const isEven = idx % 2 === 0;
            const isCurrent = idx === 0;

            return (
              <motion.div key={exp.company}
                className="relative pl-16 pb-12 lg:pl-0 lg:pb-16"
                initial={reduced ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={reduced ? undefined : { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-3 -translate-x-1/2 lg:left-1/2 z-10">
                  {isCurrent && (
                    <span className="absolute -inset-2 rounded-full animate-ping"
                      style={{ background: theme.color, opacity: 0.18 }} />
                  )}
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: theme.color,
                      background: isCurrent ? theme.color : "hsl(220 50% 3%)",
                      boxShadow: `0 0 14px ${theme.color}80`,
                    }}
                  >
                    {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
                  </div>
                </div>

                {/* Card — alternates desktop */}
                <div className={`lg:w-[calc(50%-2.5rem)] ${isEven ? "lg:ml-auto lg:pl-10" : "lg:mr-auto lg:pr-10"}`}>
                  <motion.div variants={reduced ? undefined : (isEven ? slideRight : slideLeft)} className="group">

                    {/* Company header */}
                    <button
                      onClick={() => setOpen(isOpen ? null : exp.company)}
                      className="relative w-full text-left border bg-card/70 backdrop-blur-xl transition-all duration-300 overflow-hidden"
                      style={{
                        borderColor: isOpen ? theme.color + "55" : theme.color + "20",
                        clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
                        boxShadow: isOpen ? `0 0 30px ${theme.color}18, 0 0 60px ${theme.color}08` : "none",
                      }}
                    >
                      <div className="absolute inset-0 transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${theme.dim}, transparent)`, opacity: isOpen ? 1 : 0.4 }} />
                      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 z-10 transition-colors duration-300"
                        style={{ borderColor: isOpen ? theme.color : theme.color + "35" }} />
                      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 z-10 transition-colors duration-300"
                        style={{ borderColor: isOpen ? theme.color : theme.color + "35" }} />

                      <div className="relative z-10 p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="flex h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ background: theme.color, boxShadow: `0 0 6px ${theme.color}` }} />
                              <span className="font-mono-accent text-[9px] tracking-[0.3em] uppercase"
                                style={{ color: theme.color + "bb" }}>{theme.label}</span>
                              {isCurrent && (
                                <span className="font-mono-accent text-[8px] tracking-wider border px-1.5 py-0.5 uppercase"
                                  style={{ color: theme.color, borderColor: theme.color + "40", background: theme.dim }}>
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-black tracking-tight sm:text-2xl"
                              style={{ color: theme.color, textShadow: isOpen ? `0 0 20px ${theme.color}55` : "none" }}>
                              {exp.company}
                            </h3>
                            <p className="mt-0.5 text-sm font-medium text-foreground/80">{exp.role}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="font-mono-accent text-xs border px-3 py-1 flex items-center gap-1"
                              style={{
                                borderColor: theme.color + "40",
                                color: theme.color,
                                background: theme.dim,
                                clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))",
                              }}
                            >
                              <Calendar className="h-3 w-3" />{exp.duration}
                            </span>
                            <span className="font-mono-accent text-[9px] tracking-widest transition-colors duration-200"
                              style={{ color: isOpen ? theme.color : "hsl(0 0% 50%)" }}>
                              {isOpen ? "▲ COLLAPSE" : "▼ EXPAND"}
                            </span>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground border-l-2 pl-3"
                            style={{ borderColor: theme.color + "50" }}>
                            {exp.description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex -space-x-1">
                            {exp.achievements.map((_, ai) => (
                              <div key={ai} className="w-5 h-5 rounded-full border-2 border-background flex items-center justify-center text-[7px] font-mono font-black"
                                style={{ background: theme.color, color: "black" }}>{ai + 1}</div>
                            ))}
                          </div>
                          <span className="font-mono-accent text-[9px] text-muted-foreground">
                            {exp.achievements.length} project{exp.achievements.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Achievement cards */}
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 space-y-2">
                        {exp.achievements.map((ach, ai) => (
                          <motion.div key={ach.company}
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.35, delay: ai * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <TiltCard intensity={6}
                              className="border bg-background/60 backdrop-blur-sm transition-all duration-200 hover:bg-background/80 overflow-hidden group/ach"
                              style={{
                                borderColor: theme.color + "18",
                                clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                              }}
                            >
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <Award className="h-3.5 w-3.5 shrink-0" style={{ color: theme.color }} />
                                    <span className="font-mono-accent text-[9px] uppercase tracking-widest" style={{ color: theme.color + "80" }}>
                                      Mission {String(ai + 1).padStart(2, "0")}
                                    </span>
                                  </div>
                                  <span className="font-mono-accent text-[9px] border px-2 py-0.5 text-muted-foreground flex items-center gap-1"
                                    style={{ borderColor: theme.color + "25", clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
                                  >
                                    <Calendar className="h-2.5 w-2.5" />{ach.duration}
                                  </span>
                                </div>
                                <h4 className="text-sm font-bold text-foreground mb-3">{ach.company}</h4>
                                <ul className="space-y-2">
                                  {ach.points.map((pt, pi) => (
                                    <li key={pi} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                                      <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 transition-transform duration-200 group-hover/ach:translate-x-0.5"
                                        style={{ color: theme.color }} />
                                      <span dangerouslySetInnerHTML={{
                                        __html: pt
                                          .replace(/(\$[\d,.]+[kKmMbB]*)/g, `<strong style="color:${theme.color};text-shadow:0 0 8px ${theme.color}60">$1</strong>`)
                                          .replace(/([+\-]\d+%)/g, `<strong style="color:hsl(335 100% 65%);text-shadow:0 0 8px hsl(335 100% 55% / 0.5)">$1</strong>`)
                                      }} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </TiltCard>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline end */}
        <div className="absolute left-6 bottom-0 -translate-x-1/2 lg:left-1/2">
          <div className="w-3 h-3 rounded-full border border-primary/40 bg-background flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-primary/60" />
          </div>
        </div>
      </div>

    </SectionWrapper>
  );
}
