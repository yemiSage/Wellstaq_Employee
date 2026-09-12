import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  // Vercel serves this app from the deployment origin. Root-absolute URLs keep
  // lazy chunks, the manifest and the service worker on the same stable scope.
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Activate each deployment immediately so an older service worker cannot
      // keep serving an index that points at chunks Vercel has already replaced.
      registerType: "autoUpdate",
      includeAssets: ["assets/figma/wellstaq-logo.png", "icons/favicon.svg", "icons/icon.svg", "icons/icon-maskable.svg"],
      manifest: {
        name: "Wellstaq Employee",
        short_name: "Wellstaq",
        description: "Your wellbeing, activity and workplace community in one calm space.",
        theme_color: "#FAFAF8",
        background_color: "#FAFAF8",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait-primary",
        // icon.svg/icon-maskable.svg are the actual full-size (512x512) app
        // icons — icon-maskable.svg alone has the safe-zone padding Android's
        // shaped-icon masks need. favicon.svg is a small 52px browser-tab
        // glyph with a plain white square background and was never designed
        // for a maskable crop, so it must not claim that purpose.
        icons: [
          { src: "/icons/icon.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
          { src: "/icons/icon-maskable.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://wellstaq-api-production.up.railway.app",
            handler: "NetworkOnly",
            method: "GET"
          }
        ]
      }
    })
  ],
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  server: { host: "127.0.0.1", port: 4173, strictPort: true, proxy: { "/api": { target: loadEnv(mode, process.cwd(), "VITE_").VITE_API_BASE_URL || "https://wellstaq-api-production.up.railway.app", changeOrigin: true, rewrite: (requestPath) => requestPath.replace(/^\/api/, "") } } },
  // Local production-build testing (`npm run preview`) hits the Railway API
  // directly with no proxy, which the backend's CORS policy rejects from
  // localhost. Mirror the dev proxy here so `npm run preview` works too.
  preview: { host: "0.0.0.0", port: 4173, proxy: { "/api": { target: loadEnv(mode, process.cwd(), "VITE_").VITE_API_BASE_URL || "https://wellstaq-api-production.up.railway.app", changeOrigin: true, rewrite: (requestPath) => requestPath.replace(/^\/api/, "") } } }
}));
