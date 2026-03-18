"use client";
import { EDUCATION } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EDU_COLORS = [
  "hsl(186 100% 50%)",
  "hsl(275 100% 60%)",
  "hsl(335 100% 55%)",
];

export default function EducationSection() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="education">
      {/* Header */}
      <motion.div className="mb-14 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <GraduationCap className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">05 / education.log</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Academic <span className="text-gradient font-serif italic">Journey</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Glow line */}
        <motion.div
          className="absolute left-6 top-0 bottom-0 w-px lg:left-1/2"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(186 100% 50% / 0.4) 20%, hsl(275 100% 60% / 0.4) 80%, transparent)" }}
          initial={reduced ? false : { scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="space-y-0">
          {EDUCATION.map((edu, idx) => {
            const color = EDU_COLORS[idx % EDU_COLORS.length];
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={edu.institution}
                className="relative pl-16 pb-12 lg:pl-0 lg:pb-16"
                initial={reduced ? false : { opacity: 0, x: isEven ? 40 : -40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-4 -translate-x-1/2 lg:left-1/2 z-10">
                  <motion.div
                    initial={reduced ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    {idx === 0 && (
                      <span className="absolute -inset-2 rounded-full animate-ping"
                        style={{ background: color, opacity: 0.15 }} />
                    )}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: color,
                        background: `radial-gradient(circle, ${color}25, hsl(222 47% 2%))`,
                        boxShadow: `0 0 16px ${color}60`,
                      }}
                    >
                      <GraduationCap className="h-4 w-4" style={{ color }} />
                    </div>
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`lg:w-[calc(50%-3rem)] ${isEven ? "lg:ml-auto lg:pl-10" : "lg:mr-auto lg:pr-10"}`}>
                  <div className="group relative border bg-card/70 backdrop-blur-xl overflow-hidden transition-all duration-300 cursor-default"
                    style={{
                      borderColor: color + "25",
                      clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
                    }}
                  >
                    {/* Gradient bg */}
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }} />

                    {/* Shine sweep */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-none group-hover:animate-shine" />

                    {/* Corner accents */}
                    <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 z-10 transition-colors duration-300"
                      style={{ borderColor: color + "60" }} />
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 z-10 transition-colors duration-300"
                      style={{ borderColor: color + "60" }} />

                    {/* Index badge */}
                    <span className="absolute top-3 right-4 font-mono-accent text-[9px] tracking-widest"
                      style={{ color: color + "50" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 p-5 sm:p-6">
                      {/* Degree */}
                      <h3 className="text-lg font-black tracking-tight mb-1"
                        style={{ color, textShadow: `0 0 16px ${color}40` }}>
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-sm font-medium text-foreground/85 mb-3 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 shrink-0" style={{ color: color + "80" }} />
                        {edu.institution}
                      </p>

                      {/* Duration chip */}
                      <span className="inline-flex items-center gap-1.5 font-mono-accent text-[10px] border px-2.5 py-1 mb-4"
                        style={{
                          borderColor: color + "40",
                          color: color,
                          background: color + "12",
                          clipPath: "polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))",
                        }}
                      >
                        <Calendar className="h-3 w-3" />{edu.duration}
                      </span>

                      {/* Details */}
                      <p className="text-xs leading-relaxed text-muted-foreground border-l-2 pl-3"
                        style={{ borderColor: color + "40" }}>
                        {edu.details}
                      </p>
                    </div>

                    {/* Bottom neon bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline end */}
        <div className="absolute left-6 bottom-0 -translate-x-1/2 lg:left-1/2">
          <div className="w-3 h-3 rounded-full border border-primary/40 bg-background flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-primary/60" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
