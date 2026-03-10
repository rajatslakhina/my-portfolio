// components/sections/ContactSection.tsx
import { CONTACT_DETAILS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { MediumIcon, WhatsAppIcon } from "@/components/icons";

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
        label: "LinkedIn",
        value: CONTACT_DETAILS.linkedin,
        href: CONTACT_DETAILS.linkedin,
        displayValue: "LinkedIn Profile",
    },
    {
        icon: MediumIcon,
        label: "Medium",
        value: CONTACT_DETAILS.medium,
        href: CONTACT_DETAILS.medium,
        displayValue: "Medium Blog",
    }
];

const ContactSection = () => {
    return (
        <SectionWrapper id="contact">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Get In Touch
            </h2>

            <div className="mx-auto max-w-lg">
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold">{"Let's Connect"}</h3>
                    <p className="mt-2 text-muted-foreground">
                        {"I'm open to discussing new opportunities, projects, or just chatting about mobile tech."}
                    </p>
                </div>
                <div className="space-y-4">
                    {contactLinks.map((item) => (
                        <div key={item.label} className="flex items-start" aria-label={`${item.label}: ${item.value}`}>
                            <item.icon className="mr-4 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <div>
                                <h4 className="font-semibold">{item.label}</h4>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="break-all text-muted-foreground transition-colors hover:text-primary"
                                        {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    >
                                        {"displayValue" in item ? item.displayValue : item.value}
                                    </a>
                                ) : (
                                    <p className="text-muted-foreground">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pt-8">
                    <Button asChild size="lg" className="bg-whatsapp hover:bg-whatsapp/90 text-white">
                        <a href={CONTACT_DETAILS.whatsapp} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="mr-2 h-5 w-5" />
                            Chat on WhatsApp
                        </a>
                    </Button>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default ContactSection;
