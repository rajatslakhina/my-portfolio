# My Portfolio — Project Primer

## Current Task
None — polish pass #2 completed and pushed to main.

## Last Session
**2026-03-22** — Light mode gradient fix, blog title cleanup, blog category filters, resume viewer blob URL fix.

## What Was Completed This Session

### Light mode gradient buttons
- `app/globals.css`: Added `.light .bg-gradient-neon`, `.light .bg-gradient-neon-r`, `.light .text-gradient` overrides with vivid fixed colours (not CSS var-derived). Root cause: darkening `--primary/--secondary` for text readability made gradient buttons muddy.

### Blog title prefix stripping
- `app/(main)/blog/page.tsx`: Added `.replace(/^(article|chapter|part|section)\s+\d+:\s*/i, "")` after H1 extraction. Removes "Article 1:", "Chapter 2:", etc. from all GitHub markdown titles.

### Blog category filter
- `components/sections/BlogGrid.tsx`: Full rewrite — category chips auto-derived from posts, stagger AnimatePresence on tab switch, combined category + search, "X / total" count, Clear button, empty state shows which filters produced zero results.

### Resume viewer — blob URL fix
- `components/ui/resume-viewer.tsx`: Full rewrite. `fetch('/resume.pdf')` → `URL.createObjectURL(blob)` → `<iframe src={blobUrl}>`. Blob URLs bypass X-Frame-Options entirely. Loading spinner while fetching, Download+Open fallback on error.
- `next.config.mjs`: Changed global `X-Frame-Options: DENY` → `SAMEORIGIN`, `frame-ancestors 'none'` → `'self'`, added `/resume.pdf` specific headers with `Content-Type: application/pdf` + `Content-Disposition: inline`, fixed CSP to allow Vercel Analytics connections.

## Open Blockers / Next Steps
- User needs to **restart dev server** (`npm run dev`) to pick up config + component changes — old server (PID 47336) still running with old headers
- `public/rajat-profile.webp` still missing — HeroSection shows empty circle (user needs to add profile photo)
- `NEXT_PUBLIC_OPEN_TO_WORK=true` set in `.env.local` for dev; needs Vercel dashboard env var for production

## Switch Context Notes
- CRITICAL: git repo at U+2019 apostrophe path. Use Python subprocess for ALL git ops.
- Banner: `.env.local` has `NEXT_PUBLIC_OPEN_TO_WORK=true` (local dev). Set same in Vercel for prod.
- Analytics: `@vercel/analytics` + `@vercel/speed-insights` in layout.tsx. View at vercel.com → Analytics.
