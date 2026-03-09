# Portfolio Component Conventions

## Section Components (`components/sections/`)

Every section component follows this pattern:

```tsx
'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { RELEVANT_DATA } from '@/constants';

export function ExampleSection() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Section content using data from constants */}
      </motion.div>
    </SectionWrapper>
  );
}
```

Key rules:
- Always `'use client'` — sections use Framer Motion
- Always wrap in `SectionWrapper` for consistent spacing
- Pull all text/data from `constants/index.ts`
- Use `motion.div` with `whileInView` for scroll-triggered animations
- Set `viewport={{ once: true }}` so animations don't replay
- Use `cn()` for conditional Tailwind classes
- Use shadcn/ui primitives (`Card`, `Button`, `Tabs`, etc.) for interactive elements
