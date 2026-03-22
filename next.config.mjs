/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control',  value: 'on' },
          { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://*.vercel-analytics.com; frame-src 'self'; frame-ancestors 'self';",
          },
        ],
      },
      // Allow resume PDF to render inline in our own viewer
      {
        source: '/resume.pdf',
        headers: [
          { key: 'Content-Type',        value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'inline; filename="RajatLakhina_CV.pdf"' },
          { key: 'X-Frame-Options',     value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
