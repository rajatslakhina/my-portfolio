import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/sections/HeroSection";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* About Preview */}
            <Suspense fallback={null}>
                <AboutSection />
            </Suspense>

            {/* Skills Preview */}
            <Suspense fallback={null}>
                <SkillsSection />
            </Suspense>

            {/* Projects Preview */}
            <Suspense fallback={null}>
                <ProjectsSection />
            </Suspense>

            {/* View All Projects Button */}
            <div className="mb-16 text-center">
                <Button asChild variant="secondary" size="lg">
                    <Link href="/projects">View All Projects</Link>
                </Button>
            </div>
        </>
    );
}
