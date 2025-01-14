import vueInspector from "vite-plugin-vue-inspector";
import { defineNuxtConfig } from "nuxt/config";
import path from "path";
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-01-11",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui"],
  primevue: {
    components: {
      include: "*",
      exclude: [
        "Galleria",
        "Carousel",
        "UCarousel",
        "VDropdown",
        "VDropdownItem",
      ],
    },
  },
  css: ["~/assets/styles/app.scss"],
  colorMode: {
    preference: "light",
  },
  postcss: {
    plugins: {
      // Specify PostCSS plugins here
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      adsApiUrl: process.env.VITE_ADS_API_URL,
      authApiUrl: process.env.VITE_AUTH_API_URL,
      googleClientId: process.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
    },
  },
  alias: {
    "#tailwind-config": path.resolve(__dirname, "path/to/tailwind.config.js"),
  },
  build: {
    transpile: ["@nuxt/ui", "primevue"], // Add necessary packages to transpile
  },
  vite: {
    plugins: [
      vueInspector({
        enabled: false,
      }),
    ],
  },
});
