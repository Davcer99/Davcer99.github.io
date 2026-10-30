// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // GitHub Pages user site (repository Davcer99.github.io), served from the root, so no `base` is needed.
  site: "https://davcer99.github.io",
  output: "static",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
