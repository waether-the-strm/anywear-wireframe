import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Automatyczne ustawianie base URL w zależności od środowiska (Vite way)
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  root: ".",
  base: mode === "development" ? "/" : "/anywear-wireframe/",
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
