// components/sections/ProjectsSection.tsx
"use client";
import { PROJECTS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CyberBadge } from "@/components/ui/cyber-badge";
import { Github, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const GRADIENTS = [
  "from-primary/8  via-transparent to-secondary/8",
  "from-secondary/8 via-transparent to-accent/8",
  "from-accent/8   via-transparent to-primary/8",
  "from-primary/6  via-secondary/4 to-transparent",
];

interface ProjectsSectionProps { limit?: number; }

const ProjectsSection = ({ limit }: ProjectsSectionProps) => {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="projects">
      <div className="mb-16 flex flex-col items-center gap-2">
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">{/* what i&apos;ve built */}
        </span>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          My Work &amp;{" "}
          <span className="text-gradient font-serif italic">Projects</span>
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
        variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
      >
        {(limit ? PROJECTS.slice(0, limit) : PROJECTS).map((project, i) => (
          <motion.div
            key={project.title}
            variants={reduced ? undefined : { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
            whileHover={reduced ? undefined : { y: -5, transition: { duration: 0.2 } }}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1),0_20px_60px_rgba(0,0,0,0.5)]"
            aria-label={`Project: ${project.title}`}
          >
            {/* Gradient background layer */}
            <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
            {/* Shine */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-none group-hover:animate-shine" />

            <CardHeader className="relative z-10">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl font-bold text-gradient leading-tight">{project.title}</CardTitle>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <CyberBadge key={tag} label={tag} variant="primary" />
                ))}
                {project.tags.length > 4 && (
                  <CyberBadge label={`+${project.tags.length - 4}`} variant="muted" />
                )}
              </div>
            </CardHeader>

            <CardContent className="relative z-10 flex-1">
              <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            </CardContent>

            <CardFooter className="relative z-10 flex gap-2">
              {project.link && (
                <Button variant="outline" size="sm" asChild
                  className="border-white/10 hover:border-primary hover:bg-primary/10 transition-all duration-200">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3.5 w-3.5" /> Code
                  </a>
                </Button>
              )}
              {project.live && (
                <Button size="sm" asChild
                  className="bg-gradient-neon font-semibold text-black hover:opacity-90 shadow-neon-primary transition-all duration-200">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live
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
