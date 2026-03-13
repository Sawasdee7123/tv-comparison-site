/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment configuration
  output: 'standalone', // Optimized for Vercel serverless

  // Optimize for production
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,

  // Images
  images: {
    unoptimized: true, // Use when not using image optimization service
  },

  // Enable experimental features if needed
  // experimental: {
  //   serverComponentsExternalPackages: ['@supabase/supabase-js'],
  // },
}

module.exports = nextConfig