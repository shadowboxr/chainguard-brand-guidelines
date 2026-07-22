import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Emits one self-contained dist/index.html — JS, CSS, and fonts all inlined,
// no external requests, works over file://. Routing stays hash-based so deep
// links keep working when served as a static file.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    assetsInlineLimit: 100000000, // inline everything (fonts, svg, etc.)
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100000,
  },
});
