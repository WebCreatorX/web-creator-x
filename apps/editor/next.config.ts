import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // 배포에 필요한 파일만 모아줍니다
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 개발 편의를 위해 모든 도메인 허용 (운영 배포시에는 특정 도메인으로 제한)
      },
    ],
  },
};

export default nextConfig;
