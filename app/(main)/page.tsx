import Link from "next/link";

// 1. ShadCN UI Imports
// NOTE: Ensure the path to your button component is correct.
import { Button } from "@/components/ui/button";

// 2. Section Component Imports
// NOTE: You MUST create these files in components/sections/
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";


export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* About Preview */}
            <AboutSection />

            {/* Skills Preview */}
            <SkillsSection />

            {/* Projects Preview */}
            <ProjectsSection />

            {/* View All Projects Button */}
            <div className="mt-[-4rem] text-center mb-16">
                <Button asChild variant="secondary" size="lg">
                    <Link href="/projects">View All Projects</Link>
                </Button>
            </div>
        </>
    );
}