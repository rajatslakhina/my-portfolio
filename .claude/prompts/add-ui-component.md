Add a shadcn/ui component to the project:

1. Run `npx shadcn@latest add $ARGUMENTS`
2. The component will be installed to `components/ui/`
3. DO NOT manually edit the generated file — customization goes in consuming components
4. Import using `@/components/ui/<component-name>`
5. Use the `cn()` helper from `@/lib/utils` for any conditional class merging
6. Run `npm run build` to verify the new component compiles correctly
