import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
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
