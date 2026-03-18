"use client";
import { PROJECTS } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { CyberBadge } from "@/components/ui/cyber-badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { Github, ExternalLink, FolderOpen, Star, Radio, Filter, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo } from "react";

interface ProjectsSectionProps { limit?: number; }

type Project = (typeof PROJECTS)[number];

const ACCENT = [
  "hsl(186 100% 50%)",
  "hsl(275 100% 60%)",
  "hsl(335 100% 50%)",
  "hsl(186 100% 50%)",
  "hsl(275 100% 60%)",
  "hsl(335 100% 50%)",
] as const;

/* ─── Build tag filter list from all projects ─── */
const ALL_TAGS = ["All", "iOS", "SwiftUI", "React Native", "Architecture", "Security"];

/* ─── Stats for the header ─── */
const STATS = [
  { value: String(PROJECTS.length), label: "Projects",  color: "hsl(186 100% 50%)" },
  { value: String(PROJECTS.filter(p => p.live).length), label: "Live Apps", color: "hsl(275 100% 60%)" },
  { value: "3",                     label: "Companies", color: "hsl(335 100% 50%)" },
];

export default function ProjectsSection({ limit }: ProjectsSectionProps) {
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sourceProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  const filtered = useMemo(() => {
    if (activeFilter === "All") return sourceProjects;
    return sourceProjects.filter(p =>
      p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  }, [activeFilter, sourceProjects]);

  const [featured, ...rest] = filtered;

  return (
    <SectionWrapper id="projects">

      {/* ─── Header ─── */}
      <motion.div className="mb-12 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <FolderOpen className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">03 / projects.log</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          My Work &amp; <span className="text-gradient font-serif italic">Projects</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* ─── Stats row ─── */}
      <motion.div className="mb-10 flex flex-wrap justify-center gap-6 sm:gap-12"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
      >
        {STATS.map(({ value, label, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="font-mono-accent text-3xl font-black tabular-nums"
              style={{ color, textShadow: `0 0 16px ${color}50` }}>{value}</span>
            <span className="font-mono-accent text-[9px] uppercase tracking-widest text-muted-foreground/70">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ─── Filter tabs ─── */}
      {!limit && (
        <motion.div className="mb-8 flex flex-wrap justify-center gap-2"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="self-center mr-1 font-mono-accent text-[9px] text-muted-foreground/50 uppercase tracking-widest flex items-center gap-1">
            <Filter className="h-3 w-3" />Filter
          </span>
          {ALL_TAGS.map(tag => {
            const isActive = activeFilter === tag;
            return (
              <motion.button key={tag} onClick={() => setActiveFilter(tag)}
                whileHover={reduced ? undefined : { scale: 1.05 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                className="relative overflow-hidden font-mono-accent text-[10px] uppercase tracking-widest px-3.5 py-1.5 transition-all duration-200"
                style={{
                  clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
                  border: `1px solid ${isActive ? "hsl(186 100% 50%)" : "hsl(186 100% 50% / 0.2)"}`,
                  background: isActive ? "hsl(186 100% 50% / 0.15)" : "transparent",
                  color: isActive ? "hsl(186 100% 50%)" : "hsl(220 10% 55%)",
                  boxShadow: isActive ? "0 0 16px hsl(186 100% 50% / 0.2)" : "none",
                }}
              >
                {isActive && (
                  <motion.span layoutId="proj-filter-bg" className="absolute inset-0"
                    style={{ background: "hsl(186 100% 50% / 0.08)" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative">{tag}</span>
              </motion.button>
            );
          })}
          {activeFilter !== "All" && (
            <motion.span className="self-center font-mono-accent text-[9px] text-muted-foreground/50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              · {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </motion.span>
          )}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={activeFilter}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* ─── Featured project (full width) ─── */}
          {featured && (
            <motion.div className="mb-5"
              initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard intensity={4}
                className="group relative overflow-hidden bg-card/70 backdrop-blur-xl transition-all duration-300"
                style={{
                  clipPath: "polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px))",
                  border: `1px solid ${ACCENT[0]}30`,
                } as React.CSSProperties}
              >
                {/* BG gradient */}
                <div className="absolute inset-0 opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${ACCENT[0]}10 0%, transparent 50%, ${ACCENT[1]}08 100%)` }} />

                {/* Scan line */}
                <div className="absolute inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${ACCENT[0]}80, transparent)`, top: "50%" }} />

                {/* Corner accents — all 4, large */}
                <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 z-10 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                  style={{ borderColor: ACCENT[0] }} />
                <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 z-10 opacity-50"
                  style={{ borderColor: ACCENT[0] }} />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 z-10 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                  style={{ borderColor: ACCENT[0] }} />
                <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 z-10 opacity-50"
                  style={{ borderColor: ACCENT[0] }} />

                {/* Shine */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-none group-hover:animate-shine" />

                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${ACCENT[0]}, ${ACCENT[1]}, ${ACCENT[2]})` }} />

                <div className="relative z-10 grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
                  <div>
                    {/* Featured badge + index */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-mono-accent text-[9px] uppercase tracking-widest border px-2.5 py-1"
                        style={{
                          borderColor: ACCENT[0] + "60", color: ACCENT[0], background: ACCENT[0] + "15",
                          clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))",
                          boxShadow: `0 0 12px ${ACCENT[0]}30`,
                        }}
                      >
                        <Star className="h-3 w-3" fill="currentColor" /> Featured Project
                      </span>
                      {featured.live && (
                        <span className="flex items-center gap-1.5 font-mono-accent text-[9px] uppercase tracking-widest"
                          style={{ color: "hsl(142 72% 50%)" }}>
                          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(142_72%_50%)] animate-pulse" />
                          Live
                        </span>
                      )}
                      <span className="ml-auto font-mono-accent text-[10px]" style={{ color: ACCENT[0] + "40" }}>001</span>
                    </div>

                    <h3 className="text-2xl font-black tracking-tight sm:text-3xl"
                      style={{ color: ACCENT[0], textShadow: `0 0 24px ${ACCENT[0]}40` }}>
                      {featured.title}
                    </h3>
                    {"role" in featured && (
                      <p className="mt-1 font-mono-accent text-[10px] uppercase tracking-widest" style={{ color: ACCENT[0] + "70" }}>
                        {(featured as { role?: string }).role}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-2xl border-l-2 pl-4"
                      style={{ borderColor: ACCENT[0] + "40" }}>
                      {featured.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {featured.tags.map((tag) => (
                        <CyberBadge key={tag} label={tag} variant="primary" />
                      ))}
                    </div>
                  </div>

                  {/* CTA column */}
                  <div className="flex flex-row gap-3 lg:flex-col lg:items-end lg:justify-center">
                    {featured.link && (
                      <Button variant="outline" asChild
                        className="border-primary/30 font-mono-accent text-[10px] tracking-widest uppercase hover:border-primary hover:bg-primary/10 transition-all duration-200"
                        style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                      >
                        <a href={featured.link} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Source
                        </a>
                      </Button>
                    )}
                    {featured.live && (
                      <Button asChild
                        className="bg-gradient-neon font-mono-accent text-[10px] tracking-widest uppercase font-bold text-black hover:opacity-90 shadow-neon-primary transition-all duration-200"
                        style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
                      >
                        <a href={featured.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> App Store
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* ─── Grid of remaining projects ─── */}
          {rest.length > 0 && (
            <motion.div
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              initial={reduced ? false : "hidden"}
              whileInView="visible" viewport={{ once: true }}
            >
              {rest.map((project, i) => {
                const idx = i + 1; // offset because featured is 0
                const color = ACCENT[idx % ACCENT.length];
                return (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={idx}
                    color={color}
                    reduced={!!reduced}
                    isHovered={hoveredIdx === idx}
                    onHover={() => setHoveredIdx(idx)}
                    onLeave={() => setHoveredIdx(null)}
                  />
                );
              })}
            </motion.div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div className="py-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-mono-accent text-sm text-muted-foreground/60">
                No projects match <span className="text-primary">{activeFilter}</span> · Try another filter
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}

/* ─── Individual project card ─── */
function ProjectCard({
  project, index, color, reduced, isHovered, onHover, onLeave
}: {
  project: Project; index: number; color: string; reduced: boolean;
  isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
  return (
    <motion.div
      variants={reduced ? undefined : {
        hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <TiltCard intensity={6}
        className="group relative flex h-full flex-col overflow-hidden bg-card/70 backdrop-blur-xl transition-all duration-300"
        style={{
          clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
          border: `1px solid ${color}22`,
        } as React.CSSProperties}
        // @ts-expect-error -- onMouseEnter/Leave on TiltCard div
        onMouseEnter={onHover} onMouseLeave={onLeave}
      >
        {/* BG gradient */}
        <div className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-400"
          style={{ background: `linear-gradient(135deg, ${color}0d, transparent 55%)` }} />

        {/* Hover border glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 30px ${color}08` }} />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

        {/* Corners — main 2 + faint 2 */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 z-10 transition-all duration-300 group-hover:w-5 group-hover:h-5"
          style={{ borderColor: color }} />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 z-10 transition-all duration-300 group-hover:w-5 group-hover:h-5"
          style={{ borderColor: color }} />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r z-10 opacity-30" style={{ borderColor: color }} />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l z-10 opacity-30" style={{ borderColor: color }} />

        {/* Shine sweep */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-none group-hover:animate-shine" />

        {/* Index + live badge */}
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
          {project.live && (
            <span className="flex items-center gap-1 font-mono-accent text-[8px] uppercase tracking-wider"
              style={{ color: "hsl(142 72% 50%)" }}>
              <Radio className="h-2.5 w-2.5" />Live
            </span>
          )}
          <span className="font-mono-accent text-[10px]" style={{ color: color + "40" }}>
            {String(index + 1).padStart(3, "0")}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold tracking-tight leading-tight pr-16 mb-1"
            style={{ color, textShadow: isHovered ? `0 0 16px ${color}40` : "none" }}>
            {project.title}
          </h3>
          {"role" in project && (
            <p className="font-mono-accent text-[9px] uppercase tracking-widest mb-3" style={{ color: color + "70" }}>
              {(project as { role?: string }).role}
            </p>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground flex-1 mb-4 group-hover:text-muted-foreground/90 transition-colors duration-200">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <CyberBadge key={tag} label={tag} variant="primary" />
            ))}
            {project.tags.length > 4 && (
              <CyberBadge label={`+${project.tags.length - 4}`} variant="muted" />
            )}
          </div>

          <div className="flex items-center gap-2 mt-auto">
            {project.link && (
              <Button variant="outline" size="sm" asChild
                className="border-primary/20 font-mono-accent text-[10px] tracking-widest uppercase hover:border-primary hover:bg-primary/10 transition-all duration-200"
                style={{ clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))" }}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1.5 h-3.5 w-3.5" /> Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button size="sm" asChild
                className="bg-gradient-neon font-mono-accent text-[10px] tracking-widest uppercase font-bold text-black hover:opacity-90 shadow-neon-primary transition-all duration-200"
                style={{ clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))" }}
              >
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Store
                </a>
              </Button>
            )}
            <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
              style={{ color }} />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
