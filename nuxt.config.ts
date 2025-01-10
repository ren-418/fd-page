import vueInspector from "vite-plugin-vue-inspector";
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-01-11",
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/ui',
  ],
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
  postcss: {
    plugins: {
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
  vite: {
    plugins: [
      vueInspector({
        enabled: false,
      }),
    ],
  },
});
