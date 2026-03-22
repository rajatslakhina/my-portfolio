"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Post } from "@/lib/posts";

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <>
      {/* Search bar */}
      <div className="mb-8 relative">
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
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono-accent text-[9px] text-muted-foreground/40">
            {filtered.length} results
          </span>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-mono-accent text-[10px] uppercase tracking-widest text-muted-foreground/40">No articles found for &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(post => (
            <Link
              key={`${post.category}-${post.slug}`}
              href={`/blog/${post.category}/${post.slug}`}
              className="glass-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <p className="mb-2 font-mono-accent text-[10px] uppercase tracking-widest text-primary/60">
                {post.category}
              </p>
              <h2 className="mb-3 text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                {post.date && (
                  <span className="font-mono-accent text-[10px] text-muted-foreground">{post.date}</span>
                )}
                <span className="font-mono-accent text-[10px] text-primary/60 ml-auto">{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
