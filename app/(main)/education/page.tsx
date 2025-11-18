// app/(main)/education/page.tsx
import EducationSection from "@/components/sections/EducationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Education",
    description: "Details of Rajat Lakhina's academic background, including B.Tech from Kurukshetra University.",
};

export default function EducationPage() {
    return <EducationSection />;
}