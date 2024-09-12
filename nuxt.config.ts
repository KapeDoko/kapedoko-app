// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/ionic', '@nuxt/ui'],
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