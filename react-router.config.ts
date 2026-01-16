import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Disable SSR for GitHub Pages (static hosting)
  ssr: false,
  // Set basename for GitHub Pages subpath
  basename: process.env.BASE_PATH || "/",
} satisfies Config;
