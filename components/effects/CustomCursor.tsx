// components/effects/CustomCursor.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TRAIL_COUNT = 8;

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const pos    = useRef({ x: -200, y: -200 });
  const ring   = useRef({ x: -200, y: -200 });
  const trails = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 })));
  const raf    = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;

    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHover(!!(t.closest("a,button,[role='button'],input,textarea,select,[tabindex]")));
    };
    const down = () => { setIsClick(true); setTimeout(() => setIsClick(false), 200); };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      raf.current = requestAnimationFrame(tick);

      // Dot — snap
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px) scale(${isClick ? 0.5 : 1})`;
      }

      // Ring — lerp
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.15);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.15);
      if (ringRef.current) {
        const size = isHover ? 46 : 26;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px,${ring.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = isHover ? "hsl(275 100% 60%)" : "hsl(186 100% 50% / 0.6)";
        ringRef.current.style.boxShadow = isHover
          ? "0 0 14px hsl(275 100% 60%/0.5),inset 0 0 8px hsl(275 100% 60%/0.1)"
          : "0 0 8px hsl(186 100% 50%/0.3)";
      }

      // Trail — staggered lerp
      trails.current.forEach((t, i) => {
        const prev = i === 0 ? ring.current : trails.current[i - 1];
        t.x = lerp(t.x, prev.x, 0.25 - i * 0.02);
        t.y = lerp(t.y, prev.y, 0.25 - i * 0.02);
        const el = trailRefs.current[i];
        if (el) {
          const size = Math.max(2, 6 - i * 0.6);
          const opacity = (1 - i / TRAIL_COUNT) * 0.25;
          el.style.transform = `translate(${t.x - size / 2}px,${t.y - size / 2}px)`;
          el.style.width  = `${size}px`;
          el.style.height = `${size}px`;
          el.style.opacity = `${opacity}`;
        }
      });
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, isHover, isClick]);

  if (reduced) return null;

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position: "fixed", top: 0, left: 0, zIndex: 99996,
            pointerEvents: "none", borderRadius: "50%",
            background: "hsl(186 100% 50%)",
            transition: "opacity 0.1s",
          }}
        />
      ))}

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 99997, pointerEvents: "none",
          borderRadius: "50%", border: "1.5px solid hsl(186 100% 50% / 0.6)",
          transition: "width 0.18s ease, height 0.18s ease, border-color 0.2s, box-shadow 0.2s",
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 99998, pointerEvents: "none",
          width: 8, height: 8, borderRadius: "50%",
          background: "hsl(186 100% 50%)",
          boxShadow: "0 0 8px hsl(186 100% 50%), 0 0 20px hsl(186 100% 50%/0.6)",
          transition: "transform 0.06s ease",
        }}
      />

      {/* Click burst — crosshair lines on click */}
      {isClick && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: pos.current.y - 12,
            left: pos.current.x - 12,
            width: 24, height: 24,
            zIndex: 99999, pointerEvents: "none",
            border: "1px solid hsl(186 100% 50%)",
            borderRadius: "50%",
            animation: "none",
            opacity: 0.8,
            transform: "scale(2)",
            transition: "transform 0.2s, opacity 0.2s",
          }}
        />
      )}
    </>
  );
}
