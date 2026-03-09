// components/sections/AboutSection.tsx
import { PROFILE_SUMMARY } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { CheckCircle } from "lucide-react";
import React from "react";

const formatMarkdownBold = (text: string): React.ReactNode[] => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
};

const AboutSection = () => {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                {/* Profile Summary */}
                <div>
                    <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {PROFILE_SUMMARY.title}
                    </h2>
                    <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 text-base leading-7">
                        {PROFILE_SUMMARY.description.map((text, index) => (
                            <p key={`desc-${index}`}>
                                {formatMarkdownBold(text)}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Core Competencies */}
                <div>
                    <h3 className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        Core Competencies
                    </h3>
                    <ul className="space-y-4">
                        {PROFILE_SUMMARY.coreCompetencies.map((item) => (
                            <li key={item} className="flex items-start">
                                <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                <span className="text-base text-muted-foreground">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AboutSection;
