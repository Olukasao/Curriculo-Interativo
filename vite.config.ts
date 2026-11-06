import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:8787" },
  },
  build: {
    target: "es2022",
    // three.js is ~530 kB but loads lazily, only when the expertise section approaches.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) return "motion";
          if (id.includes("node_modules/react")) return "react";
        },
      },
    },
  },
});
