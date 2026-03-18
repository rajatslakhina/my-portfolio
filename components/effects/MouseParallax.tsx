// components/effects/MouseParallax.tsx
"use client";
import { useEffect, useRef, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface Layer {
  depth: number;    // 0-1, how much this layer moves (0 = none, 1 = most)
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

interface MouseParallaxProps {
  layers: Layer[];
  className?: string;
}

export function MouseParallaxLayer({
  depth = 0.5,
  className = "",
  style = {},
  children,
}: Layer) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;

    const move = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.current = {
        x: ((e.clientX - cx) / cx) * depth * 22,
        y: ((e.clientY - cy) / cy) * depth * 16,
      };
    };

    window.addEventListener("mousemove", move, { passive: true });

    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;
      if (ref.current) {
        ref.current.style.transform = `translate(${current.current.x}px,${current.current.y}px)`;
      }
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, [reduced, depth]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export default MouseParallaxLayer;
