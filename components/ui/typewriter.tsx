// components/ui/typewriter.tsx
"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
}

export function Typewriter({ texts, speed = 60, deleteSpeed = 30, pause = 2000, className }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index % texts.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    } else {
      const next = isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1);
      timeout = setTimeout(() => setDisplayed(next), isDeleting ? deleteSpeed : speed);
    }
    return () => clearTimeout(timeout);
  }, [displayed, index, isDeleting, texts, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-[typewriter-cursor_0.8s_ease-in-out_infinite] bg-primary align-middle" />
    </span>
  );
}
