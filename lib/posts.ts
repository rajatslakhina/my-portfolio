export interface Post {
  slug: string
  category: string
  title: string
  date: string
  readTime: string
  excerpt: string
  content: string
}

export const STATIC_POSTS: Post[] = [
  {
    slug: "ai-first-engineering-teams",
    category: "ai",
    title: "AI-First Engineering: Building Teams That Actually Ship with LLMs",
    date: "March 2026",
    readTime: "8 min read",
    excerpt:
      "Most teams add AI tools but never change how they work. Here's how I restructured a 12-engineer mobile team around LLMs — and cut feature cycle time by 35%.",
    content: `
<p>When I first introduced AI tooling to my team at ThoughtWorks, I made the classic mistake: I handed everyone a GitHub Copilot licence and called it "AI-First." Six months later, adoption was around 20% and the productivity numbers were flat.</p>

<p>The problem wasn't the tools. It was that we'd layered AI on top of an unchanged engineering culture. Real AI-First development requires rethinking workflows from the ground up.</p>

<h2>What AI-First Actually Means</h2>

<p>AI-First doesn't mean using AI for autocomplete. It means designing your engineering process so that LLMs are a first-class participant at every stage — planning, coding, reviewing, testing, and documentation.</p>

<p>On my team, that meant four structural changes:</p>

<ol>
  <li><strong>Spec-first development:</strong> Engineers write a detailed spec before any code. The spec is fed to the LLM to generate a first draft. The human's job becomes review and refinement, not blank-page generation.</li>
  <li><strong>Prompt libraries as team assets:</strong> We maintain a shared repository of prompts for our most common tasks — architecture review, test generation, PR descriptions. Onboarding now takes days, not weeks.</li>
  <li><strong>AI in code review:</strong> Every PR runs through an automated LLM review before a human sees it. Trivial comments (naming, formatting, obvious bugs) get resolved before the reviewer opens the diff.</li>
  <li><strong>Weekly AI retrospectives:</strong> Every sprint retro includes 10 minutes on AI usage. What worked? What hallucinated? What prompt improved this week? This turns individual learning into team learning.</li>
</ol>

<h2>The Results</h2>

<p>After 3 months of this structure, feature development time dropped 35%. More importantly, junior engineers started contributing at a senior level because they could lean on LLMs to close knowledge gaps in real time.</p>

<p>The biggest unlock was psychological. Once engineers stopped seeing AI as a cheat code and started seeing it as a junior pair-programmer they were responsible for supervising, quality went up across the board.</p>

<h2>What Doesn't Work</h2>

<p>LLMs still fail badly at cross-system context. When a bug spans five microservices with three years of architectural drift, no prompt will save you. These are still deeply human problems.</p>

<p>Also: AI-generated code reviewed by someone who doesn't understand it is the most dangerous code in your codebase. The speed gains are real. The oversight requirement is equally real.</p>

<h2>For Engineering Managers</h2>

<p>If you're leading a team, your job isn't to pick the right AI tools. It's to create the conditions where your engineers develop taste about when to trust AI output and when to override it. That's a culture problem, not a tooling problem.</p>

<p>Start with one workflow. Make it structured. Measure it. Share the results. Then expand.</p>
    `.trim(),
  },
  {
    slug: "engineering-managers-must-understand-ai",
    category: "leadership",
    title: "Why Engineering Managers Can't Outsource AI Literacy to Their Teams",
    date: "February 2026",
    readTime: "6 min read",
    excerpt:
      "I've seen managers who treat AI as their team's problem. That works until it doesn't. Here's why EM-level AI fluency is now a career-critical skill.",
    content: `
<p>I had a conversation last year with an EM at a Series B company who told me, "My team handles the AI stuff. I focus on the people and the roadmap." I understood the instinct. Delegation is a core management skill.</p>

<p>But AI fluency is different. It's not a domain skill like database optimisation or frontend performance that you can safely specialise away. It's becoming the substrate on which all engineering decisions get made.</p>

<h2>The Compounding Cost of AI Ignorance</h2>

<p>When you don't understand how LLMs work, you can't:</p>

<ul>
  <li>Accurately estimate work that involves AI-assisted development</li>
  <li>Identify when your team is over-trusting AI output in critical paths</li>
  <li>Make informed build-vs-buy decisions for AI features</li>
  <li>Protect your team from unrealistic stakeholder expectations about what AI can do</li>
  <li>Evaluate whether your engineers are growing or becoming dependent</li>
</ul>

<p>Each of these is a core EM responsibility. None of them require you to write prompts daily. But all of them require conceptual fluency.</p>

<h2>The 80/20 of AI Literacy for EMs</h2>

<p>You don't need to understand transformer architecture. You need to understand:</p>

<ol>
  <li><strong>Context windows and why they matter</strong> — this explains 80% of why AI tools behave inconsistently on large codebases.</li>
  <li><strong>Hallucination as a structural property</strong> — LLMs don't know what they don't know. This shapes how you design review processes.</li>
  <li><strong>The cost of prompt engineering at scale</strong> — individual prompts are cheap; maintaining a library of high-quality prompts across a team is an engineering investment.</li>
  <li><strong>Evaluation is the hard part</strong> — generating AI output is easy. Knowing if it's good requires domain knowledge the LLM doesn't have.</li>
</ol>

<h2>A Practical Starting Point</h2>

<p>Spend two weeks using AI tools the way your team uses them. Not experimenting in isolation — actually using them on real work. Write a spec with an LLM. Review AI-generated code. Ask it to explain a piece of your codebase it's never seen.</p>

<p>You will immediately understand your team's friction points in a way no report will ever show you.</p>

<p>The managers who will lead the best teams in the next five years aren't the ones who know the most about AI. They're the ones who are curious enough to stay one step ahead of where their teams are today.</p>
    `.trim(),
  },
  {
    slug: "building-high-performance-mobile-teams",
    category: "leadership",
    title: "Building High-Performance Mobile Teams: What 10 Years Taught Me",
    date: "January 2026",
    readTime: "10 min read",
    excerpt:
      "Team health predicts product quality better than any technical metric. Here's the framework I've used to build, scale, and retain iOS engineering teams across three continents.",
    content: `
<p>I've built mobile teams from scratch twice and inherited broken ones three times. The hardest lesson took me about four years to fully internalise: the quality of the software is a lagging indicator of the health of the team that built it.</p>

<p>If your app has chronic performance problems, you probably have a team with unclear ownership. If releases are consistently late, you probably have a team that doesn't feel safe flagging risks early. If senior engineers keep leaving, you almost certainly have a manager who conflates technical decisions with power.</p>

<h2>The Foundation: Psychological Safety in Technical Discussions</h2>

<p>Mobile engineering, especially iOS, has an unusually high proportion of engineers who've worked in isolation for long stretches — solo contractors, small agency teams, single-platform specialists. This makes the default culture surprisingly opinionated and surprisingly brittle.</p>

<p>The first thing I do with any new team is establish a norm I call "disagree out loud, commit in writing." Engineers can challenge any technical decision, but once a direction is chosen, everyone documents why and ships it together. This surfaces hidden concerns before they become passive-aggressive code reviews.</p>

<h2>Hiring for Coachability Over Current Skill</h2>

<p>iOS moves fast. SwiftUI replaced UIKit conventions in three years. Swift Concurrency is still not fully adopted five years in. If you hire for what someone knows today, you're optimising for yesterday.</p>

<p>In interviews, I ask engineers to walk me through a time they were confidently wrong about something technical. The answer tells me more than any LeetCode problem. Engineers who can tell that story clearly — and laugh about it — are engineers I can develop.</p>

<h2>The Mentorship Multiplier</h2>

<p>At ThoughtWorks, I ran an informal mentorship programme where every senior engineer was paired with a junior for one dedicated hour per week, focused only on their growth — not their current ticket. Twelve months in, three juniors had been promoted to mid-level. Retention was 100% among the mentored group.</p>

<p>The ROI on structured mentorship is the highest of any investment I've made as an EM. It also makes your senior engineers better, because teaching forces clarity.</p>

<h2>On Technical Debt and Team Morale</h2>

<p>Unaddressed technical debt demoralises engineers faster than anything except bad management. When engineers spend more time working around old decisions than building new things, they start updating their LinkedIn profiles.</p>

<p>I budget 20% of every sprint for debt reduction and platform work. Non-negotiable. Product managers push back initially and stop pushing back after the first quarter where releases consistently hit their dates.</p>
    `.trim(),
  },
  {
    slug: "ios-architect-to-engineering-manager",
    category: "leadership",
    title: "From iOS Architect to Engineering Manager: What Nobody Tells You",
    date: "December 2025",
    readTime: "7 min read",
    excerpt:
      "The hardest part of moving into EM wasn't learning to manage people. It was unlearning the habit of solving every technical problem myself.",
    content: `
<p>Three years ago, I was the person on my team who knew the most about our iOS codebase. That felt like an asset. When I moved into an EM role, I discovered it was also a liability.</p>

<p>The transition from architect to manager is, at its core, a transition from individual excellence to collective enablement. Most engineers understand this intellectually. Almost none of us are prepared for how it feels.</p>

<h2>The Expert Trap</h2>

<p>In your first weeks as an EM, your natural instinct is to add value the way you always have: by solving hard technical problems. You review architecture, you pair on the difficult tickets, you jump into production incidents.</p>

<p>This feels productive. It is actually damaging. Every time you solve a problem your team could have solved, you're:</p>

<ul>
  <li>Depriving them of a growth opportunity</li>
  <li>Signalling that you don't trust their judgment</li>
  <li>Creating a dependency that doesn't scale</li>
  <li>Spending time on work that's no longer your job</li>
</ul>

<p>The shift I had to make was from "how do I solve this?" to "who on my team is best placed to solve this, and what do they need from me to do it well?"</p>

<h2>What You Actually Spend Your Time On</h2>

<p>Nobody prepared me for how much of EM work is about information — gathering it, filtering it, and routing it to the right people at the right time. You become the connective tissue between engineering, product, design, and business.</p>

<p>A typical week for me looks like: two one-on-ones per day, one cross-functional meeting, one sprint ceremony, two to three async threads I need to unblock, and some amount of writing — specs, strategy docs, feedback, career development plans.</p>

<p>The coding is 10% at most. Be honest with yourself about whether that's okay before you make the move.</p>

<h2>The Things That Make It Worth It</h2>

<p>There's a specific feeling I've never found in technical work: watching an engineer you've invested in solve a problem they couldn't have solved six months ago. That's not a small thing. That's compounding human capital.</p>

<p>The leverage of a great EM is an order of magnitude higher than the leverage of a great individual contributor. Your ceiling as an architect is the quality of your own work. Your ceiling as an EM is the quality of ten people's work.</p>

<p>If you're good at it — if you genuinely care about other people's growth and are willing to do the unglamorous work of creating conditions for it — EM is one of the highest-leverage roles in technology.</p>
    `.trim(),
  },
  {
    slug: "prompt-engineering-culture",
    category: "ai",
    title: "The Engineering Manager's Guide to Building a Prompt Engineering Culture",
    date: "November 2025",
    readTime: "5 min read",
    excerpt:
      "Individual prompt skills don't compound. Team prompt culture does. Here's how to turn scattered AI experiments into an organisational capability.",
    content: `
<p>Every engineering team I speak to has a few engineers who are exceptionally good at getting useful output from LLMs. The same teams have engineers who've tried AI tools twice, got hallucinated nonsense, and concluded that AI is overhyped.</p>

<p>The gap between these two groups isn't intelligence or seniority. It's exposure and practice. And as an EM, closing that gap is your job.</p>

<h2>Why Individual Skill Doesn't Scale</h2>

<p>When prompt expertise lives in one or two engineers' heads, you have a tribal knowledge problem. The expert gets consulted on everything AI-related, becomes a bottleneck, and eventually burns out or leaves. Their knowledge walks out with them.</p>

<p>Team capability only compounds when knowledge is externalised, tested, and shared systematically.</p>

<h2>Building the Infrastructure</h2>

<p>The foundation is a shared prompt library — a repository in your version control system where engineers contribute, review, and improve prompts the same way they would code. Each prompt has:</p>

<ul>
  <li>A clear description of what it does and when to use it</li>
  <li>Example inputs and outputs</li>
  <li>Known failure modes</li>
  <li>A changelog when it's updated</li>
</ul>

<p>This sounds bureaucratic. In practice it takes 30 minutes to set up and saves hours per engineer per month.</p>

<h2>The Cultural Layer</h2>

<p>Infrastructure without culture doesn't work. The cultural change required is making AI usage visible and discussable.</p>

<p>I added a standing item to our sprint retros: "AI wins and losses this week." Engineers share a prompt that worked well or a case where AI confidently led them in the wrong direction. Both are valuable. The losses especially — they build the team's collective intuition about where LLMs can and can't be trusted.</p>

<h2>Measuring It</h2>

<p>You can't manage what you don't measure, but be careful what you measure. Tracking "AI usage" creates perverse incentives. Instead, track outcomes: time from spec to first reviewable PR, proportion of PR comments that are substantive vs. trivial, onboarding time for new engineers.</p>

<p>If your AI culture is working, these numbers move. If they don't, you have more signal to investigate with.</p>
    `.trim(),
  },
]

export function getAllPosts(): Post[] {
  return STATIC_POSTS
}

export function getPostBySlug(category: string, slug: string): Post | undefined {
  return STATIC_POSTS.find(p => p.category === category && p.slug === slug)
}
