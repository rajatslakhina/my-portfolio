// components/sections/BlogSection.tsx
import { getBlogPostsByCategory } from "@/lib/github-blog";
import { BLOG_CATEGORIES } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import Link from "next/link";
import { CyberBadge } from "@/components/ui/cyber-badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSection = async () => {
  // Fetch latest 3 posts from each category, show up to 3 total on home
  const allCatPosts = await Promise.all(
    BLOG_CATEGORIES.map(async (cat) => ({
      cat,
      posts: (await getBlogPostsByCategory(cat)).slice(0, 3),
    }))
  );

  const hasPosts = allCatPosts.some(({ posts }) => posts.length > 0);
  if (!hasPosts) return null;

  return (
    <SectionWrapper id="blog">
      <div className="mb-16 flex flex-col items-center gap-2">
        <span className="font-mono-accent text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {"{/* writing */}"}
        </span>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Knowledge{" "}
          <span className="text-gradient font-serif italic">Hub</span>
        </h2>
      </div>

      {allCatPosts.map(({ cat, posts }) => {
        if (posts.length === 0) return null;
        const colorVal = cat.color as string;
        const barGrad = colorVal === "secondary" ? "from-secondary to-accent" : "from-primary to-secondary";

        return (
          <div key={cat.slug} className="mb-14 last:mb-0">
            {/* Category label */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl">{cat.emoji}</span>
              <h3 className="text-xl font-bold text-foreground">{cat.label}</h3>
              <div className={`h-px flex-1 bg-gradient-to-r ${barGrad} opacity-30`} />
              <Link href={`/blog#${cat.slug}`}
                className="font-mono-accent text-xs text-muted-foreground hover:text-primary transition-colors">
                See all →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${cat.slug}/${post.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-card/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] hover:-translate-y-1"
                >
                  <div className={`h-0.5 w-full bg-gradient-to-r ${i === 0 ? "from-primary to-secondary" : i === 1 ? "from-secondary to-accent" : "from-accent to-primary"}`} />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-none group-hover:animate-shine" />

                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <CyberBadge key={tag} label={tag} variant="primary" />
                      ))}
                    </div>
                    <h4 className="mb-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="mb-3 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-0.5 font-mono-accent text-[10px] text-muted-foreground">
                        <Calendar className="h-2.5 w-2.5" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5 font-mono-accent text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {post.readingTime} min
                        </span>
                        <ArrowRight className="h-3 w-3 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-10 text-center">
        <Button asChild variant="outline"
          className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-neon-primary transition-all duration-300">
          <Link href="/blog">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default BlogSection;
