import Link from "next/link"
import { BookOpen } from "lucide-react"
import { getAllPosts, type Post } from "@/lib/posts"

export const revalidate = 3600

async function getGithubPosts(): Promise<Post[]> {
  try {
    const token = process.env.GITHUB_TOKEN
    const repo  = process.env.GITHUB_BLOG_REPO ?? "rajatslakhina/AI-Knowledge"
    const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json" }
    if (token) headers.Authorization = `Bearer ${token}`

    // Try common repo paths in order until we find markdown files
    const candidatePaths = ["posts", "articles", "blog", ""]
    let mdFiles: { name: string; download_url: string }[] = []

    for (const path of candidatePaths) {
      const url = `https://api.github.com/repos/${repo}/contents${path ? `/${path}` : ""}`
      const res = await fetch(url, { headers, next: { revalidate: 3600 } })
      if (!res.ok) continue
      const data = await res.json() as { name: string; download_url: string; type: string }[]
      if (!Array.isArray(data)) continue
      const found = data.filter(f => f.type === "file" && f.name.endsWith(".md"))
      if (found.length > 0) { mdFiles = found; break }
    }

    if (mdFiles.length === 0) return []

    // Fetch each file's content to extract real H1 title and first paragraph
    const posts = await Promise.all(
      mdFiles.slice(0, 12).map(async (f) => {
        const base = f.name.replace(/\.md$/, "")
        const parts = base.split("--")
        let category: string, slug: string
        if (parts.length >= 2) {
          category = parts[0]
          slug = parts.slice(1).join("--")
        } else {
          category = "ai"
          slug = base
        }

        let title = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        let excerpt = ""
        let readTime = "5 min read"

        try {
          const raw = await fetch(f.download_url, { next: { revalidate: 3600 } })
          if (raw.ok) {
            const text = await raw.text()
            const h1 = text.match(/^#\s+(.+)$/m)
            if (h1) title = h1[1].trim()
            const words = text.split(/\s+/).length
            readTime = `${Math.max(1, Math.round(words / 200))} min read`
            const lines = text.split("\n")
            for (const line of lines) {
              const t = line.trim()
              if (t && !t.startsWith("#") && !t.startsWith("!") && !t.startsWith(">") && !t.startsWith("```") && t.length > 40) {
                excerpt = t.replace(/[*_`[\]]/g, "").slice(0, 200)
                break
              }
            }
          }
        } catch { /* keep filename-derived values */ }

        return { slug, category, title, date: "", readTime, excerpt, content: "" }
      })
    )

    return posts
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const [githubPosts, staticPosts] = await Promise.all([
    getGithubPosts(),
    Promise.resolve(getAllPosts()),
  ])

  // Merge: GitHub posts first (deduplicate by slug against static)
  const staticSlugs = new Set(staticPosts.map(p => p.slug))
  const merged = [
    ...githubPosts.filter(p => !staticSlugs.has(p.slug)),
    ...staticPosts,
  ]

  return (
    <div className="relative min-h-screen py-24">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-30" />
      <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex items-center gap-3">
          <div
            className="flex items-center gap-2 border border-primary/25 bg-primary/8 px-3 py-1"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <BookOpen className="h-3 w-3 text-primary" />
            <span className="font-mono-accent text-[10px] tracking-[0.22em] text-primary uppercase font-semibold">
              blog.feed
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary/40 to-transparent" />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          AI &amp;{" "}
          <span className="text-gradient">Engineering</span>{" "}
          Blog
        </h1>
        <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Thoughts on AI-first development, iOS architecture, building mobile platforms,
          and growing as a tech leader.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {merged.map(post => (
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
      </div>
    </div>
  )
}
