import { defineNuxtPlugin } from '#app';
import axios from 'axios';
import { useRuntimeConfig } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  axios.defaults.baseURL = runtimeConfig.public.authApiUrl

  axios.interceptors.request.use((config) => {
    // const token = $store.getters['auth/token'];
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  });

  // Add the axios instance to the Nuxt app
  nuxtApp.provide('axios', axios);
});
