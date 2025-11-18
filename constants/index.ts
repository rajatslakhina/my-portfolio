// constants/index.ts
import {
  Code, Cpu, Database, Feather, GitBranch, Globe, HardDrive,
  Layers, Megaphone, Monitor, Move, Puzzle, Smartphone, Gauge,
  Shield, GitPullRequest, Settings, LineChart, Server, Cloud, BarChart
} from "lucide-react";

export const SITE_NAME = "Rajat Lakhina";
export const SITE_TITLE = "Rajat Lakhina | Mobile Development Professional";
export const SITE_DESCRIPTION = "Nearly 10 years of experience in mobile development, specializing in iOS, SwiftUI, and mobile architecture. Senior Consultant at ThoughtWorks.";
export const SITE_URL = "https://your-domain.com"; // Replace with your domain

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
  phone: "+91-9499109991",
  email: "er.rajatlakhina@gmail.com",
  linkedin: "https://linkedin.com/in/rajat-lakhina",
  medium: "https://medium.com/@er.rajatlakhina",
  whatsapp: "https://wa.me/919499109991",
};

export const RESUME_URL = "/Rajat_Lakhina_Resume.pdf";

export const PROFILE_SUMMARY = {
  title: "About Me",
  description: [
    "A seasoned **Mobile Development Professional** with nearly **10 years of experience**, currently serving as a **Senior Consultant at ThoughtWorks**. My expertise spans the complete mobile product lifecycle, with a deep focus on **iOS development, SwiftUI, and robust mobile architecture**.",
    "I specialize in leading end-to-end development, from ideation to deployment, ensuring solutions are not only technically sound but also perfectly aligned with stakeholder vision and business objectives. I am a strong advocate for Agile, DevOps, and CI/CD practices to drive efficiency and quality.",
    "With a proven track record of delivering impactful solutions for multiple enterprise clients, I excel in creating **scalable, high-performance, and secure** mobile applications. My technical competencies include offline-first design, concurrency, and modular architecture."
  ],
  coreCompetencies: [
    "Mobile Architecture & Design",
    "iOS & SwiftUI Development",
    "Multi-Frontend Solutions",
    "Performance Optimization",
    "Application Security",
    "Stakeholder Alignment",
    "Agile & DevOps Methodologies",
    "End-to-End Product Lifecycle",
    "CI/CD Pipeline Management",
    "Scalability & Offline-First Design",
    "Concurrency & Modular Architecture",
  ]
};
export const SKILLS = {
  mobileFrameworks: [
    { name: "iOS", icon: Smartphone },
    { name: "SwiftUI", icon: Feather },
    { name: "Swift", icon: Code },
    { name: "UIKit", icon: Layers },
    { name: "Objective-C", icon: Code },
    { name: "Combine", icon: GitBranch },
    { name: "CoreData", icon: Database },
    { name: "CoreLocation", icon: Globe },
    { name: "CoreAnimation", icon: Move },
    { name: "ARKit", icon: Puzzle },
    { name: "RealityKit", icon: Puzzle },
  ],
  architecturePatterns: [
    { name: "MVVM", icon: Layers },
    { name: "VIPER", icon: Layers },
    { name: "Clean Architecture", icon: Layers },
    { name: "Modular Architecture", icon: Puzzle },
    { name: "Concurrency", icon: Cpu },
    { name: "Offline-first Design", icon: HardDrive },
    { name: "Design Patterns", icon: Puzzle },
    { name: "SOLID Principles", icon: Puzzle },
  ],
  developmentPractices: [
    { name: "Agile/Scrum", icon: Gauge },
    { name: "TDD/BDD", icon: Settings }, // <-- This line was fixed (was name:A)
    { name: "DevOps", icon: GitPullRequest },
    { name: "CI/CD", icon: GitPullRequest },
    { name: "Stakeholder Alignment", icon: Megaphone },
    { name: "Security", icon: Shield },
    { name: "Scalability", icon: BarChart },
  ],
  performanceMonitoring: [
    { name: "Performance Tuning", icon: Gauge },
    { name: "Memory Management", icon: HardDrive },
    { name: "App Store Connect", icon: LineChart },
    { name: "Firebase (Analytics, Crashlytics)", icon: Cloud },
    { name: "New Relic", icon: Monitor },
  ],
  toolsBuildSystems: [
    { name: "Xcode", icon: Settings },
    { name: "Git", icon: GitBranch },
    { name: "Jenkins", icon: Server },
    { name: "Bitrise", icon: Cloud },
    { name: "Fastlane", icon: Gauge },
    { name: "JIRA", icon: Puzzle },
    { name: "SPM", icon: Puzzle },
    { name: "CocoaPods", icon: Puzzle },
    { name: "Carthage", icon: Puzzle },
  ],
};

export const EXPERIENCE = [
  {
    company: "ThoughtWorks",
    role: "Senior Consultant (Mobile Applications)",
    duration: "2024 – Present",
    description: "Leading mobile architecture and strategy, delivering high-impact, scalable, and secure solutions while driving operational excellence for enterprise clients.",
    achievements: [
      {
        company: "TeleMessage",
        duration: "6 Months",
        points: [
          "Achieved a 15% improvement in security for enterprise communication.",
          "Automated a multi-repo merge system, streamlining development.",
          "Delivered an end-to-end Signal-based enterprise messenger.",
        ],
      },
      {
        company: "REA Real Estate",
        duration: "9 Months",
        points: [
          "Architected reusable, interactive SwiftUI modules.",
          "Boosted user engagement by +15% through new features.",
          "Implemented interactive map and clustering functionalities.",
        ],
      },
    ],
  },
  {
    company: "DTC Infotech",
    role: "Senior Software Developer",
    duration: "2023 – 2024",
    achievements: [
      {
        company: "Khulke",
        duration: "13 Months",
        points: [
          "Modularized meeting and streaming frameworks for scalability.",
          "Delivered $500k in value by migrating key UIKit flows to SwiftUI.",
          "Built a highly reactive, performant SwiftUI-based Home Screen.",
          "Integrated multiple REST APIs for seamless data flow.",
        ],
      },
    ],
  },
  {
    company: "Mobile Programming LLC",
    role: "Senior Software Developer",
    duration: "2021 – 2023",
    achievements: [
      {
        company: "SC – Next Gen Banking",
        duration: "18 Months",
        points: [
          "Built core wealth, profile, and daily banking modules.",
          "Contributed to a +35% improvement in app usability.",
          "Delivered $2M worth of scalable, reusable banking components.",
        ],
      },
      {
        company: "Airtel Payment Bank",
        duration: "28 Months",
        points: [
          "Achieved $500k in UX and performance gains.",
          "Architected Onboarding, IRCTC, Home, and Insurance modules.",
          "Improved rendering, concurrency, and memory management.",
        ],
      },
    ],
  },
];

export const PROJECTS = [
  {
    title: "Portfolio Website (This one!)",
    description: "My personal portfolio, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Designed to be fully responsive and SEO-optimized.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/rajat-lakhina/portfolio", // Replace with your actual repo
    live: "https://your-domain.com", // Replace
  },
  {
    title: "iOS Swift-CoreML",
    description: "An iOS application demonstrating the power of CoreML for on-device machine learning. Includes examples of image recognition and analysis.",
    tags: ["Swift", "CoreML", "UIKit", "Machine Learning"],
    link: "https://github.com/rajat-lakhina/iOS-Swift-CoreML",
  },
  {
    title: "SwiftUI-Combine-Login",
    description: "A sample project showcasing a modern login flow built entirely in SwiftUI, using the Combine framework for reactive state management and form validation.",
    tags: ["SwiftUI", "Combine", "MVVM", "Reactive"],
    link: "https://github.com/rajat-lakhina/SwiftUI-Combine-Login-Example",
  },
  {
    title: "iOS-MapKit-Clustering",
    description: "A demo app implementing advanced MapKit features, including marker clustering for performance, custom annotations, and user location tracking.",
    tags: ["Swift", "MapKit", "CoreLocation", "UIKit"],
    link: "https://github.com/rajat-lakhina/iOS-MapKit-Clustering",
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Kurukshetra University, Kurukshetra",
    duration: "2012 - 2016",
    details: "Graduated with a focus on data structures, algorithms, and software engineering principles, laying the foundation for my career in development."
  },
  {
    degree: "Diploma, Computer Engineering",
    institution: "Govt. Polytechnic, Ambala City",
    duration: "2009 - 2012",
    details: "Gained early hands-on experience and fundamental knowledge in computer hardware, networking, and programming."
  }
];

export const CONTACT_DETAILS = {
  email: SOCIAL_LINKS.email,
  phone: SOCIAL_LINKS.phone,
  location: "Gurugram, Haryana, India",
  whatsapp: SOCIAL_LINKS.whatsapp,
};