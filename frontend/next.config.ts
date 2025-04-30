import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'unsplash.com'],
  },
};

export default nextConfig;
