// components/effects/BackgroundEffects.tsx
"use client";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const mouseRef  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニ∆∇⌘⌥⌦⌫⎋".split("");
    const COL_W = 20;
    let cols: number[] = [];

    interface Orb { x:number; y:number; vx:number; vy:number; r:number; color:string; alpha:number }
    const COLORS = ["hsl(186,100%,50%)", "hsl(275,100%,60%)", "hsl(335,100%,50%)"];
    let orbs: Orb[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const count = Math.floor(W / COL_W);
      cols = Array.from({ length: count }, () => Math.random() * -(H / 14));
      orbs = Array.from({ length: 60 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.4 + 0.1,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let frame = 0;
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      frame++;

      ctx.fillStyle = "rgba(5,8,15,0.08)";
      ctx.fillRect(0, 0, W, H);

      if (frame % 3 === 0) {
        ctx.font = `11px "JetBrains Mono",monospace`;
        cols.forEach((y, i) => {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const alpha = Math.random() * 0.18 + 0.04;
          ctx.fillStyle = i % 3 === 0 ? `rgba(160,80,255,${alpha})` : `rgba(0,255,255,${alpha})`;
          ctx.fillText(char, i * COL_W, y * 14);
          if (Math.random() > 0.97) {
            ctx.fillStyle = `rgba(0,255,255,0.6)`;
            ctx.fillText(char, i * COL_W, y * 14);
          }
          cols[i] = y > H / 14 + Math.random() * 50 ? 0 : y + 1;
        });
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      orbs.forEach((o) => {
        const dx = o.x - mx;
        const dy = o.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.6;
          o.vx += (dx / dist) * force;
          o.vy += (dy / dist) * force;
        }
        o.vx *= 0.97;
        o.vy *= 0.97;
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < 0) o.x = W;
        if (o.x > W) o.x = 0;
        if (o.y < 0) o.y = H;
        if (o.y > H) o.y = 0;

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = o.color.replace(")", `,${o.alpha})`).replace("hsl(", "hsla(");
        ctx.shadowBlur = o.r * 5;
        ctx.shadowColor = o.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (frame % 2 === 0) {
        for (let i = 0; i < orbs.length; i++) {
          for (let j = i + 1; j < orbs.length; j++) {
            const dx = orbs[i].x - orbs[j].x;
            const dy = orbs[i].y - orbs[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 90) {
              ctx.beginPath();
              ctx.moveTo(orbs[i].x, orbs[i].y);
              ctx.lineTo(orbs[j].x, orbs[j].y);
              ctx.strokeStyle = `rgba(0,255,255,${(1 - d / 90) * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}

export default function BackgroundEffects() {
  const reduced        = useReducedMotion();
  const { theme }      = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Before mount, use dark defaults to avoid flash
  const isDark = !mounted || theme !== "light";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* Canvas matrix rain — dark mode only */}
      {isDark && !reduced && <InteractiveCanvas />}

      {/* Line grid — always */}
      <div className="absolute inset-0 bg-grid opacity-25" />

      {/* Radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_40%_at_50%_-5%,hsl(186_100%_50%/0.10),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_100%_110%,hsl(275_100%_60%/0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_0%_65%,hsl(335_100%_50%/0.05),transparent)]" />

      {/* Deep vignette — dark mode only */}
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_50%,hsl(222_47%_2%/0.9)_100%)]" />
      )}

      {/* Scanlines — dark mode only */}
      {isDark && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,255,0.012) 3px,rgba(0,255,255,0.012) 4px)" }}
        />
      )}

      {/* Moving scan line — dark mode only */}
      {isDark && !reduced && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg,transparent,hsl(186 100% 50%/0.3) 30%,hsl(186 100% 50%/0.5) 50%,hsl(186 100% 50%/0.3) 70%,transparent)",
            boxShadow: "0 0 8px hsl(186 100% 50%/0.25)",
            animation: "scan-line 5s linear infinite",
          }}
        />
      )}

      {/* Ambient blobs */}
      {!reduced && (
        <>
          <div
            className="absolute -left-56 top-1/4 h-[700px] w-[700px] rounded-full blur-[180px] animate-blob"
            style={{
              background: isDark ? "hsl(186 100% 50% / 0.04)" : "hsl(186 75% 28% / 0.07)",
              animationDelay: "0s",
            }}
          />
          <div
            className="absolute -right-56 top-1/3 h-[600px] w-[600px] rounded-full blur-[160px] animate-blob"
            style={{
              background: isDark ? "hsl(275 100% 60% / 0.04)" : "hsl(275 65% 38% / 0.07)",
              animationDelay: "3s",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[160px] animate-blob"
            style={{
              background: isDark ? "hsl(335 100% 50% / 0.03)" : "hsl(335 70% 40% / 0.06)",
              animationDelay: "5s",
            }}
          />
        </>
      )}

      {/* Corner HUD brackets */}
      {["top-5 left-5 border-t-2 border-l-2","top-5 right-5 border-t-2 border-r-2",
        "bottom-5 left-5 border-b-2 border-l-2","bottom-5 right-5 border-b-2 border-r-2"].map((c, i) => (
        <div key={i} className={`absolute ${c} border-primary/20 w-7 h-7`} />
      ))}
    </div>
  );
}
