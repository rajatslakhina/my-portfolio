// components/sections/SkillsSection.tsx
"use client";

import { SKILLS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useReducedMotion } from "framer-motion";
import { Code, Layers, Puzzle, Gauge, Settings, LucideIcon } from "lucide-react";

const tabs = [
    { value: "mobile", label: "Mobile Frameworks", icon: Code },
    { value: "architecture", label: "Architecture & Patterns", icon: Layers },
    { value: "practices", label: "Dev Practices", icon: Puzzle },
    { value: "performance", label: "Performance", icon: Gauge },
    { value: "tools", label: "Tools & Build", icon: Settings },
];

const skillsData = {
    mobile: SKILLS.mobileFrameworks,
    architecture: SKILLS.architecturePatterns,
    practices: SKILLS.developmentPractices,
    performance: SKILLS.performanceMonitoring,
    tools: SKILLS.toolsBuildSystems,
};

type Skill = { name: string; icon: LucideIcon };

const SkillsSection = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <SectionWrapper id="skills">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                Technical Expertise
            </p>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                My Professional{" "}
                <span className="text-gradient font-serif italic">Toolkit</span>
            </h2>

            <Tabs defaultValue="mobile" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-2 gap-1 border border-border bg-card/50 p-1 md:grid-cols-3 lg:grid-cols-5">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground sm:text-sm"
                        >
                            <tab.icon className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="truncate">{tab.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-8">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {(skillsData[tab.value as keyof typeof skillsData] as Skill[]).map(
                                (skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: prefersReducedMotion ? 0 : 0.05 * index, duration: 0.35 }}
                                        aria-label={`Skill: ${skill.name}`}
                                        className="group relative flex flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-glow-card"
                                    >
                                        <skill.icon className="mb-3 h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                                        <span className="text-sm font-medium text-foreground">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </SectionWrapper>
    );
};

export default SkillsSection;
