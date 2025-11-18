// app/(main)/projects/page.tsx
import ProjectsSection from "@/components/sections/ProjectsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Browse a selection of Rajat Lakhina's projects, showcasing skills in iOS, SwiftUI, Next.js, and more.",
};

export default function ProjectsPage() {
    return <ProjectsSection />;
}