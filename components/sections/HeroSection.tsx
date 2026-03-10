// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SocialLinks from "../shared/SocialLinks";
import { Download, Eye, Send, ChevronDown } from "lucide-react";
import { RESUME_URL } from "@/constants";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
    },
};

const HeroSection = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="relative flex min-h-[calc(100vh-5rem)] items-center py-24">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">

                {/* ── Left Content ── */}
                <motion.div
                    className="flex flex-col items-center text-center lg:items-start lg:text-left"
                    variants={prefersReducedMotion ? undefined : containerVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.p
                        className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary"
                        variants={prefersReducedMotion ? undefined : itemVariants}
                    >
                        Hello, I&apos;m
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        className="text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                        variants={prefersReducedMotion ? undefined : itemVariants}
                    >
                        Rajat{" "}
                        <span className="text-gradient font-serif italic">Lakhina</span>
                    </motion.h1>

                    {/* Title */}
                    <motion.p
                        className="mt-4 text-xl font-semibold text-muted-foreground sm:text-2xl"
                        variants={prefersReducedMotion ? undefined : itemVariants}
                    >
                        Mobile Development Professional
                    </motion.p>

                    {/* Sub-description */}
                    <motion.p
                        className="mt-5 max-w-lg text-base text-muted-foreground"
                        variants={prefersReducedMotion ? undefined : itemVariants}
                    >
                        Specializing in iOS, SwiftUI, and high-performance mobile architecture.
                        Nearly 10 years building enterprise-grade products at ThoughtWorks.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                        variants={prefersReducedMotion ? undefined : itemVariants}
                    >
                        {/* Primary gradient button */}
                        <Button
                            asChild
                            size="lg"
                            className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow-primary transition-all duration-300 hover:shadow-glow-secondary hover:scale-[1.02]"
                        >
                            <a href={RESUME_URL} download>
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-primary/40 text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/10"
                        >
                            <Link href="/projects">
                                <Eye className="mr-2 h-4 w-4" />
                                View Projects
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            size="lg"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Link href="/contact">
                                <Send className="mr-2 h-4 w-4" />
                                Contact Me
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div className="mt-8" variants={prefersReducedMotion ? undefined : itemVariants}>
                        <SocialLinks />
                    </motion.div>
                </motion.div>

                {/* ── Right Content (Avatar with blob glow) ── */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                    <div className="relative">
                        {/* Animated blob glows */}
                        {!prefersReducedMotion && (
                            <>
                                <div className="animate-blob absolute -inset-4 rounded-full bg-primary/20 blur-2xl" />
                                <div className="animate-blob absolute -inset-4 rounded-full bg-secondary/20 blur-2xl [animation-delay:3s]" />
                            </>
                        )}

                        {/* Avatar ring */}
                        <div className="relative h-64 w-64 rounded-full p-[3px] sm:h-80 sm:w-80 lg:h-[400px] lg:w-[400px]"
                             style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>
                            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-card">
                                <Image
                                    src="/rajat-profile.webp"
                                    alt="Rajat Lakhina Profile Picture"
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 400px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            {!prefersReducedMotion && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
                    <ChevronDown className="h-4 w-4 animate-scroll-bounce text-primary" />
                </div>
            )}
        </section>
    );
};

export default HeroSection;
