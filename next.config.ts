import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
// next.config.js
module.exports = {
  allowedDevOrigins: ['192.168.137.1'],
}