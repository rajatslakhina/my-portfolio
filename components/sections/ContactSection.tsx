// components/sections/ContactSection.tsx
"use client";

import { CONTACT_DETAILS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageSquare, Send, icons, Linkedin } from "lucide-react";
import { FaMedium } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const contactLinks = [
    {
        icon: Mail,
        label: "Email",
        value: CONTACT_DETAILS.email,
        href: `mailto:${CONTACT_DETAILS.email}`
    },
    {
        icon: Phone,
        label: "Phone",
        value: CONTACT_DETAILS.phone,
        href: `tel:${CONTACT_DETAILS.phone}`
    },
    {
        icon: MapPin,
        label: "Location",
        value: CONTACT_DETAILS.location,
    },
    {
        icon: Linkedin,
        label: "linkedIn",
        value: CONTACT_DETAILS.linkedin,
    },
    {
        icon: FaMedium,
        label: "Medium",
        value: CONTACT_DETAILS.medium,
    }
];

const ContactSection = () => {
    // A simple handler to prevent default form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle form submission here
        // (e.g., send to an API endpoint or service like Formspree)
        alert("Contact form submitted (demo)!");
    };

    return (
        <SectionWrapper id="contact">
            <h1 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Get In Touch
            </h1>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <div className="flex flex-col space-y-8">
                    <div className="mb-8"> {/* Added a div wrapper and bottom margin */}
                        <h2 className="text-2xl font-semibold">{"Let's Connect"}</h2>
                        <p className="mt-2 text-muted-foreground">
                            {"I'm open to discussing new opportunities, projects, or just chatting about mobile tech."}
                        </p>
                    </div>
                    <div className="space-y-4">
                        {contactLinks.map((item) => (
                            <div key={item.label} className="flex items-start">
                                <item.icon className="mr-4 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                <div>
                                    <h3 className="font-semibold">{item.label}</h3>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-muted-foreground">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4">
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                            <a href={CONTACT_DETAILS.whatsapp} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="mr-2 h-5 w-5" />
                                Chat on WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Contact Form */}
                {/* <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" type="text" placeholder="Your Name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" type="text" placeholder="Subject of your message" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Your message..."
                            rows={6}
                            required
                        />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                    </Button>
                </form> */}
            </div>
        </SectionWrapper>
    );
};

export default ContactSection;