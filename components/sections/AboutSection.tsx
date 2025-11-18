// components/sections/AboutSection.tsx
import { PROFILE_SUMMARY } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { CheckCircle } from "lucide-react";

const formatMarkdownBold = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

const AboutSection = () => {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                {/* Profile Summary */}
                <div>
                    <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {PROFILE_SUMMARY.title}
                    </h1>
                    <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 text-base leading-7">
                        {PROFILE_SUMMARY.description.map((text, index) => (
                            <p
                                key={index}
                                dangerouslySetInnerHTML={{ __html: formatMarkdownBold(text) }}
                            />
                        ))}
                    </div>
                </div>

                {/* Core Competencies */}
                <div>
                    <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        Core Competencies
                    </h2>
                    <ul className="space-y-4">
                        {PROFILE_SUMMARY.coreCompetencies.map((item, index) => (
                            <li key={index} className="flex items-start">
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