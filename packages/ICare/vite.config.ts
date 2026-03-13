import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import Module from "node:module";

const originalResolveFilename = Module._resolveFilename;

// `sass-embedded` is currently crashing during production builds on this setup.
// Force Vite to fall back to the plain `sass` package instead.
Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  if (request === "sass-embedded") {
    const error = new Error("Cannot find module 'sass-embedded'");
    // @ts-expect-error internal Node error shape
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
      "@styles": path.resolve(__dirname, "app/styles"),
      // you can add more aliases here if you like
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // strips `/api`
      },
    },
  },
});
