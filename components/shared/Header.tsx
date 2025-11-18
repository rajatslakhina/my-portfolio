// components/shared/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

const Header = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <motion.header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-background/80 backdrop-blur-lg shadow-md"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                                    pathname === link.href && "text-primary",
                                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300",
                                    pathname === link.href ? "after:scale-x-100" : "hover:after:scale-x-100"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;