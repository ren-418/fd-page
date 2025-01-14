import { defineNuxtPlugin } from "#app";
import axios from "axios";
import { useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  axios.defaults.baseURL = runtimeConfig.public.authApiUrl;

  axios.interceptors.request.use((config) => {
    const token = useCookie("auth_token");
    if (token.value) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
    }
    return config;
  });
  nuxtApp.provide("axios", axios);
});