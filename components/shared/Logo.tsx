// components/shared/Logo.tsx
import Link from "next/link";

const Logo = () => (
  <Link href="/" className="group flex items-center gap-3" aria-label="Rajat Lakhina - Home">
    {/* HUD-style logo mark */}
    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden bg-gradient-neon shadow-neon-primary transition-all duration-300 group-hover:shadow-neon-secondary"
      style={{ clipPath: "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)" }}
    >
      <span className="font-mono text-sm font-black text-black tracking-tighter">RL</span>
    </span>
    <span className="hidden sm:flex sm:flex-col">
      <span className="font-mono-accent text-[9px] font-semibold uppercase tracking-[0.3em] text-primary/50">
        &lt;Portfolio /&gt;
      </span>
      <span className="font-serif text-lg font-bold italic leading-none text-gradient">
        Rajat.
      </span>
    </span>
  </Link>
);

export default Logo;
