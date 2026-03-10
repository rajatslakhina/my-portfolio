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

interface GithubFile { name: string; type: string; download_url: string; }

async function fetchPostsFromRepo(
  owner: string,
  repo: string,
  categorySlug: string
): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      { headers: BASE_HEADERS(TOKEN), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];

    const files = (await res.json()) as GithubFile[];
    const mdFiles = files.filter(
      (f) => f.type === "file" && f.name.endsWith(".md") && f.name.toLowerCase() !== "readme.md"
    );

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const raw = await fetch(file.download_url, { next: { revalidate: 3600 } }).then((r) => r.text());
        const { data, content } = matter(raw);
        const slug = file.name.replace(/\.md$/, "");
        return {
          slug,
          title:       data.title       ?? slug.replace(/[-_]/g, " "),
          date:        data.date        ?? new Date().toISOString().split("T")[0],
          description: data.description ?? content.slice(0, 180).replace(/[#>\n*]/g, " ").trim(),
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
      { headers: BASE_HEADERS(TOKEN), next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const file = (await res.json()) as GithubFile;
    const raw  = await fetch(file.download_url, { next: { revalidate: 3600 } }).then((r) => r.text());
    const { data, content } = matter(raw);

    return {
      slug,
      title:       data.title       ?? slug.replace(/[-_]/g, " "),
      date:        data.date        ?? new Date().toISOString().split("T")[0],
      description: data.description ?? content.slice(0, 180).replace(/[#>\n*]/g, " ").trim(),
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
