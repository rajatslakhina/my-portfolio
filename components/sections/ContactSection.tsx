// components/sections/ContactSection.tsx
import { CONTACT_DETAILS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { MediumIcon, WhatsAppIcon } from "@/components/icons";

const contactLinks = [
  { icon: Mail,        label: "Email",    value: CONTACT_DETAILS.email,    href: `mailto:${CONTACT_DETAILS.email}` },
  { icon: Phone,       label: "Phone",    value: CONTACT_DETAILS.phone,    href: `tel:${CONTACT_DETAILS.phone}` },
  { icon: MapPin,      label: "Location", value: CONTACT_DETAILS.location },
  { icon: Linkedin,    label: "LinkedIn", value: CONTACT_DETAILS.linkedin, href: CONTACT_DETAILS.linkedin, displayValue: "LinkedIn Profile" },
  { icon: MediumIcon,  label: "Medium",   value: CONTACT_DETAILS.medium,   href: CONTACT_DETAILS.medium,   displayValue: "Medium Blog" },
];

const ICON_COLORS = ["text-primary", "text-secondary", "text-muted-foreground", "text-primary", "text-secondary"];
const BORDER_COLORS = ["border-primary/20 bg-primary/5", "border-secondary/20 bg-secondary/5", "border-border bg-muted/30", "border-primary/20 bg-primary/5", "border-secondary/20 bg-secondary/5"];

const ContactSection = () => (
  <SectionWrapper id="contact">
    <div className="mb-16 flex flex-col items-center gap-2">
      <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">{/* reach out */}
      </span>
      <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
        Get In{" "}
        <span className="text-gradient font-serif italic">Touch</span>
      </h2>
    </div>

    <div className="mx-auto max-w-lg">
      <p className="mb-8 text-center text-muted-foreground">
        {"I'm open to new opportunities, collaborations, or just a chat about mobile tech."}
      </p>

      <div className="space-y-3">
        {contactLinks.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 rounded-xl border ${BORDER_COLORS[i]} p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/30`}
            aria-label={`${item.label}: ${item.value}`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${BORDER_COLORS[i]}`}>
              <item.icon className={`h-4.5 w-4.5 ${ICON_COLORS[i]}`} />
            </div>
            <div className="min-w-0">
              <p className="font-mono-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="truncate text-sm font-medium text-foreground transition-colors hover:text-primary"
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {"displayValue" in item ? item.displayValue : item.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button asChild size="lg" className="w-full bg-whatsapp text-white hover:bg-whatsapp/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--whatsapp)/0.4)]">
          <a href={CONTACT_DETAILS.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="mr-2 h-5 w-5" />
            Chat on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  </SectionWrapper>
);

export default ContactSection;
