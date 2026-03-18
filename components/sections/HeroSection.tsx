// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import MouseParallaxLayer from "@/components/effects/MouseParallax";
import SocialLinks from "../shared/SocialLinks";
import { Typewriter } from "@/components/ui/typewriter";
import { Download, Eye, Send, ChevronDown, Zap, Shield, Cpu, Star, Trophy } from "lucide-react";
import { RESUME_URL } from "@/constants";

const ROLES = [
  "Mobile Development Professional",
  "iOS Architecture Specialist",
  "SwiftUI Engineer",
  "Senior Consultant @ ThoughtWorks",
];

const itemVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { icon: Cpu,    label: "XP",     value: "10+Y",   color: "primary",   hex: "hsl(186 100% 50%)" },
  { icon: Zap,    label: "POWER",  value: "S-RANK", color: "accent",    hex: "hsl(335 100% 50%)" },
  { icon: Shield, label: "APPS",   value: "10+",    color: "secondary", hex: "hsl(275 100% 60%)" },
];

const HeroSection = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center py-16 overflow-hidden">

      {/* Parallax background rings */}
      {!reduced && (
        <>
          <MouseParallaxLayer depth={0.15} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5 animate-spin-slow" style={{ borderStyle: "dashed" }} />
          </MouseParallaxLayer>
          <MouseParallaxLayer depth={0.25} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <div className="absolute top-1/2 left-1/2 w-[580px] h-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/5 animate-spin-slow-reverse" style={{ borderStyle: "dashed" }} />
          </MouseParallaxLayer>
          <MouseParallaxLayer depth={0.08} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/3" />
          </MouseParallaxLayer>
        </>
      )}

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">

        {/* ── Left panel ── */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Player badge + EXP bar */}
          <motion.div variants={reduced ? undefined : itemVariant} className="mb-5 flex flex-wrap items-center gap-3">
            <div className="relative flex items-center gap-2 border border-primary/35 bg-primary/8 px-3.5 py-1.5 overflow-hidden"
              style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
            >
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono-accent text-[10px] tracking-[0.25em] text-primary uppercase">System Online</span>
            </div>
            {/* EXP bar */}
            <div className="hidden sm:flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} className="h-1.5 overflow-hidden bg-primary/12"
                  style={{ width: i === 4 ? 14 : 8, clipPath: "polygon(0 0,calc(100% - 3px) 0,100% 3px,100% 100%,3px 100%,0 calc(100% - 3px))" }}
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: i < 4 ? 1 : 0.6 }}
                  transition={{ duration: 0.35, delay: 0.8 + i * 0.12, ease: "easeOut" }}
                >
                  <div className="h-full bg-primary" />
                </motion.div>
              ))}
              <span className="ml-1 font-mono-accent text-[8px] text-primary/50 tracking-widest">LVL 10</span>
            </div>
            {/* Available badge */}
            <div className="flex items-center gap-1.5 border border-accent/30 bg-accent/8 px-2.5 py-1"
              style={{ clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono-accent text-[9px] text-accent/90 uppercase tracking-widest">Available</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            <motion.span variants={reduced ? undefined : clipReveal} className="block overflow-hidden">
              <span className="block text-foreground">Rajat</span>
            </motion.span>
            <motion.span variants={reduced ? undefined : clipReveal} className="block overflow-hidden">
              <span className="block font-serif italic text-gradient"
                style={{ textShadow: "0 0 60px hsl(186 100% 50%/0.2), 0 0 120px hsl(275 100% 60%/0.1)" }}>
                Lakhina.
              </span>
            </motion.span>
          </motion.h1>

          {/* Divider */}
          <motion.div variants={reduced ? undefined : itemVariant} className="mt-3 flex items-center gap-3 w-full max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
            <span className="font-mono-accent text-[8px] text-primary/40 tracking-widest">PORTFOLIO v3.0 · 2026</span>
          </motion.div>

          {/* Role */}
          <motion.div variants={reduced ? undefined : itemVariant} className="mt-4 flex items-center gap-2">
            <span className="text-primary/60 font-mono-accent text-sm">▶</span>
            <span className="font-mono-accent text-sm font-medium text-muted-foreground sm:text-base">
              {reduced ? ROLES[0] : <Typewriter texts={ROLES} speed={50} deleteSpeed={28} pause={2400} />}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={reduced ? undefined : itemVariant}
            className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/25 pl-4">
            Nearly{" "}
            <span className="font-semibold text-primary" style={{ textShadow: "0 0 12px hsl(186 100% 50%/0.5)" }}>10 years</span>{" "}
            building enterprise-grade mobile products at{" "}
            <span className="font-semibold text-secondary">ThoughtWorks</span>.
            Specializing in iOS, SwiftUI &amp; mobile architecture for global clients.
          </motion.p>

          {/* Stat chips */}
          <motion.div variants={reduced ? undefined : itemVariant} className="mt-6 flex gap-2.5 flex-wrap">
            {STATS.map(({ icon: Icon, label, value, color, hex }) => (
              <div key={label}
                className={`group relative flex items-center gap-2 border border-${color}/25 bg-${color}/8 px-3 py-2 overflow-hidden transition-all duration-200 hover:border-${color}/50 hover:bg-${color}/15 cursor-default`}
                style={{ clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))" }}
              >
                <span className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-${color}/60`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${hex}15, transparent 70%)` }} />
                <Icon className={`relative h-3.5 w-3.5 text-${color}`} />
                <div className="relative">
                  <p className={`font-mono-accent text-[8px] text-${color}/50 tracking-widest uppercase leading-none`}>{label}</p>
                  <p className={`font-mono-accent text-sm font-black text-${color} leading-tight`}>{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={reduced ? undefined : itemVariant}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg"
              className="group relative overflow-hidden border-0 bg-gradient-neon font-mono-accent font-bold text-black text-xs tracking-widest uppercase shadow-neon-primary transition-all duration-300 hover:scale-[1.04] hover:shadow-neon-secondary"
              style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
            >
              <a href={RESUME_URL} download>
                <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/25 transition-none group-hover:animate-shine" />
                <Download className="mr-2 h-4 w-4 relative" />
                <span className="relative">Download CV</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg"
              className="relative border-primary/35 font-mono-accent text-xs tracking-widest uppercase text-foreground backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:shadow-neon-primary transition-all duration-300 overflow-hidden group"
              style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
            >
              <Link href="/projects">
                <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-white/5 transition-none group-hover:animate-shine" />
                <Eye className="mr-2 h-4 w-4 relative" />
                <span className="relative">Projects</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg"
              className="font-mono-accent text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200">
              <Link href="/contact">
                <Send className="mr-2 h-4 w-4" />Contact
              </Link>
            </Button>
          </motion.div>

          <motion.div className="mt-7" variants={reduced ? undefined : itemVariant}>
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* ── Right: 3D avatar ── */}
        <motion.div
          className="flex items-center justify-center"
          initial={reduced ? false : { opacity: 0, scale: 0.85, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <MouseParallaxLayer depth={0.6} className="relative">
            <TiltCard intensity={10}>
              {/* Orbit rings */}
              {!reduced && (
                <>
                  <div className="absolute inset-[-32px] rounded-full border border-primary/10 animate-spin-slow" style={{ borderStyle: "dashed" }} />
                  <div className="absolute inset-[-18px] rounded-full border border-secondary/8 animate-spin-slow-reverse" style={{ borderStyle: "dashed" }} />
                </>
              )}

              {/* Ambient glows */}
              {!reduced && (
                <>
                  <div className="absolute -inset-16 rounded-full bg-primary/8 blur-3xl animate-blob" />
                  <div className="absolute -inset-16 rounded-full bg-secondary/6 blur-3xl animate-blob [animation-delay:3.5s]" />
                  <div className="absolute -inset-16 rounded-full bg-accent/4 blur-3xl animate-blob [animation-delay:7s]" />
                </>
              )}

              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                {/* HUD corner brackets */}
                <span className="absolute -top-4 -left-4 w-7 h-7 border-t-2 border-l-2 border-primary z-20 transition-all duration-300" style={{ boxShadow: "-2px -2px 8px hsl(186 100% 50%/0.3)" }} />
                <span className="absolute -top-4 -right-4 w-7 h-7 border-t-2 border-r-2 border-primary z-20 transition-all duration-300" style={{ boxShadow: "2px -2px 8px hsl(186 100% 50%/0.3)" }} />
                <span className="absolute -bottom-4 -left-4 w-7 h-7 border-b-2 border-l-2 border-primary z-20" style={{ boxShadow: "-2px 2px 8px hsl(186 100% 50%/0.3)" }} />
                <span className="absolute -bottom-4 -right-4 w-7 h-7 border-b-2 border-r-2 border-primary z-20" style={{ boxShadow: "2px 2px 8px hsl(186 100% 50%/0.3)" }} />

                {/* Scan lines on photo */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-full overflow-hidden opacity-30">
                  <div className="absolute inset-x-0 h-0.5 bg-primary/60 animate-scan-line" style={{ top: "0%" }} />
                </div>

                {/* Photo */}
                <div className="relative h-60 w-60 sm:h-72 sm:w-72 lg:h-[380px] lg:w-[380px]"
                  style={{
                    background: "linear-gradient(135deg,hsl(186 100% 50%),hsl(275 100% 60%),hsl(335 100% 50%))",
                    padding: "2.5px", borderRadius: "50%",
                  }}
                >
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-card"
                    style={{ boxShadow: "inset 0 0 40px hsl(186 100% 50%/0.08)" }}>
                    <Image
                      src="/rajat-profile.webp" alt="Rajat Lakhina"
                      fill priority
                      sizes="(max-width:640px)240px,(max-width:768px)288px,380px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              {!reduced && (
                <>
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-4 top-1/4 lg:-left-32 border border-primary/45 bg-background/95 px-3.5 py-2.5 backdrop-blur-md"
                    style={{
                      clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
                      boxShadow: "0 0 28px hsl(186 100% 50%/0.3), 0 8px 32px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Star className="h-3 w-3 text-primary" fill="currentColor" />
                      <p className="font-mono-accent text-[8px] text-primary/60 tracking-widest uppercase">Level</p>
                    </div>
                    <p className="font-mono-accent text-2xl font-black text-primary" style={{ textShadow: "0 0 14px hsl(186 100% 50%/0.7)" }}>10+</p>
                    <p className="font-mono-accent text-[9px] text-muted-foreground">Years XP</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
                    className="absolute -right-4 bottom-1/4 lg:-right-32 border border-secondary/45 bg-background/95 px-3.5 py-2.5 backdrop-blur-md"
                    style={{
                      clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))",
                      boxShadow: "0 0 28px hsl(275 100% 60%/0.3), 0 8px 32px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Trophy className="h-3 w-3 text-secondary" />
                      <p className="font-mono-accent text-[8px] text-secondary/60 tracking-widest uppercase">Score</p>
                    </div>
                    <p className="font-mono-accent text-2xl font-black text-secondary" style={{ textShadow: "0 0 14px hsl(275 100% 60%/0.7)" }}>10+</p>
                    <p className="font-mono-accent text-[9px] text-muted-foreground">Apps Shipped</p>
                  </motion.div>
                </>
              )}
            </TiltCard>
          </MouseParallaxLayer>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!reduced && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="font-mono-accent text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60">Scroll</span>
          <div className="flex flex-col items-center gap-0.5">
            <ChevronDown className="h-4 w-4 animate-scroll-bounce text-primary" />
            <ChevronDown className="h-4 w-4 animate-scroll-bounce text-primary/30" style={{ animationDelay: "0.25s" }} />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
