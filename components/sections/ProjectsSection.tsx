// components/sections/ProjectsSection.tsx
"use client";

import { PROJECTS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] } },
};

const ProjectsSection = () => {
    return (
        <SectionWrapper id="projects">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                What I&apos;ve Built
            </p>
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                My Work &amp;{" "}
                <span className="text-gradient font-serif italic">Projects</span>
            </h2>

            <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {PROJECTS.map((project) => (
                    <motion.div
                        key={project.title}
                        variants={cardVariants}
                        className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-card"
                        aria-label={`Project: ${project.title}`}
                    >
                        {/* Shine overlay on hover */}
                        <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-none group-hover:animate-shine" />

                        <CardHeader>
                            <CardTitle className="text-xl text-gradient">{project.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                        </CardContent>

                        <CardFooter className="flex space-x-2">
                            {project.link && (
                                <Button
                                    variant="outline"
                                    asChild
                                    className="border-border hover:border-primary hover:bg-primary/10"
                                >
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title}`}>
                                        <Github className="mr-2 h-4 w-4" />
                                        Code
                                    </a>
                                </Button>
                            )}
                            {project.live && (
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
                                >
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live
                                    </a>
                                </Button>
                            )}
                        </CardFooter>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
};

export default ProjectsSection;
