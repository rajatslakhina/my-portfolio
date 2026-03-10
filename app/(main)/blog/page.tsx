// app/(main)/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_CATEGORIES } from "@/constants";
import { getBlogPostsByCategory } from "@/lib/github-blog";
import { CyberBadge } from "@/components/ui/cyber-badge";
import { Calendar, Clock, ArrowRight, BookOpen, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles on AI, mobile development, iOS and software engineering.",
};

const COLOR_VARIANTS: Record<string, { bar: string; badge: string; label: string; glow: string }> = {
  primary:   { bar: "from-primary to-secondary",   badge: "primary",   label: "text-primary",   glow: "hover:shadow-[0_0_40px_hsl(var(--primary)/0.12)]"   },
  secondary: { bar: "from-secondary to-accent",    badge: "secondary", label: "text-secondary", glow: "hover:shadow-[0_0_40px_hsl(var(--secondary)/0.12)]" },
  accent:    { bar: "from-accent to-primary",      badge: "accent",    label: "text-accent",    glow: "hover:shadow-[0_0_40px_hsl(var(--accent)/0.12)]"    },
};

export default async function BlogPage() {
  const sections = await Promise.all(
    BLOG_CATEGORIES.map(async (cat) => ({
      cat,
      posts: await getBlogPostsByCategory(cat),
    }))
  );

  return (
    <section className="py-24 sm:py-32">
      {/* Header */}
      <div className="mb-20 flex flex-col items-center gap-2">
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {"{/* writing */}"}
        </span>
        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Knowledge{" "}
          <span className="text-gradient font-serif italic">Hub</span>
        </h1>
        <p className="mt-3 max-w-xl text-center text-muted-foreground">
          Curated articles across different domains — each section powered by a dedicated GitHub repo.
        </p>
      </div>

      {/* Category sections */}
      {sections.map(({ cat, posts }, catIdx) => {
        const v = COLOR_VARIANTS[cat.color] ?? COLOR_VARIANTS.primary;

        return (
          <div key={cat.slug} className={catIdx > 0 ? "mt-24" : ""}>
            {/* Section header */}
            <div className="mb-10 flex items-center gap-4">
              <span className="text-3xl">{cat.emoji}</span>
              <div>
                <h2 className={`text-2xl font-extrabold ${v.label}`}>{cat.label}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{cat.description}</p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <a
                  href={`https://github.com/${cat.owner}/${cat.repo}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono-accent text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <ExternalLink className="h-3 w-3" />
                  {cat.owner}/{cat.repo}
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className={`mb-8 h-px bg-gradient-to-r ${v.bar} opacity-30`} />

            {posts.length === 0 ? (
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border py-12 text-center justify-center text-muted-foreground">
                <BookOpen className="h-5 w-5 opacity-40" />
                <span className="text-sm">No posts found in this repo yet.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${cat.slug}/${post.slug}`}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 ${v.glow} hover:-translate-y-1`}
                  >
                    <div className={`h-1 w-full bg-gradient-to-r ${v.bar}`} />
                    <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-none group-hover:animate-shine" />

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <CyberBadge key={tag} label={tag} variant={v.badge as "primary" | "secondary" | "accent" | "muted"} />
                        ))}
                      </div>
                      <h3 className="mb-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 font-mono-accent text-[10px] text-muted-foreground">
                          <Calendar className="h-2.5 w-2.5" />
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 font-mono-accent text-[10px] text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" />
                            {post.readingTime} min
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
