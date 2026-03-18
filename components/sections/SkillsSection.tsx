"use client";
import { SKILLS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { motion, useReducedMotion, AnimatePresence, useInView } from "framer-motion";
import { Code, Layers, Puzzle, Gauge, Settings, Cpu, LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/* ─── Tab definitions ─── */
const TABS = [
  {
    id: "mobile",       label: "Mobile",       short: "MOB", icon: Code,
    color: "hsl(186 100% 50%)", desc: "Native iOS & cross-platform mobile frameworks",
  },
  {
    id: "architecture", label: "Architecture",  short: "ARC", icon: Layers,
    color: "hsl(275 100% 60%)", desc: "Design patterns & scalable system architecture",
  },
  {
    id: "practices",    label: "Practices",     short: "DEV", icon: Puzzle,
    color: "hsl(335 100% 55%)", desc: "Engineering methodology & team collaboration",
  },
  {
    id: "performance",  label: "Performance",   short: "PRF", icon: Gauge,
    color: "hsl(186 100% 50%)", desc: "Monitoring, profiling & app optimisation",
  },
  {
    id: "tools",        label: "Tools",         short: "SYS", icon: Settings,
    color: "hsl(275 100% 60%)", desc: "Build systems, CI/CD pipelines & dev tooling",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SKILLS_MAP: Record<TabId, { name: string; icon: LucideIcon }[]> = {
  mobile:       SKILLS.mobileFrameworks,
  architecture: SKILLS.architecturePatterns,
  practices:    SKILLS.developmentPractices,
  performance:  SKILLS.performanceMonitoring,
  tools:        SKILLS.toolsBuildSystems,
};

/* ─── Proficiency — 5-dot scale ─── */
/* Mobile: iOS/SwiftUI/Swift/UIKit/Combine/CoreLocation/CoreAnimation=5, Objective-C/CoreData=4     */
/* Architecture: MVVM/CleanArch/Modular/Offline/DesignPatterns=5, VIPER/SOLID=4, Concurrency=3     */
/* Practices: DevOps HIDDEN, CI-CD=3, all others=4                                                 */
/* Performance: all=4 except New Relic=2                                                            */
/* Tools: all=4 except Jenkins=3, Carthage=2                                                        */
const PROFICIENCY: Record<string, 1 | 2 | 3 | 4 | 5> = {
  /* Mobile */
  "iOS": 5, "SwiftUI": 5, "Swift": 5, "UIKit": 5,
  "Objective-C": 4, "Combine": 5, "CoreData": 4, "CoreLocation": 5, "CoreAnimation": 5,
  /* Architecture */
  "MVVM": 5, "VIPER": 4, "Clean Architecture": 5, "Modular Architecture": 5,
  "Concurrency": 3, "Offline-first Design": 5, "Design Patterns": 5, "SOLID Principles": 4,
  /* Practices (DevOps filtered out in render) */
  "Agile/Scrum": 4, "TDD/BDD": 4, "CI/CD": 3,
  "Stakeholder Alignment": 4, "Security": 4, "Scalability": 4,
  /* Performance */
  "Performance Tuning": 4, "Memory Management": 4, "App Store Connect": 4,
  "Firebase (Analytics, Crashlytics)": 4, "New Relic": 2,
  /* Tools */
  "Xcode": 4, "Git": 4, "Jenkins": 3, "Bitrise": 4, "Fastlane": 4,
  "JIRA": 4, "SPM": 4, "CocoaPods": 4, "Carthage": 2,
};

const HIDDEN_SKILLS = new Set(["DevOps"]);

const PROF_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  5: "Expert", 4: "Advanced", 3: "Proficient", 2: "Familiar", 1: "Learning",
};
const PROF_COLOR: Record<1 | 2 | 3 | 4 | 5, string> = {
  5: "hsl(186 100% 50%)",
  4: "hsl(275 100% 60%)",
  3: "hsl(335 100% 55%)",
  2: "hsl(220 10% 55%)",
  1: "hsl(220 10% 40%)",
};

/* Animated counter */
function Counter({ to, color }: { to: number; color: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || reduced) { setN(to); return; }
    let f = 0;
    const tick = () => { f++; setN(Math.min(Math.round((f / 40) * to), to)); if (f < 40) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView, to, reduced]);
  return <span ref={ref} style={{ color, textShadow: `0 0 14px ${color}60` }}>{n}</span>;
}

export default function SkillsSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<TabId>("mobile");
  const theme = TABS.find(t => t.id === active)!;
  const skills = SKILLS_MAP[active].filter(s => !HIDDEN_SKILLS.has(s.name));
  const totalAll = Object.values(SKILLS_MAP).reduce((s, a) => s + a.length, 0);

  return (
    <SectionWrapper id="skills">

      {/* ─── Header ─── */}
      <motion.div className="mb-12 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <Cpu className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">02 / skills.db</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          My Professional <span className="text-gradient font-serif italic">Toolkit</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* ─── Global stats row ─── */}
      <motion.div className="mb-10 flex flex-wrap justify-center gap-4 sm:gap-8"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
      >
        {[
          { label: "Total Skills",  val: totalAll,            color: "hsl(186 100% 50%)" },
          { label: "Categories",    val: TABS.length,         color: "hsl(275 100% 60%)" },
          { label: "Years Practice",val: 10,                  color: "hsl(335 100% 55%)" },
        ].map(({ label, val, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <p className="font-mono-accent text-3xl font-black tabular-nums">
              <Counter to={val} color={color} />
              <span style={{ color }} className="text-xl">+</span>
            </p>
            <p className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/70">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* ─── Tab bar ─── */}
      <motion.div className="mb-2 grid grid-cols-3 gap-2 sm:grid-cols-5"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
      >
        {TABS.map((tab, i) => {
          const isActive = tab.id === active;
          const count = SKILLS_MAP[tab.id].length;
          return (
            <motion.button key={tab.id} onClick={() => setActive(tab.id)}
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="relative flex flex-col items-center justify-center gap-1.5 overflow-hidden px-3 py-3 transition-all duration-200"
              style={{
                clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
                border: `1px solid ${isActive ? tab.color + "70" : tab.color + "20"}`,
                background: isActive ? tab.color + "14" : "hsl(225 40% 5% / 0.6)",
                boxShadow: isActive ? `0 0 24px ${tab.color}22, 0 0 60px ${tab.color}08` : "none",
              }}
            >
              {/* Active bg radial */}
              {isActive && (
                <motion.div layoutId="skill-tab-bg" className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 50% 120%, ${tab.color}18, transparent 70%)` }}
                  transition={{ duration: 0.25 }}
                />
              )}
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l transition-colors duration-200"
                style={{ borderColor: isActive ? tab.color + "90" : tab.color + "25" }} />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r transition-colors duration-200"
                style={{ borderColor: isActive ? tab.color + "90" : tab.color + "25" }} />

              <tab.icon className="relative h-4 w-4 transition-all duration-200"
                style={{ color: isActive ? tab.color : tab.color + "60" }} />
              <span className="relative font-mono-accent text-[9px] uppercase tracking-widest transition-colors duration-200"
                style={{ color: isActive ? tab.color : "hsl(220 10% 55%)" }}>
                {tab.label}
              </span>
              {/* Count badge */}
              <span className="relative font-mono-accent text-[8px] px-1.5 py-0.5 transition-all duration-200"
                style={{
                  color: isActive ? "black" : tab.color + "80",
                  background: isActive ? tab.color : tab.color + "15",
                  clipPath: "polygon(0 0,calc(100% - 3px) 0,100% 3px,100% 100%,3px 100%,0 calc(100% - 3px))",
                }}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* ─── Category description + active separator ─── */}
      <div className="mb-7 flex items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.p key={active}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="font-mono-accent text-[10px] text-muted-foreground/70 uppercase tracking-widest flex-1"
            style={{ color: theme.color + "70" }}
          >
            {"// "}{theme.desc}
          </motion.p>
        </AnimatePresence>
        <motion.div className="h-px w-32"
          style={{ background: `linear-gradient(to right, ${theme.color}70, transparent)` }}
          animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ─── Skills grid ─── */}
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {skills.map((skill, i) => {
            const prof = PROFICIENCY[skill.name] ?? 2;
            return (
              <motion.div key={skill.name}
                initial={reduced ? false : { opacity: 0, scale: 0.82, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : i * 0.045, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduced ? undefined : { y: -7, scale: 1.05, transition: { duration: 0.15 } }}
                className="group relative flex cursor-default flex-col items-center justify-center overflow-hidden border bg-card/60 backdrop-blur-sm p-4 pt-5 text-center transition-all duration-300 hover:bg-card/80"
                style={{
                  clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                  borderColor: theme.color + "20",
                }}
                aria-label={skill.name}
              >
                {/* Hover bg glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at 50% 110%, ${theme.color}14, transparent 65%)` }} />

                {/* Index */}
                <span className="absolute top-1.5 left-2 font-mono-accent text-[8px] opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  style={{ color: theme.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-300 opacity-30 group-hover:opacity-100"
                  style={{ borderColor: theme.color }} />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-300 opacity-30 group-hover:opacity-100"
                  style={{ borderColor: theme.color }} />

                {/* Icon */}
                <skill.icon className="relative mb-2.5 h-6 w-6 transition-all duration-300 group-hover:scale-115"
                  style={{ color: theme.color + "90" }} />

                {/* Name */}
                <span className="relative font-mono-accent text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-tight mb-2">
                  {skill.name}
                </span>

                {/* Proficiency dots */}
                <div className="relative flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(dot => (
                    <div key={dot}
                      className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: dot <= prof ? PROF_COLOR[prof] : theme.color + "20",
                        boxShadow: dot <= prof ? `0 0 4px ${PROF_COLOR[prof]}80` : "none",
                        transform: dot <= prof ? "scale(1)" : "scale(0.8)",
                      }}
                    />
                  ))}
                  <span className="ml-1 font-mono-accent text-[7px] opacity-0 group-hover:opacity-70 transition-opacity duration-200"
                    style={{ color: PROF_COLOR[prof] }}>
                    {PROF_LABELS[prof]}
                  </span>
                </div>

                {/* Bottom neon line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: theme.color, boxShadow: `0 0 8px ${theme.color}` }} />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ─── Footer stats ─── */}
      <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
        {[
          { label: "Expert",     count: skills.filter(s => (PROFICIENCY[s.name] ?? 4) === 5).length, color: "hsl(186 100% 50%)" },
          { label: "Advanced",   count: skills.filter(s => (PROFICIENCY[s.name] ?? 4) === 4).length, color: "hsl(275 100% 60%)" },
          { label: "Proficient", count: skills.filter(s => (PROFICIENCY[s.name] ?? 4) === 3).length, color: "hsl(335 100% 55%)" },
        ].map(({ label, count, color }) => count > 0 && (
          <span key={label} className="flex items-center gap-1.5 font-mono-accent text-[9px] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
            <span style={{ color }}>{count}</span>
            <span className="text-muted-foreground/50">{label}</span>
          </span>
        ))}
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
      </motion.div>
    </SectionWrapper>
  );
}
