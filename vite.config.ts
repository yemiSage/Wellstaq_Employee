import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
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
      includeAssets: ["assets/figma/wellstaq-logo.png"],
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
        icons: [
          { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "/icons/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://18-204-12-4.sslip.io",
            handler: "NetworkOnly",
            method: "GET"
          }
        ]
      }
    })
  ],
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  server: { host: "0.0.0.0", port: 4173 },
  preview: { host: "0.0.0.0", port: 4173 }
});
