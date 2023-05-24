export default defineNuxtConfig({
  css: ['@/assets/scss/style.scss'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  typescript: {
    typeCheck: true
  },
  nitro: {
    plugins: ['~/server/plugin/mongooseInit.ts']
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_ACCOUNT: process.env.MAIL_ACCOUNT,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    NEWEBPAY_MERCHANT_ID: process.env.NEWEBPAY_MERCHANT_ID,
    NEWEBPAY_HASH_KEY: process.env.NEWEBPAY_HASH_KEY,
    NEWEBPAY_HASH_IV: process.env.NEWEBPAY_HASH_IV,
    public: {
      apiBase: '/api'
    }
  }
})
