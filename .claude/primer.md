# My Portfolio — Project Primer

## Current Task
None — full content/UI overhaul completed and pushed to main.

## Last Session
**2026-03-22** — Full portfolio redesign: real projects, hero avatar fallback, about section redesign, skills update, blog fix, CV download fix, commit/push resolved Unicode path mismatch.

## What Was Completed This Session

### Content & Data
- `constants/index.ts`: All experience entries corrected with real CV data — TeleMessage (6mo), REA Real Estate (9mo), PepsiCo Super App, Khulke (13mo), SC Next Gen Banking (18mo), Airtel Payment Bank (28mo), VegPlatter, Biyah, Buzz App
- `public/resume.pdf`: Created `public/` directory, copied real PDF — fixes 404 on CV download

### Components
- `HeroSection.tsx`: Added `AnimatedMonogram` SVG component — hex grid background, two counter-rotating rings, orbiting particles, scan line sweep, gradient "RL", HUD corner brackets; changed tagline → "Senior Consultant · iOS"
- `AboutSection.tsx`: Full redesign — 4 stat cards with sub-labels, bio with colored highlights, 3 status pills, 6 competency cards (2×3), Engineering Philosophy panel with left accent bar (fixed readability)
- `ProjectsSection.tsx`: Replaced placeholder data with 6 real projects; domain filter tabs (All/Fintech/Real Estate/Social/Messaging/FMCG); AnimatePresence animated grid; App Store links
- `SkillsSection.tsx`: Removed Kotlin; added Combine (88%), Core Data (85%), AVFoundation (82%)
- `components/ui/tabs.tsx`: Added `style?: React.CSSProperties` to TabsTrigger

### Blog
- `app/(main)/blog/page.tsx`: Fixed GitHub repo → `rajatslakhina/AI-Knowledge`; multi-path fallback (posts/, articles/, blog/, root); fetches raw MD for real H1 title + excerpt

### Git Infrastructure Fix
- Root cause: Two directories with Unicode apostrophe mismatch (U+2019 vs U+0027). Edits land in U+0027 path, git repo lives in U+2019 path.
- Fix: Python subprocess with explicit U+2019 path for all git operations; copy files between paths before committing.

## Open Questions / Next Steps
- Verify Vercel deployment picks up all changes (especially public/resume.pdf and ProjectsSection animated filter)
- Check if blog articles from AI-Knowledge repo are now rendering correctly in production
- Consider adding a dedicated /projects page if Projects section grows beyond 6 cards

## Switch Context Notes
- CRITICAL: Two directories with same display name, different Unicode apostrophe (U+2019 `’` vs U+0027 `'`). Git repo is at U+2019 path. For any git operations use Python subprocess with explicit U+2019 in path.
- All .claude/ agents/commands at U+2019 path
- Blog GitHub repo: `rajatslakhina/AI-Knowledge` (not rajatlakhina/AIKnowledge)
- Resume PDF: `public/resume.pdf` — must exist at U+2019 path
