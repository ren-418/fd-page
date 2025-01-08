// https://nuxt.com/docs/api/configuration/nuxt-config

import vueInspector from 'vite-plugin-vue-inspector';
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
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
      authApiUrl:process.env.VITE_AUTH_API_URL
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
