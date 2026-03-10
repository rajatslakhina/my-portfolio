// components/shared/Footer.tsx
import { SITE_NAME } from "@/constants";
import SocialLinks from "./SocialLinks";

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-border">
            {/* Gradient top line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()}{" "}
                        <span className="text-gradient font-semibold">{SITE_NAME}</span>. All rights reserved.
                    </p>
                    <SocialLinks />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
