// components/sections/EducationSection.tsx
import { EDUCATION } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const EducationSection = () => {
    return (
        <SectionWrapper id="education">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                Academic Background
            </p>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                <span className="text-gradient font-serif italic">Education</span>
            </h2>

            <div className="relative space-y-8">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2 md:-translate-x-1/2" />

                {EDUCATION.map((edu, index) => (
                    <div key={edu.institution} className="relative flex w-full items-start">
                        {/* Timeline dot */}
                        <div className="absolute left-6 top-3 z-10 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-secondary p-1.5 md:left-1/2">
                            <GraduationCap className="h-3 w-3 text-black" />
                        </div>

                        {/* Card */}
                        <Card
                            className={cn(
                                "ml-12 w-full border-border bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-card md:ml-0",
                                index % 2 === 0 ? "md:mr-auto md:w-[45%]" : "md:ml-auto md:w-[45%]"
                            )}
                            aria-label={`${edu.degree} at ${edu.institution}`}
                        >
                            <CardHeader>
                                <CardTitle className="text-lg text-gradient">{edu.degree}</CardTitle>
                                <p className="pt-1 text-sm font-medium text-foreground">{edu.institution}</p>
                                <CardDescription>{edu.duration}</CardDescription>
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
};

export default EducationSection;
