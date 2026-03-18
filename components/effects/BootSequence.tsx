// components/effects/BootSequence.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const BOOT_LINES = [
  { text: "BIOS v2026.03.18 ................................. [  OK  ]", delay: 0 },
  { text: "Loading kernel modules ........................... [  OK  ]", delay: 160 },
  { text: "Initializing neural interface .................... [  OK  ]", delay: 320 },
  { text: "Mounting /portfolio/v3 ........................... [  OK  ]", delay: 480 },
  { text: "Connecting ThoughtWorks network .................. [  OK  ]", delay: 640 },
  { text: "Loading iOS/SwiftUI frameworks ................... [  OK  ]", delay: 800 },
  { text: "Calibrating mobile architecture modules .......... [  OK  ]", delay: 960 },
  { text: "Injecting personality subroutines ................ [  OK  ]", delay: 1100 },
  { text: "All systems nominal.", delay: 1260 },
  { text: "▶ WELCOME, VISITOR.", delay: 1500 },
];

function MatrixBoot({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const CHARS = "01アイウエオ∆∇⌘".split("");
    const COL_W = 18;
    const cols = Array.from({ length: Math.floor(canvas.width / COL_W) }, () => 0);
    let raf = 0;
    let frame = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      if (frame % 2 !== 0) return;
      ctx.fillStyle = "rgba(5,8,15,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `10px "JetBrains Mono",monospace`;
      cols.forEach((y, i) => {
        const c = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = `rgba(0,255,255,${Math.random() * 0.3 + 0.05})`;
        ctx.fillText(c, i * COL_W, y * 13);
        cols[i] = y > canvas.height / 13 + Math.random() * 50 ? 0 : y + 1;
      });
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [canvasRef]);
  return null;
}

export default function BootSequence() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [lines, setLines]     = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]     = useState<"boot"|"flash"|"done">("boot");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) { setVisible(false); return; }
    if (sessionStorage.getItem("booted")) { setVisible(false); return; }
    sessionStorage.setItem("booted", "1");

    BOOT_LINES.forEach(({ text, delay }, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setPhase("flash"), 400);
          setTimeout(() => setPhase("done"), 700);
          setTimeout(() => setVisible(false), 1100);
        }
      }, delay + 200);
    });
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={phase === "done" ? { opacity: 0, scale: 1.04, filter: "blur(12px)" } : { opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background overflow-hidden"
          style={{ background: phase === "flash" ? "hsl(186 100% 50% / 0.08)" : undefined }}
        >
          {/* Matrix canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />
          <MatrixBoot canvasRef={canvasRef} />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,255,0.018) 3px,rgba(0,255,255,0.018) 4px)" }}
          />

          {/* Moving scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg,transparent,hsl(186 100% 50%/0.5) 50%,transparent)", boxShadow: "0 0 10px hsl(186 100% 50%/0.4)" }}
            animate={{ top: ["0%","100%"] }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
          />

          {/* Corner brackets */}
          {[["top-6 left-6","border-t-2 border-l-2"],["top-6 right-6","border-t-2 border-r-2"],
            ["bottom-6 left-6","border-b-2 border-l-2"],["bottom-6 right-6","border-b-2 border-r-2"]].map(([p,b],i) => (
            <div key={i} className={`absolute ${p} w-10 h-10 ${b} border-primary/50`} />
          ))}

          <div className="relative w-full max-w-2xl px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <p className="font-mono-accent text-[10px] tracking-[0.6em] text-primary/40 uppercase mb-3">
                ██ INITIALIZE SEQUENCE ██
              </p>
              <div className="relative inline-block">
                <h1
                  className="font-mono text-5xl font-black tracking-widest text-primary sm:text-6xl"
                  style={{ textShadow: "0 0 30px hsl(186 100% 50%/0.7), 0 0 80px hsl(186 100% 50%/0.3)" }}
                >
                  RAJAT.SYS
                </h1>
                {/* Glitch lines */}
                <span
                  className="absolute inset-0 font-mono text-5xl font-black tracking-widest sm:text-6xl"
                  style={{
                    color: "hsl(275 100% 60%)",
                    clipPath: "inset(45% 0 45% 0)",
                    transform: "translateX(2px)",
                    opacity: 0.5,
                    textShadow: "none",
                  }}
                  aria-hidden="true"
                >
                  RAJAT.SYS
                </span>
              </div>
              <p className="font-mono-accent text-[11px] tracking-[0.3em] text-primary/30 uppercase mt-2">
                Portfolio v3.0 · 2026
              </p>
            </motion.div>

            {/* Boot lines terminal */}
            <div className="mb-6 h-48 overflow-hidden font-mono-accent text-[11px] space-y-1.5 border border-primary/10 p-4 bg-primary/3">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/10">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-primary/40 text-[9px] tracking-widest uppercase">Terminal — boot sequence</span>
              </div>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-start gap-2 ${i === lines.length - 1 ? "text-primary" : i >= lines.length - 3 ? "text-primary/70" : "text-primary/45"}`}
                >
                  <span className="text-primary/30 mt-0.5">$</span>
                  <span className="flex-1">{line}</span>
                  {i === lines.length - 1 && progress < 100 && (
                    <span className="inline-block w-2 h-3 bg-primary animate-pulse ml-1" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="relative h-1.5 w-full bg-primary/8 overflow-hidden">
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60 -translate-y-px" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60 -translate-y-px" />
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
              {/* Glow head */}
              <div
                className="absolute top-0 h-full w-12 blur-sm"
                style={{ left: `${Math.max(0, progress - 8)}%`, background: "hsl(186 100% 50%/0.6)", transition: "left 0.12s linear" }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono-accent text-[9px] text-primary/40 tracking-widest">
              <span>LOADING PORTFOLIO</span>
              <span className="text-primary/70">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
