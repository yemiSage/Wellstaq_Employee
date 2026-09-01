import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wellstaq.employee",
  appName: "Wellstaq",
  webDir: "dist",
  server: { androidScheme: "https" }
};

export default config;
