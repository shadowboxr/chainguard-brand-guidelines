import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard multi-file build: emits dist/index.html plus hashed, cacheable
// assets (JS, CSS, and the woff2 fonts) under dist/assets. Served by Vercel.
// Hash routing means no rewrite/SPA-fallback config is needed.
export default defineConfig({
  plugins: [react()],
});
