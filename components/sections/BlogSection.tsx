import { getBlogPostsByCategory } from "@/lib/github-blog";
import { BLOG_CATEGORIES } from "@/constants";
import SectionWrapper from "../shared/SectionWrapper";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCards } from "./BlogCards";

const BlogSection = async () => {
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
      {/* Header */}
      <div className="mb-14 flex flex-col items-center gap-3">
        <div className="relative flex items-center gap-2 border border-primary/30 bg-primary/8 px-4 py-1.5"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <BookOpen className="h-3 w-3 text-primary" />
          <span className="font-mono-accent text-[10px] text-primary uppercase tracking-[0.3em]">05 / knowledge.hub</span>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
          Knowledge <span className="text-gradient font-serif italic">Hub</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-primary/30 text-xs">◆</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </div>

      <BlogCards catPosts={allCatPosts} />

      <div className="mt-12 text-center">
        <Button asChild variant="outline"
          className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-neon-primary transition-all duration-300 font-mono-accent text-[11px] uppercase tracking-widest"
          style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
        >
          <Link href="/blog" className="flex items-center gap-2">
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default BlogSection;
