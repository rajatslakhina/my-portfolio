// components/sections/EducationSection.tsx
import { EDUCATION } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const EducationSection = () => (
  <SectionWrapper id="education">
    <div className="mb-16 flex flex-col items-center gap-2">
      <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">{/* academic background */}
      </span>
      <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        <span className="text-gradient font-serif italic">Education</span>
      </h2>
    </div>

    <div className="relative space-y-8">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2 md:-translate-x-1/2" />

      {EDUCATION.map((edu, index) => (
        <div key={edu.institution} className="relative flex w-full items-start">
          {/* Dot */}
          <div className="absolute left-6 top-4 z-10 -translate-x-1/2 rounded-full bg-gradient-neon p-1.5 shadow-neon-primary md:left-1/2">
            <GraduationCap className="h-3 w-3 text-black" />
          </div>

          <Card
            className={cn(
              "glass-card ml-12 w-full md:ml-0",
              index % 2 === 0 ? "md:mr-auto md:w-[45%]" : "md:ml-auto md:w-[45%]"
            )}
            aria-label={`${edu.degree} at ${edu.institution}`}
          >
            <CardHeader>
              <CardTitle className="text-base font-bold text-gradient">{edu.degree}</CardTitle>
              <p className="text-sm font-medium text-foreground">{edu.institution}</p>
              <CardDescription className="font-mono-accent text-xs">{edu.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{edu.details}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default EducationSection;
