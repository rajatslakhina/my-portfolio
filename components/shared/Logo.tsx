// components/shared/Logo.tsx
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="group flex items-center gap-2" aria-label="Rajat Lakhina - Home">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary/60 bg-primary/10 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20">
                <span className="text-lg font-bold tracking-tight text-primary">
                    RL
                </span>
            </span>
            <span className="hidden text-lg font-semibold tracking-tight text-foreground sm:inline">
                Rajat<span className="text-primary">.</span>
            </span>
        </Link>
    );
};

export default Logo;