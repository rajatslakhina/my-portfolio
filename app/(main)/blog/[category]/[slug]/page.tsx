// app/(main)/blog/[category]/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_CATEGORIES } from "@/constants";
import { getBlogPost } from "@/lib/github-blog";
import { CyberBadge } from "@/components/ui/cyber-badge";
import { Calendar, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

export const dynamic = 'force-dynamic';

interface PageProps { params: { category: string; slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return { title: "Not Found" };
  const post = await getBlogPost(cat, params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const post = await getBlogPost(cat, params.slug);
  if (!post) notFound();

  // Build mdComponents inside function so h1 can access post date/time
  const mdComponents: Components = {
    h1: ({ children }) => {
      const cleaned = React.Children.map(children, (child) =>
        typeof child === "string" ? child.replace(/^article\s*\d+[:\s_-]+/i, "") : child
      );
      return (
        <div className="mb-8 first:mt-0">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {cleaned}
          </h1>
          <div className="flex flex-wrap gap-5 border-b border-border pb-6">
            <span className="flex items-center gap-1.5 font-mono-accent text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {new Date(post!.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5 font-mono-accent text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {post!.readingTime} min read
            </span>
          </div>
        </div>
      );
    },
    h2: ({ children }) => <h2 className="mb-3 mt-8 text-2xl font-bold text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 text-xl font-semibold text-foreground">{children}</h3>,
    p:  ({ children }) => <p className="mb-4 leading-7 text-muted-foreground">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 space-y-1.5 pl-5 text-muted-foreground [&>li]:list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 space-y-1.5 pl-5 text-muted-foreground [&>li]:list-decimal">{children}</ol>,
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 rounded-r-lg border-l-4 border-primary/50 bg-primary/5 py-2 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isBlock = !!className?.startsWith("language-");
      return isBlock ? (
        <code className="block overflow-x-auto rounded-xl border border-primary/10 bg-card/80 p-4 font-mono text-sm text-primary leading-relaxed">
          {children}
        </code>
      ) : (
        <code className="rounded-md border border-primary/20 bg-primary/8 px-1.5 py-0.5 font-mono text-xs text-primary">
          {children}
        </code>
      );
    },
    pre: ({ children }) => <pre className="mb-4 overflow-x-auto">{children}</pre>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline">
        {children}
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>
    ),
    hr: () => <hr className="my-8 border-border" />,
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  };

  return (
    <article className="py-24">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 font-mono-accent text-xs text-muted-foreground">
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-primary">{cat.emoji} {cat.label}</span>
        <span>/</span>
        <span className="truncate text-foreground">{post.title}</span>
      </div>

      {/* Tags only — no duplicate title or date here */}
      <div className="mb-10 flex flex-wrap gap-2">
        <CyberBadge label={`${cat.emoji} ${cat.label}`} variant="primary" />
        {post.tags.map((tag) => <CyberBadge key={tag} label={tag} variant="muted" />)}
      </div>

      {/* Markdown content — H1 inside markdown renders title + date/time */}
      <div className="max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center backdrop-blur-md">
        <p className="mb-2 text-lg font-semibold text-foreground">Enjoyed this article?</p>
        <p className="mb-6 text-sm text-muted-foreground">Connect with me for more content on mobile development &amp; AI.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-5 py-2.5 font-mono-accent text-sm text-primary transition-all hover:border-primary hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-neon px-5 py-2.5 font-semibold text-black shadow-neon-primary transition-all hover:shadow-neon-secondary">
            Get in touch <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </article>
  );
}
