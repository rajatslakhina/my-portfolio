import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroSection from "@/components/sections/HeroSection";
import BlogSection from "@/components/sections/BlogSection";

const AboutSection        = dynamic(() => import("@/components/sections/AboutSection"));
const TimelineSection     = dynamic(() => import("@/components/sections/TimelineSection"));
const SkillsSection       = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectsSection     = dynamic(() => import("@/components/sections/ProjectsSection"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={null}>
        <TimelineSection />
      </Suspense>

      <Suspense fallback={null}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={null}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>

      <BlogSection />
    </>
  );
}
