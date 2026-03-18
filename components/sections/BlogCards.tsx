"use client";
import Link from "next/link";
import { CyberBadge } from "@/components/ui/cyber-badge";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface BlogPost {
  slug: string; title: string; description: string; date: string;
  readingTime: number; tags: string[];
}
interface BlogCat {
  slug: string; label: string; emoji: string; color: string;
}

const GRAD = ["from-primary to-secondary", "from-secondary to-accent", "from-accent to-primary"];

export function BlogCards({ catPosts }: { catPosts: { cat: BlogCat; posts: BlogPost[] }[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-14">
      {catPosts.map(({ cat, posts }, ci) => {
        if (!posts.length) return null;
        return (
          <motion.div key={cat.slug}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1.5"
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                <span className="font-mono-accent text-[10px] text-primary uppercase tracking-widest">{cat.label}</span>
              </div>
              <div className={`h-px flex-1 bg-gradient-to-r ${GRAD[ci % GRAD.length]} opacity-25`} />
              <Link href={`/blog#${cat.slug}`}
                className="group flex items-center gap-1 font-mono-accent text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                All <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {posts.map((post, i) => (
                <motion.div key={post.slug}
                  initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.2 } }}
                >
                  <Link href={`/blog/${cat.slug}/${post.slug}`}
                    className="group relative flex flex-col overflow-hidden border border-white/[0.06] bg-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] h-full"
                    style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
                  >
                    {/* Top accent bar */}
                    <div className={`h-0.5 w-full bg-gradient-to-r ${GRAD[i % GRAD.length]}`} />

                    {/* Shine */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent transition-none group-hover:animate-shine" />

                    {/* Corner accents */}
                    <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary/0 group-hover:border-primary/50 transition-colors duration-300" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-300" />

                    {/* Index */}
                    <span className="absolute top-3 right-3 font-mono-accent text-[9px] text-primary/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2.5 flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <CyberBadge key={tag} label={tag} variant="primary" />
                        ))}
                      </div>
                      <h4 className="mb-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="flex items-center gap-1 font-mono-accent text-[10px] text-muted-foreground">
                          <Calendar className="h-2.5 w-2.5" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 font-mono-accent text-[10px] text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" />{post.readingTime}m
                          </span>
                          <ArrowRight className="h-3 w-3 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
