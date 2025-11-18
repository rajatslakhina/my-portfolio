// components/shared/Logo.tsx
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foreground">
                Rajat<span className="text-primary">.</span>
            </span>
        </Link>
    );
};

export default Logo;