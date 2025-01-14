// plugins/google-maps.ts
import { defineNuxtPlugin } from "#app";
import { Loader } from "@googlemaps/js-api-loader";

export default defineNuxtPlugin(async (nuxtApp) => {
  const loader = new Loader({
    apiKey: "AIzaSyBIKQxYhCEXZNRyt7gCTyuHkyDxFXjP2BM",
    version: "weekly",
    libraries: ["places"], // You can add other libraries as needed, e.g., for Autocomplete
  });

  await loader.load();
  nuxtApp.provide("google", window.google); // Makes google available globally
});
