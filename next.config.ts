import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [],
    qualities: [75, 80],
  },
  outputFileTracingIncludes: {
    "/*": ["./node_modules/pg-cloudflare/dist/**/*"],
  },
  allowedDevOrigins: ["192.168.137.1"],
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
