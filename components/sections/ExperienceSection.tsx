// components/sections/ExperienceSection.tsx
"use client";

import { EXPERIENCE } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const ExperienceSection = () => {
    return (
        <SectionWrapper id="experience">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                Work History
            </p>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Career{" "}
                <span className="text-gradient font-serif italic">Journey</span>
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {EXPERIENCE.map((exp) => (
                    <AccordionItem
                        key={exp.company}
                        value={exp.company}
                        className="overflow-hidden rounded-xl border border-border bg-card/50 shadow-sm transition-all duration-200 hover:border-primary/30 data-[state=open]:border-primary/40"
                    >
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-primary/5">
                            <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gradient">{exp.company}</h3>
                                    <p className="text-sm font-medium text-foreground">{exp.role}</p>
                                </div>
                                <span className="flex-shrink-0 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground sm:ml-4">
                                    {exp.duration}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            {exp.description && (
                                <p className="mb-6 text-base text-muted-foreground">{exp.description}</p>
                            )}
                            <div className="space-y-4">
                                {exp.achievements.map((ach) => (
                                    <Card
                                        key={ach.company}
                                        className="border-border bg-background/50 transition-all duration-200 hover:border-primary/30"
                                        aria-label={`${ach.company} - ${ach.duration}`}
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-base font-semibold text-foreground">
                                                {ach.company}
                                            </CardTitle>
                                            <CardDescription>{ach.duration}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {ach.points.map((point) => (
                                                    <li key={point} className="flex items-start">
                                                        <Check className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                                                        <span className="text-sm text-muted-foreground">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </SectionWrapper>
    );
};

export default ExperienceSection;
