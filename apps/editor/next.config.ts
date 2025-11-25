import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // 배포에 필요한 파일만 모아줍니다
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
