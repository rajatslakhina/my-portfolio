// app/(main)/experience/page.tsx
import ExperienceSection from "@/components/sections/ExperienceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience",
    description: "Review Rajat Lakhina's career journey, detailing roles at ThoughtWorks, DTC Infotech, and Mobile Programming LLC.",
};

export default function ExperiencePage() {
    return <ExperienceSection />;
}