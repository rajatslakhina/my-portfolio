// components/shared/SocialLinks.tsx
import { SOCIAL_LINKS } from "@/constants";
import { Mail, Linkedin, Phone } from "lucide-react";
import { MediumIcon } from "@/components/icons";
import { Button } from "../ui/button";

const links = [
    {
        href: SOCIAL_LINKS.linkedin,
        icon: <Linkedin className="h-5 w-5" />,
        label: "LinkedIn"
    },
    {
        href: SOCIAL_LINKS.medium,
        icon: <MediumIcon className="h-5 w-5" />,
        label: "Medium"
    },
    {
        href: `mailto:${SOCIAL_LINKS.email}`,
        icon: <Mail className="h-5 w-5" />,
        label: "Email"
    },
    {
        href: `tel:${SOCIAL_LINKS.phone}`,
        icon: <Phone className="h-5 w-5" />,
        label: "Phone"
    },
];

const SocialLinks = () => {
    return (
        <div className="flex items-center space-x-2">
            {links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                    <Button
                        key={link.label}
                        variant="outline"
                        size="icon"
                        asChild
                        aria-label={link.label}
                    >
                        <a
                            href={link.href}
                            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                            {link.icon}
                        </a>
                    </Button>
                );
            })}
        </div>
    );
};

export default SocialLinks;
