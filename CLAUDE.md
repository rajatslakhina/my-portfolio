# Claude Repository Context

This repository contains the personal portfolio website of Rajat Lakhina.

Tech stack:
- Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Vercel deployment

Engineering principles:
- Clean architecture
- Reusable UI components
- Accessibility-first design
- Performance optimized
- Mobile-first responsive layouts

Guidelines for Claude:

1. Never create duplicate components.
2. Follow existing project structure.
3. Use TypeScript strictly.
4. Components must be reusable.
5. Avoid inline styles — use Tailwind.
6. Optimize images and bundle size.
7. Follow semantic HTML.
8. Ensure Lighthouse score >90.

When adding pages:
- Use app router conventions
- Create reusable sections
- Maintain consistent spacing and typography.

When adding components:
- Place them in `/components`
- Use props interfaces
- Avoid unnecessary state.

Always check:
- lint
- type safety
- build success
- responsiveness