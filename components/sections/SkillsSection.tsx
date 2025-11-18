// components/sections/SkillsSection.tsx
"use client";

import { SKILLS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
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

const fadeInAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        },
    }),
};

const SkillsSection = () => {
    return (
        <SectionWrapper id="skills">
            <h1 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Professional Toolkit
            </h1>

            <Tabs defaultValue="mobile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm">
                            <tab.icon className="mr-2 h-4 w-4" />
                            {tab.label}
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
                                        variants={fadeInAnimation}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                        custom={index}
                                    >
                                        <Card className="h-full transform-gpu bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                                            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                                                <skill.icon className="mb-3 h-8 w-8 text-primary" />
                                                <span className="text-sm font-medium text-foreground">
                                                    {skill.name}
                                                </span>
                                            </CardContent>
                                        </Card>
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