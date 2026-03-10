// components/shared/Logo.tsx
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="group flex items-center gap-2" aria-label="Rajat Lakhina - Home">
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary shadow-glow-primary transition-all duration-300 group-hover:shadow-glow-secondary">
                <span className="text-base font-bold tracking-tight text-black">
                    RL
                </span>
            </span>
            <span className="hidden text-lg font-semibold tracking-tight sm:inline">
                <span className="text-foreground">Rajat</span>
                <span className="text-gradient font-serif italic">.</span>
            </span>
        </Link>
    );
};

export default Logo;
