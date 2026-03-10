// components/sections/SkillsSection.tsx
"use client";
import { SKILLS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useReducedMotion } from "framer-motion";
import { Code, Layers, Puzzle, Gauge, Settings, LucideIcon } from "lucide-react";

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

  return (
    <SectionWrapper id="skills">
      <div className="mb-16 flex flex-col items-center gap-2">
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">{/* tech stack */}
        </span>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          My Professional{" "}
          <span className="text-gradient font-serif italic">Toolkit</span>
        </h2>
      </div>

      <Tabs defaultValue="mobile" className="w-full">
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

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {(skillsData[tab.value as keyof typeof skillsData] as Skill[]).map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduced ? 0 : i * 0.04, duration: 0.35, ease: [0.22,1,0.36,1] }}
                  whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.15 } }}
                  className="group glass-card flex cursor-default flex-col items-center justify-center rounded-xl p-4 text-center"
                  aria-label={`Skill: ${skill.name}`}
                >
                  <skill.icon className="mb-3 h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]" />
                  <span className="font-mono-accent text-xs font-medium text-foreground">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </SectionWrapper>
  );
};

export default SkillsSection;
