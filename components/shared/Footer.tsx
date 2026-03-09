// components/shared/Footer.tsx
import { SITE_NAME } from "@/constants";
import SocialLinks from "./SocialLinks";

const Footer = () => {
    return (
        <footer className="border-t border-border mt-24 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0">
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;