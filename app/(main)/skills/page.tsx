// app/(main)/skills/page.tsx
import SkillsSection from "@/components/sections/SkillsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skills",
    description: "Explore Rajat Lakhina's technical skills, including Mobile Frameworks, Architecture, Development Practices, and Tools.",
};

export default function SkillsPage() {
    return <SkillsSection />;
}