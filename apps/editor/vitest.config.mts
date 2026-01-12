import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "components": path.resolve(__dirname, "../../packages/ui/src/components"),
      "types": path.resolve(__dirname, "../../packages/ui/src/types"),
      "utils": path.resolve(__dirname, "../../packages/ui/src/utils"),
      "hooks": path.resolve(__dirname, "../../packages/ui/src/hooks"),
      "context": path.resolve(__dirname, "../../packages/ui/src/context"),
    },
  },
});
