/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { coverageConfigDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "127.0.0.1",
    watch: {
      usePolling: true // Enable polling for hot reload
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["./src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      exclude: ["**/custom-pattern/**", ...coverageConfigDefaults.exclude],
      provider: "istanbul"
    },
    setupFiles: ["./src/setupTests.ts"]
  }
});
