export interface Resource {
  title:       string;
  author:      string;
  url:         string;
  category:    "ios" | "architecture" | "ai" | "leadership" | "career";
  description: string;
}

export const READING_LIST: Resource[] = [
  { title: "Point-Free: Composable Architecture", author: "Brandon Williams & Stephen Celis", url: "https://www.pointfree.co", category: "ios", description: "The definitive resource for TCA (The Composable Architecture) in Swift. Essential for anyone building scalable iOS apps." },
  { title: "Swift by Sundell", author: "John Sundell", url: "https://swiftbysundell.com", category: "ios", description: "Deep dives into Swift language features, architecture patterns, and iOS best practices. My go-to for staying current." },
  { title: "objc.io Books", author: "Chris Eidhof, Florian Kugler", url: "https://objc.io/books", category: "ios", description: "Thinking in SwiftUI and Advanced Swift are required reading for any serious iOS engineer." },
  { title: "A Philosophy of Software Design", author: "John Ousterhout", url: "https://a.co/d/3Jgzzmf", category: "architecture", description: "The best book on software design I've read. Deeply influenced how I think about module boundaries and API design." },
  { title: "Clean Architecture", author: "Robert C. Martin", url: "https://a.co/d/0eCBpTK", category: "architecture", description: "Core principles that apply regardless of platform. SOLID + dependency rule in practice." },
  { title: "Attention Is All You Need", author: "Vaswani et al.", url: "https://arxiv.org/abs/1706.03762", category: "ai", description: "The Transformer paper. Understanding this is foundational for anyone working with LLMs and AI tooling." },
  { title: "Chip Huyen — Designing ML Systems", author: "Chip Huyen", url: "https://a.co/d/3JmP7Vj", category: "ai", description: "Practical guide to building production ML pipelines. Essential context for AI-first mobile engineering." },
  { title: "Staff Engineer: Leadership Beyond the Management Track", author: "Will Larson", url: "https://staffeng.com/book", category: "leadership", description: "The clearest articulation of what Staff+ impact looks like. Shaped how I think about technical leadership." },
  { title: "An Elegant Puzzle: Systems of Engineering Management", author: "Will Larson", url: "https://a.co/d/4dVcGf7", category: "leadership", description: "Engineering management through a systems lens. Highly practical and grounded." },
  { title: "The Manager's Path", author: "Camille Fournier", url: "https://a.co/d/7a8Rfas", category: "career", description: "The career guide I wish existed earlier. Covers the IC-to-EM transition better than anything else." },
  { title: "Pragmatic Programmer", author: "David Thomas & Andrew Hunt", url: "https://a.co/d/28Xp5ZA", category: "career", description: "Still the best broad-spectrum programming career book. DRY and orthogonality chapters are evergreen." },
];

export const CATEGORIES: { id: Resource["category"]; label: string }[] = [
  { id: "ios",          label: "iOS / Swift"    },
  { id: "architecture", label: "Architecture"   },
  { id: "ai",           label: "AI / ML"        },
  { id: "leadership",   label: "Leadership"     },
  { id: "career",       label: "Career"         },
];
