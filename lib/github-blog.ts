// lib/github-blog.ts
import matter from "gray-matter";
import type { BlogCategory } from "@/constants";

const BASE_HEADERS = (token?: string): HeadersInit => ({
  Accept: "application/vnd.github.v3+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const TOKEN = process.env.GITHUB_TOKEN;

export interface BlogPost {
  slug:         string;
  title:        string;
  date:         string;
  description:  string;
  tags:         string[];
  content:      string;
  coverImage?:  string;
  readingTime:  number;
  category:     string;   // category slug
}

function calcReadingTime(text: string) {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

function cleanTitle(raw: string, isSlug = false): string {
  let s = raw;
  // Strip "Article 1:", "Article 01 -", "article_01_" prefixes (case-insensitive)
  s = s.replace(/^article[\s_-]*\d+[:\s_-]+/i, "");
  if (isSlug) {
    s = s.replace(/[-_]/g, " ");
  }
  // Title-case
  return s.trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

interface GithubFile { name: string; type: string; download_url: string; }

async function fetchPostsFromRepo(
  owner: string,
  repo: string,
  categorySlug: string
): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      { headers: BASE_HEADERS(TOKEN), cache: 'no-store' }
    );
    if (!res.ok) return [];

    const files = (await res.json()) as GithubFile[];
    const mdFiles = files.filter(
      (f) => f.type === "file" && f.name.endsWith(".md") && f.name.toLowerCase() !== "readme.md"
    );

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const raw = await fetch(file.download_url, { cache: 'no-store' }).then((r) => r.text());
        const { data, content } = matter(raw);
        const slug = file.name.replace(/\.md$/, "");
        return {
          slug,
          title:       cleanTitle(data.title ?? slug, !data.title),
          date:        data.date        ?? new Date().toISOString().split("T")[0],
          description: data.description
            ?? content
              .split(/\n-{3,}\n/)[0]          // stop at first --- separator
              .split("\n")
              .filter((l) => l.trim() && !l.startsWith("#") && !/^-{3,}$/.test(l.trim()))
              .join(" ")
              .replace(/article\s*\d+[:\s_-]+/gi, "")
              .replace(/[*>`#]/g, "")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 160),
          tags:        Array.isArray(data.tags) ? data.tags : [],
          content,
          coverImage:  data.coverImage ?? data.cover ?? undefined,
          readingTime: calcReadingTime(content),
          category:    categorySlug,
        } satisfies BlogPost;
      })
    );
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    console.error(`fetchPostsFromRepo error (${owner}/${repo}):`, e);
    return [];
  }
}

/** Fetch all posts from all categories */
export async function getAllBlogPosts(
  categories: readonly BlogCategory[]
): Promise<BlogPost[]> {
  const results = await Promise.all(
    categories.map((cat) => fetchPostsFromRepo(cat.owner, cat.repo, cat.slug))
  );
  return results
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Fetch posts for a single category */
export async function getBlogPostsByCategory(
  category: BlogCategory
): Promise<BlogPost[]> {
  return fetchPostsFromRepo(category.owner, category.repo, category.slug);
}

/** Fetch a single post by category + slug */
export async function getBlogPost(
  category: BlogCategory,
  slug: string
): Promise<BlogPost | null> {
  try {
    const { owner, repo } = category;
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${slug}.md`,
      { headers: BASE_HEADERS(TOKEN), cache: 'no-store' }
    );
    if (!res.ok) return null;

    const file = (await res.json()) as GithubFile;
    const raw  = await fetch(file.download_url, { cache: 'no-store' }).then((r) => r.text());
    const { data, content } = matter(raw);

    return {
      slug,
      title:       cleanTitle(data.title ?? slug, !data.title),
      date:        data.date        ?? new Date().toISOString().split("T")[0],
      description: data.description
            ?? content
              .split(/\n-{3,}\n/)[0]          // stop at first --- separator
              .split("\n")
              .filter((l) => l.trim() && !l.startsWith("#") && !/^-{3,}$/.test(l.trim()))
              .join(" ")
              .replace(/article\s*\d+[:\s_-]+/gi, "")
              .replace(/[*>`#]/g, "")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 160),
      tags:        Array.isArray(data.tags) ? data.tags : [],
      content,
      coverImage:  data.coverImage ?? data.cover ?? undefined,
      readingTime: calcReadingTime(content),
      category:    category.slug,
    };
  } catch (e) {
    console.error(`getBlogPost error (${category.slug}/${slug}):`, e);
    return null;
  }
}
