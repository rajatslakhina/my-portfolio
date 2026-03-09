// components/shared/MobileNav.tsx
"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
                <div className="flex h-full flex-col">
                    <div className="flex items-center border-b pb-4">
                        <Logo />
                    </div>
                    <nav className="mt-8 flex flex-col space-y-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className={cn(
                                    "text-lg font-medium text-muted-foreground transition-colors hover:text-primary",
                                    pathname === link.href && "text-primary"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
