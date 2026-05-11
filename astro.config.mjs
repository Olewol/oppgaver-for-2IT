import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://olewol.github.io",
  base: "/oppgaver-for-2IT",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "nord",
      wrap: true,
    },
  },
});
