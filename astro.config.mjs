import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx(), react(), tailwind()]
});