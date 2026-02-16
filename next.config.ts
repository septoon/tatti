import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable Next.js image optimization to let the client load CDN assets directly
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i1.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i2.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i3.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.tatti-shef.ru",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
