// constants/index.ts
import { link } from 'fs';
import {
  Code,
  Cpu,
  Database,
  Feather,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Megaphone,
  Monitor,
  Move,
  Puzzle,
  Smartphone,
  Gauge,
  Shield,
  GitPullRequest,
  Settings,
  LineChart,
  Server,
  Cloud,
  BarChart,
  ListVideo,
} from 'lucide-react';

export const SITE_NAME = 'Rajat Lakhina';
export const SITE_TITLE = 'Rajat Lakhina | Mobile Development Professional';
export const SITE_DESCRIPTION =
  'Nearly 10 years of experience in mobile development, specializing in iOS, SwiftUI, and mobile architecture. Senior Consultant at ThoughtWorks.';
export const SITE_URL = 'https://your-domain.com'; // Replace with your domain

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Education', href: '/education' },
  { name: 'Contact', href: '/contact' },
];

export const SOCIAL_LINKS = {
  phone: '+91-9499109991',
  email: 'er.rajatlakhina@gmail.com',
  linkedin: 'https://linkedin.com/in/rajat-lakhina',
  medium: 'https://medium.com/@er.rajatlakhina',
  whatsapp: 'https://wa.me/919499109991',
};

export const RESUME_URL = '/Rajat_Lakhina_Resume.pdf';

export const PROFILE_SUMMARY = {
  title: 'About Me',
  description: [
    'A seasoned **Mobile Development Professional** with nearly **10 years of experience**, currently serving as a **Senior Consultant at ThoughtWorks**. My expertise spans the complete mobile product lifecycle, with a deep focus on **iOS development, SwiftUI, and robust mobile architecture**.',
    'I specialize in leading end-to-end development, from ideation to deployment, ensuring solutions are not only technically sound but also perfectly aligned with stakeholder vision and business objectives. I am a strong advocate for Agile, DevOps, and CI/CD practices to drive efficiency and quality.',
    'With a proven track record of delivering impactful solutions for multiple enterprise clients, I excel in creating **scalable, high-performance, and secure** mobile applications. My technical competencies include offline-first design, concurrency, and modular architecture.',
  ],
  coreCompetencies: [
    'Mobile Architecture & Design',
    'iOS & SwiftUI Development',
    'Multi-Frontend Solutions',
    'Performance Optimization',
    'Application Security',
    'Stakeholder Alignment',
    'Agile & DevOps Methodologies',
    'End-to-End Product Lifecycle',
    'CI/CD Pipeline Management',
    'Scalability & Offline-First Design',
    'Concurrency & Modular Architecture',
  ],
};
export const SKILLS = {
  mobileFrameworks: [
    { name: 'iOS', icon: Smartphone },
    { name: 'SwiftUI', icon: Feather },
    { name: 'Swift', icon: Code },
    { name: 'UIKit', icon: Layers },
    { name: 'Objective-C', icon: Code },
    { name: 'Combine', icon: GitBranch },
    { name: 'CoreData', icon: Database },
    { name: 'CoreLocation', icon: Globe },
    { name: 'CoreAnimation', icon: Move },
    /*     { name: "ARKit", icon: Puzzle }, */
    /*     { name: "RealityKit", icon: Puzzle } */
    ,
  ],
  architecturePatterns: [
    { name: 'MVVM', icon: Layers },
    { name: 'VIPER', icon: Layers },
    { name: 'Clean Architecture', icon: Layers },
    { name: 'Modular Architecture', icon: Puzzle },
    { name: 'Concurrency', icon: Cpu },
    { name: 'Offline-first Design', icon: HardDrive },
    { name: 'Design Patterns', icon: Puzzle },
    { name: 'SOLID Principles', icon: Puzzle },
  ],
  developmentPractices: [
    { name: 'Agile/Scrum', icon: Gauge },
    { name: 'TDD/BDD', icon: Settings }, // <-- This line was fixed (was name:A)
    { name: 'DevOps', icon: GitPullRequest },
    { name: 'CI/CD', icon: GitPullRequest },
    { name: 'Stakeholder Alignment', icon: Megaphone },
    { name: 'Security', icon: Shield },
    { name: 'Scalability', icon: BarChart },
  ],
  performanceMonitoring: [
    { name: 'Performance Tuning', icon: Gauge },
    { name: 'Memory Management', icon: HardDrive },
    { name: 'App Store Connect', icon: LineChart },
    { name: 'Firebase (Analytics, Crashlytics)', icon: Cloud },
    { name: 'New Relic', icon: Monitor },
  ],
  toolsBuildSystems: [
    { name: 'Xcode', icon: Settings },
    { name: 'Git', icon: GitBranch },
    { name: 'Jenkins', icon: Server },
    { name: 'Bitrise', icon: Cloud },
    { name: 'Fastlane', icon: Gauge },
    { name: 'JIRA', icon: Puzzle },
    { name: 'SPM', icon: Puzzle },
    { name: 'CocoaPods', icon: Puzzle },
    { name: 'Carthage', icon: Puzzle },
  ],
};

export const EXPERIENCE = [
  {
    company: 'ThoughtWorks',
    role: 'Senior Consultant (Mobile Applications)',
    duration: '2024 – Present',
    description:
      'Leading mobile architecture and strategy, delivering high-impact, scalable, and secure solutions while driving operational excellence for enterprise clients.',
    achievements: [
      {
        company: 'TeleMessage',
        duration: '6 Months',
        points: [
          'Achieved a 15% improvement in security for enterprise communication.',
          'Automated a multi-repo merge system, streamlining development.',
          'Delivered an end-to-end Signal-based enterprise messenger.',
        ],
      },
      {
        company: 'PepsiCo – Super App',
        duration: '7 Months',
        points: [
          'Led solution architecture for a React Native–based Super App built on a micro-frontend strategy supporting multiple PepsiCo business units.',
          'Designed modular mini-app boundaries, navigation isolation, and lifecycle management for scalable multi-team development.',
          'Implemented Couchbase Lite–based offline-first data architecture with Sync Gateway for reliable field operations across poor network regions.',
        ],
      },
      {
        company: 'REA Real Estate',
        duration: '9 Months',
        points: [
          'Architected reusable, interactive SwiftUI modules.',
          'Boosted user engagement by +15% through new features.',
          'Implemented interactive map and clustering functionalities.',
        ],
      },
    ],
  },
  {
    company: 'DTC Infotech',
    role: 'Senior Software Developer',
    duration: '2023 – 2024',
    achievements: [
      {
        company: 'Khulke',
        duration: '13 Months',
        points: [
          'Modularized meeting and streaming frameworks for scalability.',
          'Delivered $500k in value by migrating key UIKit flows to SwiftUI.',
          'Built a highly reactive, performant SwiftUI-based Home Screen.',
          'Integrated multiple REST APIs for seamless data flow.',
        ],
      },
    ],
  },
  {
    company: 'Mobile Programming LLC',
    role: 'Senior Software Developer',
    duration: '2021 – 2023',
    achievements: [
      {
        company: 'SC – Next Gen Banking',
        duration: '18 Months',
        points: [
          'Built core wealth, profile, and daily banking modules.',
          'Contributed to a +35% improvement in app usability.',
          'Delivered $2M worth of scalable, reusable banking components.',
        ],
      },
    ],
  },
  {
    company: 'HCL Technologies',
    role: 'Lead Engineer',
    duration: '2019 – 2021',
    achievements: [
      {
        company: 'Airtel Payment Bank',
        duration: '22 Months',
        points: [
          'Achieved $500k in UX and performance gains.',
          'Architected Onboarding, IRCTC, Home, and Insurance modules.',
          'Improved rendering, concurrency, and memory management.',
        ],
      },
      {
        company: 'MD SnR License Fetch',
        duration: '8 Months',
        points: [
          'Delivered a real-time operational app for field teams with push-based alerts for new ticket assignments across users and groups.',
          'Designed an efficient ticket-claiming system enabling field engineers to pick tasks directly from shared group queues.',
          'Improved field productivity by streamlining access to ticket modules, status updates, and important operational information.',
        ],
      },
    ],
  },
  {
    company: 'Konnecs Infotech',
    role: 'iOS Developer',
    duration: '2016 – 2019',
    achievements: [
      {
        company: 'VegPlatter',
        duration: '18 Months',
        points: [
          'Engineered a full multi-role food delivery system supporting customers, restaurants, and delivery partners with real-time synchronization.',
          'Implemented live GPS tracking with optimized location polling, improving delivery accuracy and reducing customer wait-time anxiety.',
          'Architected scalable order, menu, and delivery modules—cutting API load times by 30% and improving checkout success rates.',
        ],
      },
      {
        company: 'Biyah App',
        duration: '12 Months',
        points: [
          'Built a location-aware matching engine enabling swipe-based discovery with high responsiveness and reduced latency.',
          'Implemented real-time chat using socket programming with read receipts, typing indicators, and presence detection.',
          'Optimized concurrency, pagination, and media caching—boosting profile load performance by 40% and enhancing user engagement.',
        ],
      },
      {
        company: 'Buzz App',
        duration: '12 Months',
        points: [
          'Developed a scalable social feed allowing seamless posting of images, videos, and text with background uploads.',
          'Improved content rendering performance through media compression, caching, and lazy-loading pipelines.',
          'Architected modular components for Feed, Profile, Stories, and Notifications—reducing feature delivery time by 25%.',
        ],
      },
    ],
  },
];

export const PROJECTS = [
  {
    title: 'TeleMessage – Secure Enterprise Messenger',
    description:
      'Enterprise-grade secure messaging solution built on top of Signal, enabling compliant communication for regulated industries. Focused on automation, baseline sync, and multi-repo merge workflows.',
    role: 'Senior Consultant · ThoughtWorks',
    tags: [
      'iOS',
      'Swift',
      'Objective-C',
      'Signal Integration',
      'Security',
      'Multi-Repo Automation',
      'Enterprise Messaging',
    ],
    live: 'https://apps.apple.com/us/app/tm-tlgrm/id1630122033',
    link: '',
  },
  {
    title: 'PepsiCo – Super App (React Native + Couchbase)',
    description:
      'A micro-frontend based React Native Super App designed for multiple business lines across PepsiCo. Led solution architecture for feature boundaries, modular mini-apps, offline-first workflows, and Couchbase Lite–based local storage and sync.',
    role: 'Solution Architect · ThoughtWorks',
    tags: [
      'React Native',
      'TypeScript',
      'Super App Architecture',
      'Micro-Frontends',
      'Couchbase Lite',
      'Sync Gateway',
      'Offline-First',
      'Solution Architecture',
    ],
  },
  {
    title: 'REA Real Estate – iOS Experience',
    description:
      'High-traffic real estate application with interactive maps, listing discovery, and reusable SwiftUI components. Focused on UX, engagement, and modular SwiftUI architecture.',
    role: 'Senior Consultant · ThoughtWorks',
    tags: [
      'iOS',
      'SwiftUI',
      'Swift',
      'Modular Architecture',
      'Maps & Clustering',
      'Performance Optimization',
    ],
    live: 'https://apps.apple.com/au/app/realestate-com-au-property/id404667893',
  },
  {
    title: 'Khulke – Social Streaming & Engagement Platform',
    description:
      'Modular social platform combining live streaming, meetings, and interactive content. Migrated key experiences from UIKit to SwiftUI and improved app responsiveness and scalability.',
    role: 'Senior Software Developer · DTC Infotech',
    tags: ['SwiftUI', 'UIKit', 'Combine', 'Modular Architecture', 'Streaming', 'REST APIs'],
    live: 'https://apps.apple.com/in/app/khul-ke-social-networking-app/id1590836834',
  },
  {
    title: 'SC – Next Gen Banking',
    description:
      'Next-generation banking app for wealth, profile, and daily banking journeys. Delivered reusable banking components and significantly improved usability and feature scalability.',
    role: 'Senior Software Developer · Mobile Programming LLC',
    tags: [
      'iOS',
      'Swift',
      'SwiftUI',
      'Banking',
      'Wealth Management',
      'Reusable Components',
      'UX Improvement',
    ],
    live: 'https://apps.apple.com/sg/app/sc-mobile-singapore/id367337298',
  },
  {
    title: 'Airtel Payment Bank – Digital Banking & Services',
    description:
      'Large-scale digital banking app with onboarding, IRCTC, home, and insurance modules. Focused on performance, concurrency, and reliable, high-volume user journeys.',
    role: 'Lead Engineer · HCL Technologies',
    tags: [
      'iOS',
      'Swift',
      'React Native',
      'Concurrency',
      'Performance',
      'Banking',
      'Module Architecture',
    ],
    live: 'https://apps.apple.com/in/app/airtel-thanks-recharge-bank/id543184334',
  },
  {
    title: 'VegPlatter – Multi-Role Food Delivery Platform',
    description:
      'Food delivery platform supporting customers, restaurants, and delivery partners with real-time order tracking and operational flows.',
    role: 'iOS Developer · Konnecs Infotech',
    tags: [
      'iOS',
      'Swift',
      'Location Tracking',
      'Real-Time Updates',
      'Multi-Role App',
      'Food Delivery',
    ],
    live: 'https://apps.apple.com/in/app/veg-platter/id1291725650',
  },
  {
    title: 'Biyah – Location-Based Dating Platform',
    description:
      'A proximity-based dating app featuring swipe interactions, location-aware match discovery, and real-time chat using socket programming.',
    role: 'iOS Developer · Konnecs Infotech',
    tags: ['iOS', 'Swift', 'Socket Chat', 'Reactive UI', 'Swipe Engine', 'Location Services'],
  },
  {
    title: 'Buzz App – Social Networking Platform',
    description:
      'A social media app enabling users to post images, videos, and text with a high-performance feed, background uploads, and modular UI components.',
    role: 'iOS Developer · Konnecs Infotech',
    tags: [
      'iOS',
      'Swift',
      'Media Feeds',
      'Image/Video Uploads',
      'Caching',
      'Lazy Loading',
      'Social Networking',
    ],
  },
];

export const EDUCATION = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'Kurukshetra University, Kurukshetra',
    duration: '2012 - 2016',
    details:
      'Graduated with a focus on data structures, algorithms, and software engineering principles, laying the foundation for my career in development.',
  },
  {
    degree: 'Diploma, Computer Engineering',
    institution: 'Govt. Polytechnic, Ambala City',
    duration: '2009 - 2012',
    details:
      'Gained early hands-on experience and fundamental knowledge in computer hardware, networking, and programming.',
  },
];

export const CONTACT_DETAILS = {
  email: SOCIAL_LINKS.email,
  phone: SOCIAL_LINKS.phone,
  location: 'Gurugram, Haryana, India',
  whatsapp: SOCIAL_LINKS.whatsapp,
  linkedin: SOCIAL_LINKS.linkedin,
  medium: SOCIAL_LINKS.medium,
};
