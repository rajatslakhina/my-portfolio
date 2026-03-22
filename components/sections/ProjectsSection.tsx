"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FolderOpen, ExternalLink, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

/* ── Types ── */
type Domain = "all" | "fintech" | "real-estate" | "social" | "messaging" | "fmcg";

interface Project {
  title: string;
  client: string;
  company: string;
  domain: Exclude<Domain, "all">;
  description: string;
  tags: string[];
  liveUrl?: string;
  caseStudySlug?: string;
  color: "primary" | "secondary" | "accent";
}

/* ── Domain meta ── */
const DOMAIN_META: Record<Domain, string> = {
  all:            "All",
  fintech:        "Fintech",
  "real-estate":  "Real Estate",
  social:         "Social",
  messaging:      "Messaging",
  fmcg:           "FMCG",
};

const FILTER_DOMAINS: Domain[] = ["all", "fintech", "real-estate", "social", "messaging", "fmcg"];

/* ── Real project data from resume ── */
const PROJECTS: Project[] = [
  {
    title: "REA Real Estate",
    client: "realestate.com.au",
    company: "ThoughtWorks",
    domain: "real-estate",
    description:
      "Led end-to-end SwiftUI architecture for Australia's #1 property platform. Built property discovery, interactive map clustering, and real-time listing updates — driving a 15% increase in user engagement.",
    tags: ["SwiftUI", "Maps", "CoreData", "Swift"],
    liveUrl: "https://apps.apple.com/au/app/realestate-com-au-property/id404667893",
    caseStudySlug: "rea-real-estate",
    color: "secondary",
  },
  {
    title: "TeleMessage",
    client: "TeleMessage Inc.",
    company: "ThoughtWorks",
    domain: "messaging",
    description:
      "Security App Expert on Signal-based enterprise messaging platform. Achieved 15% improvement in data protection through security automation and built an automated multi-repo code merge system.",
    tags: ["Swift", "Signal Protocol", "Security", "CI/CD"],
    liveUrl: "https://apps.apple.com/us/app/tm-tlgrm/id1630122033",
    color: "accent",
  },
  {
    title: "PepsiCo Super App",
    client: "PepsiCo",
    company: "ThoughtWorks",
    domain: "fmcg",
    description:
      "Solution Architect for PepsiCo's FMCG super app. Designed scalable modular frameworks covering multi-brand product catalogues, distributor workflows, and field sales operations.",
    tags: ["Swift", "Solution Architecture", "Modular", "FMCG"],
    color: "primary",
  },
  {
    title: "Khulke",
    client: "Khulke",
    company: "DTC Infotech",
    domain: "social",
    description:
      "Technical Lead for social networking platform with live streaming. Modularized Meeting and Live Streaming into independent frameworks. UIKit-to-SwiftUI migration delivered $500K business value with async/await concurrency.",
    tags: ["SwiftUI", "UIKit", "WebRTC", "async/await"],
    liveUrl: "https://apps.apple.com/in/app/khul-ke-social-networking-app/id1590836834",
    color: "secondary",
  },
  {
    title: "SC Next Gen Banking",
    client: "Standard Chartered",
    company: "Mobile Programming LLC",
    domain: "fintech",
    description:
      "Lead & Mentor on next-generation banking app for Singapore. Optimised profile, daily banking, and wealth modules — driving a 35% improvement in usability and task completion rates.",
    tags: ["Swift", "UIKit", "MVVM", "Banking"],
    liveUrl: "https://apps.apple.com/sg/app/sc-mobile-singapore/id367337298",
    caseStudySlug: "sc-next-gen-banking",
    color: "primary",
  },
  {
    title: "Airtel Payment Bank",
    client: "Airtel",
    company: "HCL Technologies",
    domain: "fintech",
    description:
      "Senior developer on Airtel's payments and banking super app. Delivered $500K in performance gains via SwiftUI migration. Architected Onboarding, IRCTC, Home, and Insurance modules with modern concurrency.",
    tags: ["SwiftUI", "Payments", "async/await", "UIKit"],
    liveUrl: "https://apps.apple.com/in/app/airtel-thanks-recharge-bank/id543184334",
    color: "primary",
  },
];

/* ── Color maps ── */
const COLOR_BORDER: Record<Project["color"], string> = {
  primary:   "border-primary/12",
  secondary: "border-secondary/12",
  accent:    "border-accent/12",
};
const COLOR_GRAD: Record<Project["color"], string> = {
  primary:   "from-primary/10 to-secondary/6",
  secondary: "from-secondary/10 to-primary/6",
  accent:    "from-accent/10 to-secondary/6",
};
const COLOR_BRACKET: Record<Project["color"], string> = {
  primary:   "border-primary",
  secondary: "border-secondary",
  accent:    "border-accent",
};
const COLOR_TAG: Record<Project["color"], string> = {
  primary:   "border-primary/20 bg-primary/8 text-primary/80",
  secondary: "border-secondary/20 bg-secondary/8 text-secondary/80",
  accent:    "border-accent/20 bg-accent/8 text-accent/80",
};
const COLOR_INDEX: Record<Project["color"], string> = {
  primary:   "text-primary/22",
  secondary: "text-secondary/22",
  accent:    "text-accent/22",
};
const COLOR_TITLE: Record<Project["color"], string> = {
  primary:   "group-hover:text-primary",
  secondary: "group-hover:text-secondary",
  accent:    "group-hover:text-accent",
};
const COLOR_BTN: Record<Project["color"], string> = {
  primary:   "text-primary border-primary/30 hover:bg-primary/10 hover:border-primary/60",
  secondary: "text-secondary border-secondary/30 hover:bg-secondary/10 hover:border-secondary/60",
  accent:    "text-accent border-accent/30 hover:bg-accent/10 hover:border-accent/60",
};
const COLOR_CLIENT: Record<Project["color"], string> = {
  primary:   "text-primary/55",
  secondary: "text-secondary/55",
  accent:    "text-accent/55",
};
const DOMAIN_PILL: Record<Exclude<Domain, "all">, string> = {
  fintech:        "border-primary/30 bg-primary/8 text-primary/75",
  "real-estate":  "border-secondary/30 bg-secondary/8 text-secondary/75",
  social:         "border-secondary/30 bg-secondary/8 text-secondary/75",
  messaging:      "border-accent/30 bg-accent/8 text-accent/75",
  fmcg:           "border-primary/30 bg-primary/8 text-primary/75",
};

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Project Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const indexStr = String(index + 1).padStart(3, "0");

  return (
    <div className="group h-full">
      <TiltCard
        intensity={7}
        className={cn(
          "relative h-full border bg-card/50 backdrop-blur-sm overflow-hidden",
          "transition-all duration-350 hover:shadow-card-hover",
          COLOR_BORDER[project.color],
        )}
        style={{ clipPath: "polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px))" }}
      >
        {/* Gradient bg */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none", COLOR_GRAD[project.color])} />
        {/* Shine sweep */}
        <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/[0.04] transition-none group-hover:animate-shine pointer-events-none z-10" />
        {/* HUD corner accents */}
        <span className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-40 transition-opacity duration-300 group-hover:opacity-100", COLOR_BRACKET[project.color])} />
        <span className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-0 transition-opacity duration-300 group-hover:opacity-70", COLOR_BRACKET[project.color])} />
        <span className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-0 transition-opacity duration-300 group-hover:opacity-70", COLOR_BRACKET[project.color])} />
        <span className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-40 transition-opacity duration-300 group-hover:opacity-100", COLOR_BRACKET[project.color])} />

        <div className="relative z-20 flex h-full flex-col p-6">
          {/* Index */}
          <span className={cn("absolute top-4 right-5 font-mono-accent text-[11px] font-black tracking-[0.2em]", COLOR_INDEX[project.color])}>
            {indexStr}
          </span>

          {/* Domain + company row */}
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            <span
              className={cn("border font-mono-accent text-[8px] uppercase tracking-widest px-2 py-0.5", DOMAIN_PILL[project.domain])}
              style={{ clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
            >
              {DOMAIN_META[project.domain]}
            </span>
            <span className="font-mono-accent text-[9px] text-muted-foreground/45 uppercase tracking-wider">
              {project.company}
            </span>
          </div>

          {/* Client name */}
          <p className={cn("mb-1 font-mono-accent text-[10px] uppercase tracking-widest", COLOR_CLIENT[project.color])}>
            {project.client}
          </p>

          {/* Title */}
          <h3 className={cn("mb-3 pr-8 font-mono-accent text-base font-bold leading-snug text-foreground transition-colors duration-300", COLOR_TITLE[project.color])}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-4 flex-1 text-[13px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={cn("border font-mono-accent text-[9px] uppercase tracking-widest px-2 py-0.5", COLOR_TAG[project.color])}
                style={{ clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* App Store link */}
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on App Store`}
              className={cn(
                "flex items-center gap-1.5 border font-mono-accent text-[10px] uppercase tracking-wider px-3 py-1.5 w-fit",
                "transition-all duration-200 hover:scale-[1.04]",
                COLOR_BTN[project.color],
              )}
              style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
            >
              <ExternalLink className="h-3 w-3" />
              App Store
            </Link>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse" />
              <span className="font-mono-accent text-[9px] text-muted-foreground/40 uppercase tracking-wider">Internal</span>
            </div>
          )}
        </div>
      </TiltCard>
    </div>
  );
}

/* ── Main section ── */
export default function ProjectsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Domain>("all");

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter(p => p.domain === active);

  return (
    <section id="projects" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-30" />

      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {/* Section label */}
        <motion.div variants={fadeUp} className="mb-10 flex items-center gap-3">
          <div
            className="flex items-center gap-2 border border-primary/25 bg-primary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <FolderOpen className="h-3 w-3 text-primary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-primary uppercase font-semibold">
              03 / projects.log
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Selected{" "}
          <span className="text-gradient">Work</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="mb-8 max-w-xl text-sm text-muted-foreground leading-relaxed">
          Live products shipped across fintech, real estate, social, and enterprise messaging.
        </motion.p>

        {/* Domain filter */}
        <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-2">
          {FILTER_DOMAINS.map((domain) => {
            const count = domain === "all"
              ? PROJECTS.length
              : PROJECTS.filter(p => p.domain === domain).length;
            const isActive = active === domain;
            return (
              <button
                key={domain}
                onClick={() => setActive(domain)}
                className={cn(
                  "relative flex items-center gap-2 px-3.5 py-1.5 font-mono-accent text-[10px] uppercase tracking-widest border overflow-hidden transition-all duration-200",
                  isActive
                    ? "border-primary/50 bg-primary/15 text-primary shadow-neon-primary"
                    : "border-primary/15 bg-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
              >
                {isActive && (
                  <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/10 animate-shine pointer-events-none" />
                )}
                {DOMAIN_META[domain]}
                <span
                  className={cn(
                    "font-mono-accent text-[8px] min-w-[16px] text-center leading-none px-1 py-0.5 transition-colors duration-200",
                    isActive ? "bg-primary/30 text-primary" : "bg-white/5 text-muted-foreground/60",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Animated project grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.22, delay: i * 0.05 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="group relative flex items-center gap-2.5 border border-primary/30 bg-primary/8 px-6 py-3 font-mono-accent text-xs uppercase tracking-widest text-primary transition-all duration-300 hover:border-primary hover:bg-primary/14 hover:shadow-neon-primary overflow-hidden"
            style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/10 transition-none group-hover:animate-shine pointer-events-none" />
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
            Work Together
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
