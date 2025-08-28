import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  base: "/anywear-wireframe/",
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
