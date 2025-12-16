// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SocialLinks from "../shared/SocialLinks";
import { Download, Eye, Send } from "lucide-react";
import { RESUME_URL } from "@/constants";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const HeroSection = () => {
    return (
        <section className="flex min-h-[calc(100vh-5rem)] items-center py-24">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
                {/* Left Content */}
                <motion.div
                    className="flex flex-col items-center text-center lg:items-start lg:text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2
                        className="text-lg font-medium text-primary"
                        variants={itemVariants}
                    >
                        Rajat Lakhina
                    </motion.h2>
                    <motion.h1
                        className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
                        variants={itemVariants}
                    >
                        Mobile Development Professional
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-lg text-muted-foreground"
                        variants={itemVariants}
                    >
                        Specializing in iOS, SwiftUI, and high-performance mobile
                        architecture.
                    </motion.p>

                    <motion.div
                        className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                        variants={itemVariants}
                    >
                        <Button asChild size="lg">
                            <a href={RESUME_URL} download>
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                            </a>
                        </Button>
                        <Button asChild variant="secondary" size="lg">
                            <Link href="/projects">
                                <Eye className="mr-2 h-4 w-4" />
                                View Projects
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/contact">
                                <Send className="mr-2 h-4 w-4" />
                                Contact Me
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div className="mt-10" variants={itemVariants}>
                        <SocialLinks />
                    </motion.div>
                </motion.div>

                {/* Right Content (Image Placeholder) */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="relative h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary p-2 lg:h-[400px] lg:w-[400px]">

                        {/* THIS IS THE CRUCIAL BLOCK TO UPDATE */}
                        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-card overflow-hidden">
                            <Image
                                src="/rajat-profile.webp" // <-- Path to your image
                                alt="Rajat Lakhina Profile Picture"
                                fill
                                priority
                                className="object-cover" // <-- Ensure the image fills and covers the circular container
                            />
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;