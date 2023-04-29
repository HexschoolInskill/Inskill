export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  typescript: {
    typeCheck: true
  },
  nitro: {},
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})
