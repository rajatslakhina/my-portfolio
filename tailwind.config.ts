import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

const config = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        sans:  ['var(--font-sans)',  'Inter',            'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        mono:  ['var(--font-mono)',  'JetBrains Mono',   'monospace'],
      },
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary:    { DEFAULT: 'hsl(var(--primary))',    foreground: 'hsl(var(--primary-foreground))' },
        secondary:  { DEFAULT: 'hsl(var(--secondary))',  foreground: 'hsl(var(--secondary-foreground))' },
        destructive:{ DEFAULT: 'hsl(var(--destructive))',foreground: 'hsl(var(--destructive-foreground))' },
        muted:      { DEFAULT: 'hsl(var(--muted))',      foreground: 'hsl(var(--muted-foreground))' },
        accent:     { DEFAULT: 'hsl(var(--accent))',     foreground: 'hsl(var(--accent-foreground))' },
        popover:    { DEFAULT: 'hsl(var(--popover))',    foreground: 'hsl(var(--popover-foreground))' },
        card:       { DEFAULT: 'hsl(var(--card))',       foreground: 'hsl(var(--card-foreground))' },
        whatsapp:   'hsl(var(--whatsapp))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'neon-primary':  '0 0 20px hsl(var(--primary)/0.4),   0 0 60px hsl(var(--primary)/0.15)',
        'neon-secondary':'0 0 20px hsl(var(--secondary)/0.4), 0 0 60px hsl(var(--secondary)/0.15)',
        'neon-accent':   '0 0 20px hsl(var(--accent)/0.4),    0 0 60px hsl(var(--accent)/0.15)',
        'card-hover':    '0 20px 60px rgba(0,0,0,0.5), 0 0 30px hsl(var(--primary)/0.1)',
      },
      backgroundImage: {
        'gradient-neon':   'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
        'gradient-neon-r': 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--accent)))',
        'gradient-card':   'linear-gradient(135deg, hsl(var(--primary)/0.06), hsl(var(--secondary)/0.06))',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        blob:         { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(22px,-16px) scale(1.07)' }, '66%': { transform: 'translate(-14px,16px) scale(0.95)' } },
        float:        { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-18px)' } },
        'spin-slow':  { to: { transform: 'rotate(360deg)' } },
        'pulse-glow': { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        shine:        { from: { transform: 'translateX(-100%) skewX(-12deg)' }, to: { transform: 'translateX(220%) skewX(-12deg)' } },
        'scroll-bounce': { '0%,100%': { transform: 'translateY(0)', opacity: '0.5' }, '50%': { transform: 'translateY(8px)', opacity: '1' } },
      },
      animation: {
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        blob:              'blob 7s infinite ease-in-out',
        float:             'float 5s ease-in-out infinite',
        'spin-slow':       'spin-slow 12s linear infinite',
        'pulse-glow':      'pulse-glow 2.5s ease-in-out infinite',
        shine:             'shine 0.6s ease-in-out',
        'scroll-bounce':   'scroll-bounce 1.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    }
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config

export default config
