// components/sections/ProjectsSection.tsx
"use client";

import { PROJECTS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const ProjectsSection = () => {
    return (
        <SectionWrapper id="projects">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Work & Projects
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
                        className="h-full"
                    >
                        <Card className="flex h-full flex-col justify-between bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10" aria-label={`Project: ${project.title}`}>
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                                <CardDescription className="pt-2">
                                    <span className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </CardContent>
                            <CardFooter className="flex space-x-2">
                                {project.link && (
                                    <Button variant="outline" asChild>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title}`}>
                                            <Github className="mr-2 h-4 w-4" />
                                            Code
                                        </a>
                                    </Button>
                                )}
                                {project.live && (
                                    <Button variant="secondary" asChild>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Live
                                        </a>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
};

export default ProjectsSection;
