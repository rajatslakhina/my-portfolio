// components/shared/Footer.tsx
import { SITE_NAME } from "@/constants";
import SocialLinks from "./SocialLinks";

const Footer = () => (
  <footer className="relative mt-24 border-t border-primary/15">
    {/* Top glow line */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex flex-col items-center gap-1.5 md:items-start">
          <span className="font-serif text-xl font-bold italic text-gradient">{SITE_NAME}</span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono-accent text-[10px] text-muted-foreground tracking-widest">
              {new Date().getFullYear()} · Built with Next.js
            </span>
          </div>
        </div>

        {/* Status indicators */}
        <div className="hidden md:flex items-center gap-4 font-mono-accent text-[9px] text-muted-foreground tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Performance: A+
          </span>
          <span className="text-primary/20">|</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-secondary" />
            Accessibility: A
          </span>
        </div>

        <SocialLinks />
      </div>
    </div>
  </footer>
);

export default Footer;
