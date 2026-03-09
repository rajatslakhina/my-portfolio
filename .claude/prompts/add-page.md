Add a new page to the portfolio:

1. Create the route file at `app/(main)/$ARGUMENTS/page.tsx`
2. Create a corresponding section component in `components/sections/`
3. Add any content data to `constants/index.ts`
4. Wrap the section with `SectionWrapper` from `@/components/shared/SectionWrapper`
5. Add the route to `NAV_LINKS` in `constants/index.ts`
6. Add the route to `app/sitemap.ts`
7. Run `npm run build` to verify no type errors
8. Run `npm run lint` to check for lint issues
