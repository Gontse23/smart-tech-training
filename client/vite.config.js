import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://smart-tech-training-api.onrender.com"
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
