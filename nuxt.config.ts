// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    apiKey: process.env.API_KEY,
     public: {
      // Public keys are available on both server and client (browser)
      apiUrl: process.env.PUBLIC_API_URL || 'https://default-api.com'
    }
  },
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', 'nuxt-swiper', '@nuxt/image'],
  image: {
    domains: ['image.tmdb.org'],
    alias: {
      tmdb: 'https://image.tmdb.org/t/p'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
});
