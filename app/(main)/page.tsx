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
            <Suspense>
                <AboutSection />
            </Suspense>

            {/* Skills Preview */}
            <Suspense>
                <SkillsSection />
            </Suspense>

            {/* Projects Preview */}
            <Suspense>
                <ProjectsSection />
            </Suspense>

            {/* View All Projects Button */}
            <div className="mt-[-4rem] text-center mb-16">
                <Button asChild variant="secondary" size="lg">
                    <Link href="/projects">View All Projects</Link>
                </Button>
            </div>
        </>
    );
}
