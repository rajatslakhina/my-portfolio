// components/sections/ExperienceSection.tsx
"use client";
import { EXPERIENCE } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const ExperienceSection = () => (
  <SectionWrapper id="experience">
    <div className="mb-16 flex flex-col items-center gap-2">
      <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">{/* work history */}
      </span>
      <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Career{" "}
        <span className="text-gradient font-serif italic">Journey</span>
      </h2>
    </div>

    <Accordion type="single" collapsible className="space-y-3">
      {EXPERIENCE.map((exp) => (
        <AccordionItem
          key={exp.company}
          value={exp.company}
          className="overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 backdrop-blur-xl transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-primary/5">
            <div className="flex w-full flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-left text-lg font-bold text-gradient">{exp.company}</p>
                <p className="text-left text-sm font-medium text-foreground/80">{exp.role}</p>
              </div>
              <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 font-mono-accent text-xs text-primary">
                {exp.duration}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {exp.description && (
              <p className="mb-5 border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground">
                {exp.description}
              </p>
            )}
            <div className="space-y-3">
              {exp.achievements.map((ach) => (
                <Card key={ach.company}
                  className="border-white/[0.05] bg-background/40 backdrop-blur-sm transition-all duration-200 hover:border-secondary/20"
                  aria-label={`${ach.company} - ${ach.duration}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">{ach.company}</CardTitle>
                    <CardDescription className="font-mono-accent text-xs">{ach.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {ach.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span className="text-xs leading-relaxed text-muted-foreground">{point}</span>
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

export default ExperienceSection;
