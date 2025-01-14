import vueInspector from "vite-plugin-vue-inspector";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-01-11",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui", "@primevue/nuxt-module"],
  primevue: {
    components: {
      include: "*",
      exclude: ["Galleria", "UCarousel"],
    },
  },
  css: ["~/assets/styles/app.scss"],
  colorMode: {
    preference: "light",
  },
  postcss: {
    plugins: {
      'postcss-color-gray': {}
    }
    // plugins: {
    //   tailwindcss: {},
    //   autoprefixer: {},
    // },
  },
  tailwindcss: { exposeConfig: true },
  runtimeConfig: {
    public: {
      adsApiUrl: process.env.VITE_ADS_API_URL,
      authApiUrl: process.env.VITE_AUTH_API_URL,
      googleClientId: process.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
    },
  },
  vite: {
    plugins: [
      vueInspector({
        enabled: false,
      }),
    ],
  },
  // plugins: ["~/plugins/primevue.ts"],
});
