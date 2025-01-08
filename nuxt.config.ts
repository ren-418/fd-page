// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    components: {
      include: '*',
      exclude: ['Galleria', 'Carousel']
  }
  },
  css: ["~/assets/styles/app.scss",
  ],

  postcss: {
    plugins: 
    {
      tailwindcss: {},
      autoprefixer: {},
  
    },
    
  },
  runtimeConfig: {
    public: {
      adsApiUrl: process.env.VITE_ADS_API_URL,
      authApiUrl:process.env.VITE_AUTH_API_URL
    },
  }
});
