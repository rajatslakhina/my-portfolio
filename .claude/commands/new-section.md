---
description: End-to-end workflow for adding a new section to the portfolio site
---

# /new-section — Add New Portfolio Section

Full pipeline: design → architecture → implement → test → performance check.

---

## Step 1: Gather intent

Ask the user:
1. What is the section name and purpose? (e.g. "Testimonials — recommendations from colleagues")
2. Where in the page does it sit? (above/below which existing section)
3. Is there a reference design, screenshot, or inspiration URL?

---

## Step 2: UI/UX design

Invoke `ui-ux-pro-max:ui-ux-pro-max` with action `plan`:

Provide this context to the skill:
- Stack: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
- Style: Dark-only, terminal/tech aesthetic
- Breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop)
- Existing sections: `components/sections/` — review for visual consistency

Ask the skill to produce:
- Component structure (what sub-components are needed)
- Visual hierarchy and spacing
- Animation approach (entry, scroll-linked, or none)
- Responsive layout strategy

---

## Step 3: Architecture review

Invoke `frontend-architect` agent with the UI/UX output. ADR must cover:
- Server Component vs Client Component decision — justify every `"use client"`
- Animation strategy — Framer Motion variants + `useReducedMotion` plan
- Performance impact — does this section affect LCP, CLS, or INP?
- Accessibility plan — keyboard nav, ARIA roles, focus management, reduced motion alternative
- File location: `components/sections/{SectionName}Section.tsx`

Present ADR → get approval before proceeding.

---

## Step 4: Implement (Layer B + C in parallel)

**Layer B — `tl-nextjs`:**
- Create `components/sections/{SectionName}Section.tsx`
- Server Component unless event listeners / hooks / Framer Motion required
- Tailwind classes only — no inline styles, no hardcoded hex/rgb
- Every animation: `const shouldReduce = useReducedMotion()` before any `variants`
- `next/image` for all images — never `<img>`
- Keep component ≤ 200 lines — split into sub-components if needed

**Layer C — `qa-frontend` (run in parallel with B):**
- Vitest unit test for any logic in the component
- Playwright test: renders correctly + reduced motion variant renders correctly
- axe-playwright: no new accessibility violations
- 95% coverage on any non-presentational logic

---

## Step 5: Performance gate

Invoke `core-web-vitals` (Layer G):
- Does this section appear above the fold? → LCP risk if it contains images
- Dynamic content without fixed dimensions? → CLS risk
- Canvas or scroll-linked animation? → INP risk on low-end devices
- Any new font loaded? → must use `next/font`, not `@import`

---

## Step 6: Validate

```bash
.claude/validate.sh
```

All 10 gates must pass before PR.

---

## Step 7: PR checklist

- [ ] Screenshots at 375px, 768px, 1440px
- [ ] Screen recording: normal motion + reduced motion (`prefers-reduced-motion: reduce`)
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1 (attach screenshot)
- [ ] axe DevTools: no new violations
- [ ] PR description: what section, design decisions, which existing sections it follows
