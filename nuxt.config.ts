// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: [
  '@nuxt/ui',
  '@nuxtjs/ionic',
  '@pinia/nuxt',
  ],
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
    }
  },
  compatibilityDate: '2024-09-10',
  css: [
    '~/assets/fonts/batangas/css/batangas.css',
    '~/assets/fonts/satoshi/css/satoshi.css',
  ],
})