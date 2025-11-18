// app/(main)/contact/page.tsx
import ContactSection from "@/components/sections/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Rajat Lakhina via email, phone, or the contact form.",
};

export default function ContactPage() {
    return <ContactSection />;
}