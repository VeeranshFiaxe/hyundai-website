import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgd.aeplcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bunny-wp-pullzone-cghvklkcns.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "www.hyundai.com",
      },
    ],
  },
};

export default nextConfig;
