// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/ionic", "@pinia/nuxt"],
  runtimeConfig: {
    foursquareApiKey: process.env.FOURSQUARE_API_KEY,
    foursquareVersion: process.env.FOURSQUARE_API_VERSION || "2025-06-17",
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  ionic: {
    integrations: {
      icons: false,
    },
    css: {
      basic: false,
      utilities: false,
    },
    config: {
      //
    },
  },
  compatibilityDate: "2024-09-10",
  css: [
    "~/assets/fonts/batangas/css/batangas.css",
    "~/assets/fonts/satoshi/css/satoshi.css",
  ],
});
