"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";

const card = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -8, filter: "blur(3px)", transition: { duration: 0.2, ease: "easeIn" } },
};

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("all");

  // Derive unique categories from posts, preserving order of first appearance
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    for (const p of posts) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        cats.push(p.category);
      }
    }
    return cats;
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q),
      );
    }
    return result;
  }, [posts, query, category]);

  const hasFilters = category !== "all" || query.trim() !== "";

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="mb-8 flex flex-col gap-4">

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {/* All */}
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "relative font-mono-accent text-[10px] font-bold uppercase tracking-widest px-4 py-2",
              "border transition-all duration-200 overflow-hidden",
              category === "all"
                ? "border-transparent bg-gradient-neon text-black shadow-neon-primary"
                : "border-primary/20 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            style={{ clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))" }}
          >
            All
            <span className={cn(
              "ml-1.5 font-mono-accent text-[9px]",
              category === "all" ? "text-black/60" : "text-muted-foreground/50",
            )}>
              {posts.length}
            </span>
          </button>

          {categories.map(cat => {
            const count = posts.filter(p => p.category === cat).length;
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "relative font-mono-accent text-[10px] font-bold uppercase tracking-widest px-4 py-2",
                  "border transition-all duration-200 overflow-hidden",
                  isActive
                    ? "border-transparent bg-gradient-neon text-black shadow-neon-primary"
                    : "border-primary/20 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
                style={{ clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))" }}
              >
                {cat}
                <span className={cn(
                  "ml-1.5 font-mono-accent text-[9px]",
                  isActive ? "text-black/60" : "text-muted-foreground/50",
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + active filter summary */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full border border-primary/15 bg-card/40 backdrop-blur-sm pl-9 pr-4 py-2.5 font-mono-accent text-[11px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
              style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Result count / clear */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-accent text-[9px] text-muted-foreground/40">
              {filtered.length} / {posts.length}
            </span>
            {hasFilters && (
              <button
                onClick={() => { setQuery(""); setCategory("all"); }}
                className="font-mono-accent text-[9px] uppercase tracking-wider text-primary/60 hover:text-primary transition-colors border border-primary/15 px-2 py-1 hover:border-primary/35"
                style={{ clipPath: "polygon(0 0,calc(100% - 4px) 0,100% 4px,100% 100%,4px 100%,0 calc(100% - 4px))" }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="py-16 text-center"
          >
            <p className="font-mono-accent text-[10px] uppercase tracking-widest text-muted-foreground/40">
              No articles found
              {query && <> for &ldquo;{query}&rdquo;</>}
              {category !== "all" && <> in &ldquo;{category}&rdquo;</>}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`${category}-${query}`}
            variants={grid}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map(post => (
              <motion.div key={`${post.category}-${post.slug}`} variants={card}>
                <Link
                  href={`/blog/${post.category}/${post.slug}`}
                  className="glass-card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <p className="mb-2 font-mono-accent text-[10px] uppercase tracking-widest text-primary/60">
                    {post.category}
                  </p>
                  <h2 className="mb-3 flex-1 text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    {post.date && (
                      <span className="font-mono-accent text-[10px] text-muted-foreground">{post.date}</span>
                    )}
                    <span className="font-mono-accent text-[10px] text-primary/60 ml-auto">{post.readTime}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
