// components/sections/EducationSection.tsx
import { EDUCATION } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const EducationSection = () => {
    return (
        <SectionWrapper id="education">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Education
            </h2>

            <div className="relative space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"></div>

                {EDUCATION.map((edu, index) => (
                    <div key={edu.institution} className="relative flex w-full items-start">
                        {/* Timeline Dot */}
                        <div className="absolute left-6 top-3 z-10 -translate-x-1/2 rounded-full bg-primary p-1.5 md:left-1/2">
                            <GraduationCap className="h-3 w-3 text-primary-foreground" />
                        </div>

                        {/* Card */}
                        <Card
                            className={cn(
                                "w-full bg-card/50 ml-12 md:ml-0",
                                index % 2 === 0 ? "md:mr-auto md:w-[45%]" : "md:ml-auto md:w-[45%]"
                            )}
                            aria-label={`${edu.degree} at ${edu.institution}`}
                        >
                            <CardHeader>
                                <CardTitle className="text-lg text-primary">{edu.degree}</CardTitle>
                                <CardDescription className="pt-1 !text-foreground">{edu.institution}</CardDescription>
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
