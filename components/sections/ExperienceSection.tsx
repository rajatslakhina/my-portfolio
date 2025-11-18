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
import { Check, Dot } from "lucide-react";

const ExperienceSection = () => {
    return (
        <SectionWrapper id="experience">
            <h1 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Career Journey
            </h1>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {EXPERIENCE.map((exp, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border bg-card/50 shadow-sm">
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                            <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-primary">{exp.company}</h3>
                                    <p className="text-sm font-medium text-foreground">{exp.role}</p>
                                </div>
                                <p className="flex-shrink-0 text-xs text-muted-foreground sm:ml-4">{exp.duration}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            {exp.description && (
                                <p className="mb-6 text-base text-muted-foreground">{exp.description}</p>
                            )}

                            <div className="space-y-4">
                                {exp.achievements.map((ach, achIndex) => (
                                    <Card key={achIndex} className="bg-background/50">
                                        <CardHeader>
                                            <CardTitle className="text-base font-semibold">{ach.company}</CardTitle>
                                            <CardDescription>{ach.duration}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {ach.points.map((point, pIndex) => (
                                                    <li key={pIndex} className="flex items-start">
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