export default defineNuxtConfig({
  css: ['@/assets/scss/style.scss'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  typescript: {
    typeCheck: true
  },
  nitro: {
    plugins: [
      '~/server/plugin/mongooseInit.ts',
      '~/server/plugin/socketServer/index.ts',
    ]
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    public: {
      apiBase: '/api'
    }
  },
})
