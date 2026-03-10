// components/shared/Footer.tsx
import { SITE_NAME } from "@/constants";
import SocialLinks from "./SocialLinks";

const Footer = () => (
  <footer className="relative mt-24 border-t border-primary/10">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-serif text-xl font-bold italic text-gradient">{SITE_NAME}</span>
          <span className="font-mono-accent text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} · Built with Next.js &amp; passion
          </span>
        </div>
        <SocialLinks />
      </div>
    </div>
  </footer>
);

export default Footer;
