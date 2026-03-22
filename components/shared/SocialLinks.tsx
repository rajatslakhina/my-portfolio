// components/shared/SocialLinks.tsx
import { CONTACT_DETAILS } from "@/constants";
import { Mail, Linkedin, Phone } from "lucide-react";
import { MediumIcon } from "@/components/icons";
import { Button } from "../ui/button";

const links = [
    { href: CONTACT_DETAILS.linkedin,           icon: <Linkedin className="h-5 w-5" />,   label: "LinkedIn" },
    { href: CONTACT_DETAILS.medium,             icon: <MediumIcon className="h-5 w-5" />, label: "Medium"   },
    { href: `mailto:${CONTACT_DETAILS.email}`,  icon: <Mail className="h-5 w-5" />,       label: "Email"    },
    { href: `tel:${CONTACT_DETAILS.phone}`,     icon: <Phone className="h-5 w-5" />,      label: "Phone"    },
];

const SocialLinks = () => {
    return (
        <div className="flex items-center space-x-2">
            {links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                    <Button key={link.label} variant="outline" size="icon" asChild aria-label={link.label}>
                        <a href={link.href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                            {link.icon}
                        </a>
                    </Button>
                );
            })}
        </div>
    );
};

export default SocialLinks;
