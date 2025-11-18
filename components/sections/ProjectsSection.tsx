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

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ProjectsSection = () => {
    return (
        <SectionWrapper id="projects">
            <h1 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Work & Projects
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                    >
                        <Card className="flex h-full flex-col justify-between bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                                <CardDescription className="pt-2">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </CardContent>
                            <CardFooter className="flex space-x-2">
                                {project.link && (
                                    <Button variant="outline" asChild>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            Code
                                        </a>
                                    </Button>
                                )}
                                {project.live && (
                                    <Button variant="secondary" asChild>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Live
                                        </a>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default ProjectsSection;