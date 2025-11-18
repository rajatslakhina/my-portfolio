// app/(main)/about/page.tsx
import AboutSection from "@/components/sections/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn about Rajat Lakhina's 10 years of experience in mobile development, core competencies, and professional summary.",
};

export default function AboutPage() {
    return <AboutSection />;
}