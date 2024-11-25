import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      global: "rollup-plugin-polyfill-node/polyfills/global.js",
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
