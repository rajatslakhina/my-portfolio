# Portfolio Patterns

## Session 2026-03-22 (UI polish)

- When canvas-based animation (matrix rain, dark fill per frame) exists in a dark-mode component → gate canvas rendering behind `isDark` check using `useTheme()` + `mounted` state guard, because canvas fills with dark rgba colors create an opaque dark overlay on top of the light background, making the page unreadable.

- When adding light mode CSS vars to a site with glass/backdrop-blur UI → replace `bg-card/opacity` transparency with solid `bg-card` in light mode overrides, and set visible borders (`border-primary/25+`), because `bg-card/60` on a white background is invisible white-on-white — all section distinction is lost.

- When using `useTheme()` from next-themes in a component that does any visual/DOM work → always add `const [mounted, setMounted] = useState(false)` + `useEffect(() => setMounted(true), [])` guard, and use `const isDark = !mounted || theme !== 'light'` as fallback, because SSR hydrates before theme resolves and will throw mismatch errors or flash wrong theme.

- When `NEXT_PUBLIC_*` env var controls a client-side UI feature → always create `.env.local` with the var set to enable local testing, because NEXT_PUBLIC vars are inlined at build time — an unset var at build = the feature is permanently disabled regardless of any runtime logic.

## Session 2026-03-22 — polish #2

- When CSS vars serve dual purpose (text-readable dark values + vivid gradient buttons) → explicitly override gradient utility classes in `.light {}` with fixed colour values (not CSS vars), because a single `--primary` var cannot be both dark enough for white-bg text contrast AND vivid enough for gradient button aesthetics.

- When embedding a PDF in an iframe is blocked by X-Frame-Options → `fetch('/resume.pdf')` the file as a blob, then `URL.createObjectURL(blob)` and pass the blob URL to the iframe `src`. Blob URLs are treated as same-origin and are completely exempt from X-Frame-Options and `frame-ancestors` CSP directives.

- When iframe PDF rendering fails → do NOT switch to `<object type="application/pdf">` as the fix. Chrome 100+ removed the PDF NPAPI plugin; `<object>` shows the same broken icon. The correct fix is always the response headers or the blob URL workaround, not the element type.

- When building filter UIs (category + search) → key the animated grid container to `\`\${activeCategory}-\${searchQuery}\`` so AnimatePresence triggers exit/enter animations on every filter change; derive category list dynamically from data with Set deduplication rather than maintaining a separate constant.
