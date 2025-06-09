import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "electron/main.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: [
        "electron",
        "electron-is-dev",
        "path",
        "fs",
        "url",
        "crypto",
        "stream",
        "http",
        "https",
        "zlib",
        "os",
        "child_process",
      ],
    },
  },
});
