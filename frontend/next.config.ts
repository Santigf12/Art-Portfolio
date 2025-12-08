import type { NextConfig } from "next";

const strapiPublic = process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL || "http://localhost:1337";
const u = new URL(strapiPublic);

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    // If you are serving Strapi uploads publicly (recommended):
    remotePatterns: [
      {
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        port: u.port || undefined,
        pathname: "/uploads/**",
      },
    ],

    // In dev you can keep unoptimized if you want
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;