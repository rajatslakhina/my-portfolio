// components/sections/AboutSection.tsx
import { PROFILE_SUMMARY } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { CheckCircle } from "lucide-react";
import React from "react";

const formatMarkdownBold = (text: string): React.ReactNode[] => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <strong key={i} className="text-foreground">
                {part}
            </strong>
        ) : (
            part
        )
    );
};

const AboutSection = () => {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                {/* Profile Summary */}
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                        Who I Am
                    </p>
                    <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        {PROFILE_SUMMARY.title.replace("About Me", "About")}{" "}
                        <span className="text-gradient font-serif italic">Me</span>
                    </h2>
                    <div className="max-w-none space-y-4 text-base leading-7 text-muted-foreground">
                        {PROFILE_SUMMARY.description.map((text, index) => (
                            <p key={`desc-${index}`}>{formatMarkdownBold(text)}</p>
                        ))}
                    </div>
                </div>

                {/* Core Competencies */}
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                        What I Do
                    </p>
                    <h3 className="mb-8 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        Core{" "}
                        <span className="text-gradient font-serif italic">Competencies</span>
                    </h3>
                    <ul className="space-y-3" aria-label="Core competencies">
                        {PROFILE_SUMMARY.coreCompetencies.map((item) => (
                            <li key={item} className="flex items-start">
                                <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                <span className="text-base text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AboutSection;
