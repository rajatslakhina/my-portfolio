// components/sections/ContactSection.tsx
import { CONTACT_DETAILS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { MediumIcon, WhatsAppIcon } from "@/components/icons";

const contactLinks = [
    { icon: Mail, label: "Email", value: CONTACT_DETAILS.email, href: `mailto:${CONTACT_DETAILS.email}` },
    { icon: Phone, label: "Phone", value: CONTACT_DETAILS.phone, href: `tel:${CONTACT_DETAILS.phone}` },
    { icon: MapPin, label: "Location", value: CONTACT_DETAILS.location },
    { icon: Linkedin, label: "LinkedIn", value: CONTACT_DETAILS.linkedin, href: CONTACT_DETAILS.linkedin, displayValue: "LinkedIn Profile" },
    { icon: MediumIcon, label: "Medium", value: CONTACT_DETAILS.medium, href: CONTACT_DETAILS.medium, displayValue: "Medium Blog" },
];

const ContactSection = () => {
    return (
        <SectionWrapper id="contact">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                Reach Out
            </p>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Get In{" "}
                <span className="text-gradient font-serif italic">Touch</span>
            </h2>

            <div className="mx-auto max-w-lg">
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-foreground">{"Let's Connect"}</h3>
                    <p className="mt-2 text-muted-foreground">
                        {"I'm open to discussing new opportunities, projects, or just chatting about mobile tech."}
                    </p>
                </div>

                <div className="space-y-4">
                    {contactLinks.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-start rounded-xl border border-border bg-card/50 p-4 transition-all duration-200 hover:border-primary/40"
                            aria-label={`${item.label}: ${item.value}`}
                        >
                            <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    {item.label}
                                </p>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="mt-0.5 break-all text-sm font-medium text-foreground transition-colors hover:text-primary"
                                        {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    >
                                        {"displayValue" in item ? item.displayValue : item.value}
                                    </a>
                                ) : (
                                    <p className="mt-0.5 text-sm font-medium text-foreground">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <Button
                        asChild
                        size="lg"
                        className="w-full bg-whatsapp text-white hover:bg-whatsapp/90"
                    >
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
