Review the current changes before committing:

1. Run `npm run build` — confirm zero type errors and successful build
2. Run `npm run lint` — confirm zero lint warnings or errors
3. Run `npx prettier --check .` — confirm formatting is consistent
4. Check `git diff --stat` for unintended file changes
5. Verify no hardcoded content exists outside `constants/index.ts`
6. Confirm no `any` types were introduced
7. If new pages were added, verify `sitemap.ts` and `NAV_LINKS` are updated
8. Summarize findings and flag any issues
