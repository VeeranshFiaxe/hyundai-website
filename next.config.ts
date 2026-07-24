import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    qualities: [75, 80],
  },
  allowedDevOrigins: ["192.168.137.1"],
};

export default nextConfig;
