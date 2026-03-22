"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* ── Data ── */
interface Skill {
  name: string;
  icon: string;
  level: number; // 0–100
}

interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "Swift",       icon: "⚡", level: 98 },
      { name: "SwiftUI",     icon: "🎨", level: 95 },
      { name: "UIKit",       icon: "📱", level: 92 },
      { name: "Objective-C", icon: "🔧", level: 80 },
      { name: "Combine",     icon: "🔀", level: 88 },
      { name: "Core Data",   icon: "🗄️", level: 85 },
      { name: "AVFoundation",icon: "🎬", level: 82 },
      { name: "React Native",icon: "⚛️", level: 65 },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    skills: [
      { name: "MVVM",        icon: "🏗️", level: 97 },
      { name: "TCA",         icon: "🎯", level: 90 },
      { name: "Clean Arch",  icon: "🧹", level: 95 },
      { name: "VIPER",       icon: "🐍", level: 85 },
      { name: "MVC",         icon: "📐", level: 90 },
      { name: "Coordinator", icon: "🗺️", level: 88 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Xcode",       icon: "🛠️", level: 98 },
      { name: "Git",         icon: "🌿", level: 92 },
      { name: "CI/CD",       icon: "🔄", level: 88 },
      { name: "Instruments", icon: "📊", level: 85 },
      { name: "Fastlane",    icon: "🚀", level: 82 },
      { name: "Figma",       icon: "🖌️", level: 70 },
    ],
  },
];

/* ── Animation variants ── */
const sectionContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -12, filter: "blur(3px)", transition: { duration: 0.25, ease: "easeIn" } },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
  exit: {},
};

/* ── Skill card ── */
interface SkillCardProps {
  skill: Skill;
}

function SkillCard({ skill }: SkillCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative border border-primary/12 bg-card/40 p-4 backdrop-blur-sm
                 transition-all duration-300
                 hover:border-primary/40 hover:bg-card/60 hover:shadow-card-hover
                 hover:-translate-y-1"
      style={{
        clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
      }}
    >
      {/* Corner brackets — appear on hover */}
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-3 mb-3">
        {/* Icon with glow on hover */}
        <span
          className="text-xl transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
          aria-hidden="true"
        >
          {skill.icon}
        </span>
        <span className="font-mono-accent text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors duration-300">
          {skill.name}
        </span>
      </div>

      {/* Level bar */}
      <div className="relative h-1 w-full overflow-hidden bg-primary/10"
        style={{ clipPath: "polygon(0 0,calc(100% - 2px) 0,100% 2px,100% 100%,2px 100%,0 calc(100% - 2px))" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-neon"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ boxShadow: "0 0 6px hsl(var(--primary)/0.6)" }}
        />
      </div>
      <p className="mt-1.5 font-mono-accent text-[9px] text-primary/40 tracking-wider">
        {skill.level}%
      </p>
    </motion.div>
  );
}

/* ── Main section ── */
export default function SkillsSection() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab) ?? SKILL_CATEGORIES[0];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-30" />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={sectionContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >

        {/* ── Section label badge ── */}
        <motion.div variants={fadeUp} className="mb-10 flex items-center gap-3">
          <div
            className="flex items-center gap-2 border border-primary/25 bg-primary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <Cpu className="h-3 w-3 text-primary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-primary uppercase font-semibold">
              02 / skills.db
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          variants={fadeUp}
          className="mb-12 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Tech{" "}
          <span className="text-gradient">Arsenal</span>
        </motion.h2>

        {/* ── Tabs ── */}
        <motion.div variants={fadeUp}>
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
          >
            {/* Tab triggers */}
            <TabsList className="mb-8 flex h-auto gap-1 bg-transparent p-0 flex-wrap">
              {SKILL_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeTab;
                return (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className={[
                      "relative overflow-hidden border font-mono-accent text-[10px] font-bold uppercase tracking-widest px-4 py-2",
                      "transition-all duration-300",
                      isActive
                        ? "border-transparent bg-gradient-neon text-black shadow-neon-primary"
                        : "border-primary/20 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    ].join(" ")}
                    style={{
                      clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))",
                    }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/20 group-hover:animate-shine pointer-events-none" />
                    )}
                    {cat.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Tab content — keyed to force remount + stagger on tab change */}
            {SKILL_CATEGORIES.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} forceMount>
                <AnimatePresence mode="wait">
                  {activeTab === cat.id && (
                    <motion.div
                      key={cat.id}
                      variants={gridContainer}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
                    >
                      {activeCategory.skills.map((skill) => (
                        <SkillCard key={skill.name} skill={skill} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

      </motion.div>
    </section>
  );
}
