// components/shared/Logo.tsx
import Link from "next/link";

const Logo = () => (
  <Link href="/" className="group flex items-center gap-3" aria-label="Rajat Lakhina - Home">
    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-neon shadow-neon-primary transition-all duration-300 group-hover:shadow-neon-secondary">
      <span className="font-mono text-sm font-black text-black">RL</span>
    </span>
    <span className="hidden sm:flex sm:flex-col">
      <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Portfolio
      </span>
      <span className="font-serif text-lg font-bold italic leading-none text-gradient">
        Rajat.
      </span>
    </span>
  </Link>
);

export default Logo;
