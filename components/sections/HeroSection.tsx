"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import SocialLinks from "../shared/SocialLinks";
import { Typewriter } from "@/components/ui/typewriter";
import { Download, Eye, Send, ChevronDown, CalendarDays, Users, Package } from "lucide-react";
import { RESUME_URL } from "@/constants";
import { useEffect, useRef } from "react";

const ROLES = [
  "Mobile Platform Leader",
  "Team Builder",
  "Technical Strategist",
  "AI-First Engineering Advocate",
];

const STATS = [
  { icon: CalendarDays, label: "YEARS",    value: "10+", color: "primary"   },
  { icon: Users,        label: "MENTORED", value: "50+", color: "secondary" },
  { icon: Package,      label: "SHIPPED",  value: "10+", color: "accent"    },
];

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const clipIn = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
  show:   { clipPath: "inset(0 0% 0 0)",   opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Animated monogram fallback ── */
function AnimatedMonogram() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Hex grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="hexgrid-avatar" x="0" y="0" width="26" height="30" patternUnits="userSpaceOnUse">
            <path d="M13 0L26 7.5L26 22.5L13 30L0 22.5L0 7.5Z" fill="none" stroke="hsl(186,100%,50%)" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="300" height="300" fill="url(#hexgrid-avatar)"/>
      </svg>

      {/* Radial glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 45%, hsl(186 100% 50% / 0.14) 0%, hsl(275 100% 60% / 0.06) 50%, transparent 70%)" }} />

      {/* Outer dashed rotating ring */}
      <div className="absolute inset-[8%] rounded-full border border-dashed border-primary/25 animate-spin-slow" />
      {/* Inner counter-rotating ring */}
      <div className="absolute inset-[18%] rounded-full border border-dashed border-secondary/20 animate-spin-reverse" />
      {/* Static inner accent ring */}
      <div className="absolute inset-[28%] rounded-full border border-accent/10" />

      {/* Cross-hair lines */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-px bg-primary/8" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-primary/8" />

      {/* Orbiting particle — outer ring, clockwise */}
      <div className="absolute inset-[8%] rounded-full animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1 rounded-full bg-primary"
          style={{ boxShadow: "0 0 10px hsl(186 100% 50%), 0 0 20px hsl(186 100% 50% / 0.5)" }} />
      </div>
      {/* Orbiting particle — inner ring, counter-clockwise */}
      <div className="absolute inset-[18%] rounded-full animate-spin-reverse">
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 -translate-x-1/2 translate-y-1 rounded-full bg-secondary"
          style={{ boxShadow: "0 0 8px hsl(275 100% 60%)" }} />
      </div>
      {/* Third particle at 90° offset */}
      <div className="absolute inset-[8%] rounded-full animate-spin-slow" style={{ animationDelay: "-8s" }}>
        <div className="absolute right-0 top-1/2 w-1.5 h-1.5 translate-x-1 -translate-y-1/2 rounded-full bg-accent/70"
          style={{ boxShadow: "0 0 6px hsl(335 100% 55%)" }} />
      </div>

      {/* HUD corner brackets inside circle */}
      <span className="absolute top-[17%] left-[17%] w-3 h-3 border-t border-l border-primary/50" />
      <span className="absolute top-[17%] right-[17%] w-3 h-3 border-t border-r border-primary/50" />
      <span className="absolute bottom-[17%] left-[17%] w-3 h-3 border-b border-l border-primary/50" />
      <span className="absolute bottom-[17%] right-[17%] w-3 h-3 border-b border-r border-primary/50" />

      {/* Side data tags */}
      <div className="absolute left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-1.5" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
        <span className="font-mono text-[7px] tracking-widest text-primary/30 uppercase select-none">10+ YRS</span>
      </div>
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-1.5" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
        <span className="font-mono text-[7px] tracking-widest text-secondary/30 uppercase select-none">iOS LEAD</span>
      </div>

      {/* Central monogram */}
      <div className="relative z-10 flex flex-col items-center select-none" style={{ gap: "0.35rem" }}>
        <span
          className="font-serif italic font-black leading-none"
          style={{
            fontSize: "clamp(3.2rem, 14vw, 5.5rem)",
            background: "linear-gradient(135deg, hsl(186 100% 50%), hsl(275 100% 60%), hsl(335 100% 55%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 18px hsl(186 100% 50% / 0.75)) drop-shadow(0 0 40px hsl(275 100% 60% / 0.4))",
          }}
        >
          RL
        </span>
        <span className="font-mono text-[8px] tracking-[0.38em] text-primary/45 uppercase">
          Rajat Lakhina
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[7px] tracking-[0.22em] text-primary/32 uppercase">iOS · Active</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.75s" }} />
        </div>
        {/* XP bar */}
        <div className="mt-1 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-0.5 w-4 bg-primary/60" style={{ opacity: 0.4 + i * 0.15 }} />
          ))}
        </div>
      </div>

      {/* Scan line sweep */}
      <div
        className="absolute inset-x-0 h-10 pointer-events-none animate-scan-line"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(186 100% 50% / 0.12) 50%, transparent)" }}
      />
      <div
        className="absolute inset-x-0 h-px pointer-events-none animate-scan-line opacity-35"
        style={{ background: "hsl(186 100% 50%)" }}
      />
    </div>
  )
}

/* ── 3D Tilt avatar ── */
function AvatarTilt({ reduced }: { reduced: boolean | null }) {
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX  = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]),  { stiffness: 120, damping: 20 });
  const rotY  = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]),  { stiffness: 120, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width  - 0.5);
    my.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ perspective: 900, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <motion.div
        style={{ rotateX: reduced ? 0 : rotX, rotateY: reduced ? 0 : rotY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Outer slow orbit */}
        {!reduced && (
          <div className="absolute inset-[-28px] rounded-full border border-primary/15 animate-spin-slow"
            style={{ borderStyle: "dashed" }} />
        )}
        {/* Inner counter orbit */}
        {!reduced && (
          <div className="absolute inset-[-14px] rounded-full border border-secondary/12 animate-spin-reverse"
            style={{ borderStyle: "dashed" }} />
        )}
        {/* Glow blobs */}
        {!reduced && (
          <>
            <div className="absolute -inset-16 rounded-full bg-primary/10 blur-3xl animate-blob" />
            <div className="absolute -inset-16 rounded-full bg-secondary/8  blur-3xl animate-blob [animation-delay:3.5s]" />
          </>
        )}

        {/* HUD frame corners */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <span className="absolute -top-4 -left-4  w-8 h-8 border-t-2 border-l-2 border-primary z-20" />
          <span className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary z-20" />
          <span className="absolute -bottom-4 -left-4  w-8 h-8 border-b-2 border-l-2 border-primary z-20" />
          <span className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary z-20" />
          {/* Target cross-hair */}
          <span className="absolute top-1/2 inset-x-0 h-px bg-primary/10 z-20 pointer-events-none" />
          <span className="absolute left-1/2 inset-y-0 w-px bg-primary/10 z-20 pointer-events-none" />

          {/* Gradient ring → photo */}
          <div className="relative h-60 w-60 sm:h-72 sm:w-72 lg:h-[380px] lg:w-[380px]"
            style={{ background: "linear-gradient(135deg,hsl(186 100% 50%),hsl(275 100% 60%),hsl(335 100% 55%))", padding: "2px", borderRadius: "50%" }}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-card">
              {!imgError ? (
                <Image src="/rajat-profile.webp" alt="Rajat Lakhina" fill priority
                  sizes="(max-width:640px)240px,(max-width:768px)288px,380px"
                  className="object-cover"
                  onError={() => setImgError(true)} />
              ) : (
                <AnimatedMonogram />
              )}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)" }} />
            </div>
          </div>
        </div>

        {/* Floating stats */}
        {!reduced && (
          <>
            <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-1/4 lg:-left-28 border border-primary/40 bg-background/95 px-3 py-2.5 backdrop-blur-md z-30"
              style={{ clipPath:"polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))", boxShadow:"0 0 24px hsl(186 100% 50%/0.3),0 8px 32px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <p className="font-mono-accent text-[8px] text-primary/60 tracking-widest uppercase">Tenure</p>
              </div>
              <p className="font-mono-accent text-2xl font-black text-primary" style={{ textShadow:"0 0 14px hsl(186 100% 50%/0.7)" }}>10+</p>
              <p className="font-mono-accent text-[9px] text-muted-foreground">Years Leading</p>
            </motion.div>

            <motion.div animate={{ y: [0,10,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -right-6 bottom-1/4 lg:-right-28 border border-secondary/40 bg-background/95 px-3 py-2.5 backdrop-blur-md z-30"
              style={{ clipPath:"polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))", boxShadow:"0 0 24px hsl(275 100% 60%/0.3),0 8px 32px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                <p className="font-mono-accent text-[8px] text-secondary/60 tracking-widest uppercase">Team</p>
              </div>
              <p className="font-mono-accent text-2xl font-black text-secondary" style={{ textShadow:"0 0 14px hsl(275 100% 60%/0.7)" }}>50+</p>
              <p className="font-mono-accent text-[9px] text-muted-foreground">Engineers Mentored</p>
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Parallax wrapper ── */
function Parallax({ depth, children, className }: { depth: number; children: React.ReactNode; className?: string }) {
  const elRef  = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const move = (e: MouseEvent) => {
      if (!elRef.current) return;
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const x  = ((e.clientX - cx) / cx) * depth * 20;
      const y  = ((e.clientY - cy) / cy) * depth * 14;
      elRef.current.style.transform = `translate(${x}px,${y}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [depth, reduced]);

  return (
    <div ref={elRef} className={className} style={{ transition: "transform 0.15s ease-out", willChange: "transform" }}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center py-16 overflow-hidden">

      {/* Deep parallax bg rings */}
      {!reduced && (
        <>
          <Parallax depth={0.12} className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/6 animate-spin-slow" style={{ borderStyle:"dashed" }} />
          </Parallax>
          <Parallax depth={0.2} className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/5 animate-spin-reverse" style={{ borderStyle:"dashed" }} />
          </Parallax>
        </>
      )}

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

        {/* ── Text panel ── */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <div className="relative flex items-center gap-2 border border-primary/35 bg-primary/8 px-4 py-2 overflow-hidden">
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono-accent text-[10px] tracking-[0.28em] text-primary uppercase font-semibold">
                Available for Tech Lead / iOS
              </span>
            </div>
            {/* XP pips */}
            <div className="hidden sm:flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} className="h-1.5 w-5 bg-primary/15 overflow-hidden"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                >
                  <div className="h-full w-full bg-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Name — big clip reveal */}
          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            <motion.span variants={clipIn} className="block overflow-hidden">
              <span className="block text-foreground animate-flicker">Rajat</span>
            </motion.span>
            <motion.span variants={clipIn} className="block overflow-hidden">
              <span className="block font-serif italic text-gradient animate-neon-pulse">Lakhina</span>
            </motion.span>
          </motion.h1>

          {/* Static tagline — required for a11y + SEO */}
          <motion.p variants={item} className="mt-4 font-mono-accent text-sm tracking-[0.2em] text-primary/80 uppercase">
            Senior Consultant · iOS
          </motion.p>

          {/* Rule */}
          <motion.div variants={item} className="mt-3 flex items-center gap-3 w-full max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
            <span className="font-mono-accent text-[9px] text-primary/40 tracking-widest">ID:RL-2026</span>
            <div className="h-px w-8 bg-primary/20" />
          </motion.div>

          {/* Role typewriter */}
          <motion.div variants={item} className="mt-4 flex items-center gap-2">
            <span className="text-primary font-mono-accent text-sm">▶</span>
            <span className="font-mono-accent text-sm font-medium text-muted-foreground sm:text-base">
              {reduced ? ROLES[0] : <Typewriter texts={ROLES} speed={50} deleteSpeed={28} pause={2400} />}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-primary" style={{ textShadow: "0 0 12px hsl(186 100% 50%/0.5)" }}>
              10+ years
            </span>{" "}
            building and scaling high-performance iOS platforms at{" "}
            <span className="font-semibold text-secondary">ThoughtWorks</span>.
            iOS architect, AI-First development advocate, and hands-on tech leader.
            Open to Tech Lead and Senior iOS roles at product-led companies.
          </motion.p>

          {/* Stat chips */}
          <motion.div variants={item} className="mt-6 flex gap-2.5 flex-wrap">
            {STATS.map(({ icon: Icon, label, value, color }) => (
              <div key={label}
                className={`relative flex items-center gap-2 border border-${color}/30 bg-${color}/8 px-3 py-2 transition-all duration-200 hover:border-${color}/55 hover:bg-${color}/14`}
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
              >
                <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-${color}`} />
                <Icon className={`h-3.5 w-3.5 text-${color}`} />
                <div>
                  <p className={`font-mono-accent text-[8px] text-${color}/50 tracking-widest uppercase leading-none`}>{label}</p>
                  <p className={`font-mono-accent text-sm font-black text-${color} leading-tight`}>{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg"
              className="group relative overflow-hidden border-0 bg-gradient-neon font-mono-accent font-bold text-black text-xs tracking-widest uppercase shadow-neon-primary transition-all duration-300 hover:scale-[1.05] hover:shadow-neon-secondary"
              style={{ clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
            >
              <a href={RESUME_URL} download>
                <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/25 transition-none group-hover:animate-shine" />
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="lg"
              className="relative border-primary/35 font-mono-accent text-xs tracking-widest uppercase text-foreground backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:shadow-neon-primary transition-all duration-300 overflow-hidden group"
              style={{ clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
            >
              <Link href="/#projects">
                <Eye className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg"
              className="font-mono-accent text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              <Link href="/contact">
                <Send className="mr-2 h-4 w-4" />
                Contact
              </Link>
            </Button>
          </motion.div>

          <motion.div className="mt-7" variants={item}>
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* ── Avatar panel ── */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Parallax depth={0.5}>
            <AvatarTilt reduced={reduced} />
          </Parallax>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
          <span className="font-mono-accent text-[9px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-scroll-bounce text-primary" />
          <ChevronDown className="h-3.5 w-3.5 animate-scroll-bounce text-primary/30" style={{ animationDelay: "0.18s" }} />
        </div>
      )}
    </section>
  );
}
