export interface CaseStudy {
  slug:        string;
  title:       string;
  client:      string;
  company:     string;
  duration:    string;
  domain:      string;
  tagline:     string;
  liveUrl?:    string;
  tags:        string[];
  overview:    string;
  problem:     string;
  solution:    string;
  architecture: string;
  outcomes:    string[];
  stub?:       boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug:     "rea-real-estate",
    title:    "REA Real Estate iOS",
    client:   "realestate.com.au",
    company:  "ThoughtWorks",
    duration: "9 months · 2024",
    domain:   "Real Estate",
    tagline:  "Architecting Australia's #1 property discovery platform in SwiftUI",
    liveUrl:  "https://apps.apple.com/au/app/realestate-com-au-property/id404667893",
    tags:     ["SwiftUI", "CoreData", "Maps", "Clean Architecture", "MVVM"],
    overview:
      "realestate.com.au is Australia's #1 property platform with millions of active users. As iOS architect at ThoughtWorks, I owned the SwiftUI migration and feature delivery for property discovery, listings, and user profiles.",
    problem:
      "The existing UIKit codebase had grown organically over a decade — tightly coupled modules, inconsistent data flow, and a map experience that couldn't handle high-density property clusters at scale without performance degradation.",
    solution:
      "I designed a modular SwiftUI architecture with clear ownership boundaries per feature domain. For the map experience, I built a clustering algorithm using quadtree partitioning that dynamically groups pins based on zoom level, with smooth annotation transitions. Data flow was standardised through a reactive pipeline using Combine, eliminating the prop-drilling that was causing stale UI in the listings feed.",
    architecture:
      "Feature modules each own their data layer (Repository pattern), ViewModel (ObservableObject/Combine), and SwiftUI views. Navigation is handled by a Coordinator that owns routing between modules. Shared infrastructure (networking, caching, analytics) lives in a separate Core framework imported by each feature module.",
    outcomes: [
      "15% increase in user engagement post-launch",
      "Map clustering reduced rendering frames from 80ms to <16ms on high-density areas",
      "Modular architecture reduced cross-team merge conflicts by ~60%",
      "3 junior engineers upskilled to SwiftUI ownership within 6 months",
    ],
  },
  {
    slug:     "sc-next-gen-banking",
    title:    "SC Next Gen Banking",
    client:   "Standard Chartered Singapore",
    company:  "Mobile Programming LLC",
    duration: "18 months · 2021–2023",
    domain:   "Fintech",
    tagline:  "Rebuilding mobile banking for 1M+ users across Singapore",
    liveUrl:  "https://apps.apple.com/sg/app/sc-mobile-singapore/id367337298",
    tags:     ["Swift", "UIKit", "MVVM", "Coordinator", "Banking SDK"],
    overview:
      "Standard Chartered's Next Gen Banking app is the primary mobile banking interface for over 1 million customers in Singapore. I was lead engineer and mentor on a 12-person iOS team, responsible for the profile, daily banking, and wealth management modules.",
    problem:
      "The legacy app had accumulated years of UIKit tech debt — deeply nested view controllers, untestable business logic mixed into UI, and a monolithic networking layer that made it impossible to reliably load balance across the banking backend. Task completion rates were below industry benchmarks.",
    solution:
      "Introduced MVVM with Coordinator navigation to enforce a clean separation between UI and business logic. Extracted the networking layer into a dedicated SDK with retry, timeout, and circuit-breaker logic. Rewrote the wealth module with a compositional data model that could handle the bank's complex product hierarchy (accounts, investments, insurance, FX).",
    architecture:
      "Each banking domain (Profile, Daily Banking, Wealth) is a self-contained module. Coordinators manage navigation flow and are injected at app startup. ViewModels are protocol-backed for testability. The shared Banking SDK handles auth token refresh, request signing, and error normalisation.",
    outcomes: [
      "35% improvement in usability scores and task completion rates",
      "20% reduction in defect rate after MVVM migration",
      "5 junior engineers mentored to senior-level ownership",
      "Zero production incidents in wealth module for 6 months post-launch",
    ],
  },
  { slug: "telemessage", title: "TeleMessage", client: "TeleMessage Inc.", company: "ThoughtWorks", duration: "6 months · 2024", domain: "Messaging", tagline: "Signal-based enterprise messaging with security automation", liveUrl: "https://apps.apple.com/us/app/tm-tlgrm/id1630122033", tags: ["Swift", "Signal Protocol", "Security"], overview: "", problem: "", solution: "", architecture: "", outcomes: [], stub: true },
  { slug: "pepsico-super-app", title: "PepsiCo Super App", client: "PepsiCo", company: "ThoughtWorks", duration: "2024", domain: "FMCG", tagline: "Modular FMCG platform architecture for distributor operations", tags: ["Swift", "Solution Architecture", "Modular"], overview: "", problem: "", solution: "", architecture: "", outcomes: [], stub: true },
  { slug: "khulke", title: "Khulke", client: "Khulke", company: "DTC Infotech", duration: "13 months · 2023–2024", domain: "Social", tagline: "Live streaming platform — UIKit to SwiftUI migration delivering $500K value", liveUrl: "https://apps.apple.com/in/app/khul-ke-social-networking-app/id1590836834", tags: ["SwiftUI", "UIKit", "WebRTC", "async/await"], overview: "", problem: "", solution: "", architecture: "", outcomes: [], stub: true },
  { slug: "airtel-payment-bank", title: "Airtel Payment Bank", client: "Airtel", company: "HCL Technologies", duration: "28 months · 2019–2021", domain: "Fintech", tagline: "Onboarding and payments — UIKit to SwiftUI delivering $500K performance gains", liveUrl: "https://apps.apple.com/in/app/airtel-thanks-recharge-bank/id543184334", tags: ["SwiftUI", "UIKit", "Payments", "IRCTC"], overview: "", problem: "", solution: "", architecture: "", outcomes: [], stub: true },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(c => c.slug === slug);
}
