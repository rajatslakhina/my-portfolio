import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/sections/HeroSection";
import BlogSection from "@/components/sections/BlogSection";

const AboutSection    = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection   = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={null}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={null}>
        <ProjectsSection />
      </Suspense>

      <div className="mb-10 text-center">
        <Button asChild variant="outline"
          className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-neon-primary transition-all duration-300">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>

      {/* Blog preview — server component, no Suspense needed for SSR */}
      <BlogSection />
    </>
  );
}
