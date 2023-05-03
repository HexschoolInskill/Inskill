export default defineNuxtConfig({
  css: ['@/assets/scss/style.scss'],
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
