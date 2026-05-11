import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/((?!_next/static).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=60, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
