export const SITE_NAME = "Rajat Lakhina"
export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rajatlakhina.com"
export const RESUME_URL = "/resume.pdf"

export const CONTACT_DETAILS = {
  email:    "rajat.s.lakhina@gmail.com",
  phone:    "+91-98100-00000",
  location: "Gurugram, Haryana, India",
  linkedin: "https://www.linkedin.com/in/rajatlakhina",
  medium:   "https://medium.com/@rajatlakhina",
  whatsapp: "https://wa.me/919810000000",
} as const

export const NAV_LINKS = [
  { href: "/",        name: "Home"    },
  { href: "/blog",    name: "Blog"    },
  { href: "/resources", name: "Resources" },
  { href: "/contact",   name: "Contact"   },
] as const

export const SOCIAL_LINKS = [
  { href: "https://linkedin.com/in/rajatlakhina", label: "LinkedIn" },
  { href: "https://github.com/rajatlakhina",      label: "GitHub"   },
] as const


export const BLOG_CATEGORIES = [
  { slug: "ai",           label: "AI & LLMs",            emoji: "🤖", color: "hsl(186 100% 50%)", owner: "rajatslakhina", repo: "AI-Knowledge" },
  { slug: "ios",          label: "iOS & Swift",          emoji: "📱", color: "hsl(275 100% 60%)", owner: "rajatslakhina", repo: "AI-Knowledge" },
  { slug: "architecture", label: "Architecture",          emoji: "🏗️", color: "hsl(335 100% 55%)", owner: "rajatslakhina", repo: "AI-Knowledge" },
  { slug: "leadership",   label: "Engineering Leadership", emoji: "🧭", color: "hsl(186 100% 50%)", owner: "rajatslakhina", repo: "AI-Knowledge" },
] as const
export type BlogCategory = typeof BLOG_CATEGORIES[number]

export const EDUCATION = [
  {
    degree:      "Bachelor of Technology — Computer Science",
    institution: "Rajasthan Technical University",
    duration:    "2012 – 2016",
    description: "Core CS fundamentals, algorithms, data structures, and software engineering principles.",
    details: "Graduated with distinction. Core coursework: Data Structures, Algorithms, Operating Systems, Computer Networks, DBMS, Software Engineering.",
    grade: "First Division",
  },
] as const

export const EXPERIENCE = [
  {
    company: "ThoughtWorks",
    role: "Senior Consultant — Mobile Applications",
    duration: "2024 – Present",
    description:
      "Spearheading technical leadership in mobile solution architecture, managing design, development, and end-to-end delivery. Collaborating with cross-functional teams to build scalable, secure, and high-performing applications.",
    achievements: [
      {
        company: "TeleMessage",
        duration: "2024 (6 months)",
        points: [
          "Spearheaded security automation achieving 15% enhancement in data protection across the platform",
          "Designed and deployed an automated multi-repo code merge system, reducing manual effort and merge conflicts",
          "Directed end-to-end development of the Signal-based enterprise messaging application ensuring privacy compliance",
        ],
      },
      {
        company: "REA — Real Estate App",
        duration: "2024 (9 months)",
        points: [
          "Architected and optimised SwiftUI-based modules for property discovery, listings, and user profiles",
          "Enhanced user engagement by 15% through interactive map views, clustering, and real-time property updates",
        ],
      },
      {
        company: "PepsiCo Super App",
        duration: "2024",
        points: [
          "Solution Architect — designed scalable modular frameworks for FMCG domain operations",
          "Defined architecture standards covering multi-brand catalogues, distributor workflows, and field sales",
        ],
      },
    ],
  },
  {
    company: "DTC Infotech",
    role: "Senior Software Developer",
    duration: "2023 – 2024",
    description:
      "Directed technical development and architectural design for mobile applications, collaborating with leads and stakeholders to ensure scalable, high-quality delivery.",
    achievements: [
      {
        company: "Khulke",
        duration: "2023 – 2024 (13 months)",
        points: [
          "Modularized Meeting and Live Streaming functionalities into independent frameworks, enhancing code reusability",
          "Elevated user experience and delivered $500,000 value by migrating from UIKit to SwiftUI with async/await",
          "Designed SwiftUI-based Home Screen with reactive data pipelines, driving improved UI responsiveness",
          "Integrated RESTful APIs for robust, scalable communication between modules",
        ],
      },
    ],
  },
  {
    company: "Mobile Programming LLC",
    role: "Senior Software Developer",
    duration: "2021 – 2023",
    description:
      "Owned delivery across banking solutions, mentoring junior engineers and contributing to solutioning and architecture discussions.",
    achievements: [
      {
        company: "SC — Next Gen Banking",
        duration: "2021 – 2023 (18 months)",
        points: [
          "Contributed to end-to-end development of next-generation banking app for Standard Chartered Singapore",
          "Optimised profile, daily banking, and wealth modules driving a 35% increase in usability and task completion",
          "Enhanced project efficiency by 20% through mentoring 5 junior engineers and leading architecture discussions",
        ],
      },
    ],
  },
  {
    company: "HCL Technologies",
    role: "Lead Engineer",
    duration: "2019 – 2021",
    description:
      "Spearheaded technical development programs, ensuring on-time delivery of $2M projects while architecting 10+ reusable components and templates.",
    achievements: [
      {
        company: "Airtel Payment Bank",
        duration: "2019 – 2021 (28 months)",
        points: [
          "Delivered $500,000 in performance gains by migrating from UIKit to SwiftUI with async/await concurrency",
          "Architected critical modules — Onboarding, IRCTC, Home Page, and Insurance — ensuring seamless integration",
          "Revitalised the onboarding experience by redesigning workflows aligned with modern design language",
        ],
      },
      {
        company: "MD SnR License Fetch",
        duration: "2019 – 2020",
        points: [
          "Lead Developer — built backend integrations and a library of reusable components",
          "Delivered scalable, modular design patterns adopted across the project",
        ],
      },
    ],
  },
  {
    company: "Konnecs Infotech",
    role: "iOS Developer",
    duration: "2016 – 2019",
    description:
      "First professional role in mobile development — deep technical optimisation of memory management, UI/UX rendering, and network performance.",
    achievements: [
      {
        company: "VegPlatter",
        duration: "2018 – 2019",
        points: [
          "Built a full-featured food ordering iOS app from scratch — menu browsing, cart, checkout, and order tracking",
          "Optimised UI rendering and network performance for smooth experience on low-end devices",
        ],
      },
      {
        company: "Biyah",
        duration: "2017 – 2018",
        points: [
          "Developed social networking iOS app focused on community features — profiles, feeds, and connections",
          "Implemented real-time data sync and push notifications for engaged user experience",
        ],
      },
      {
        company: "Buzz App",
        duration: "2016 – 2017",
        points: [
          "Built social networking app with content discovery, user interactions, and in-app messaging",
          "Grew from iOS fundamentals to full ownership of the release pipeline within the first year",
        ],
      },
    ],
  },
]
