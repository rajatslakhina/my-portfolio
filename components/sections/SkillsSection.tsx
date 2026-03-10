// components/sections/SkillsSection.tsx
"use client";
import { SKILLS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Code, Layers, Puzzle, Gauge, Settings, LucideIcon } from "lucide-react";
import { useState } from "react";

const tabs = [
  { value: "mobile",       label: "Mobile",       icon: Code },
  { value: "architecture", label: "Architecture",  icon: Layers },
  { value: "practices",    label: "Practices",     icon: Puzzle },
  { value: "performance",  label: "Performance",   icon: Gauge },
  { value: "tools",        label: "Tools",         icon: Settings },
];

const skillsData = {
  mobile:       SKILLS.mobileFrameworks,
  architecture: SKILLS.architecturePatterns,
  practices:    SKILLS.developmentPractices,
  performance:  SKILLS.performanceMonitoring,
  tools:        SKILLS.toolsBuildSystems,
};

type Skill = { name: string; icon: LucideIcon };

const SkillsSection = () => {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState("mobile");

  return (
    <SectionWrapper id="skills">
      <motion.div
        className="mb-16 flex flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          tech stack
        </span>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          My Professional{" "}
          <span className="text-gradient font-serif italic">Toolkit</span>
        </h2>
      </motion.div>

      <Tabs defaultValue="mobile" className="w-full" onValueChange={setActiveTab}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xl border border-primary/10 bg-card/50 p-1 backdrop-blur-md lg:grid-cols-5">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg font-mono-accent text-xs uppercase tracking-wider transition-all duration-200 data-[state=active]:bg-gradient-neon data-[state=active]:text-black data-[state=active]:shadow-neon-primary"
              >
                <tab.icon className="mr-1.5 h-3.5 w-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-8">
            <AnimatePresence mode="wait">
              {activeTab === tab.value && (
                <motion.div
                  key={tab.value}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                >
                  {(skillsData[tab.value as keyof typeof skillsData] as Skill[]).map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={reduced ? false : { opacity: 0, scale: 0.85, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: reduced ? 0 : i * 0.045, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={reduced ? undefined : {
                        y: -6,
                        scale: 1.05,
                        transition: { duration: 0.15 },
                      }}
                      className="group relative glass-card flex cursor-default flex-col items-center justify-center overflow-hidden rounded-xl p-4 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-neon-primary"
                      aria-label={`Skill: ${skill.name}`}
                    >
                      {/* Hover glow bg */}
                      <div className="absolute inset-0 bg-primary/0 transition-all duration-300 group-hover:bg-primary/5 rounded-xl" />
                      <skill.icon className="relative mb-3 h-8 w-8 text-primary/70 transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.9)]" />
                      <span className="relative font-mono-accent text-xs font-medium text-foreground">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </SectionWrapper>
  );
};

export default SkillsSection;
