export default defineNuxtConfig({
  css: ['@/assets/scss/style.scss'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  typescript: {
    typeCheck: true
  },
  nitro: {
    plugins: ['~/server/plugin/mongooseInit.ts', '~/server/plugin/socketServer/index.ts']
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    MAIL_ACCOUNT: process.env.MAIL_ACCOUNT,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    FIREBASE_TYPE: process.env.FIREBASE_TYPE,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    NEWEBPAY_MERCHANT_ID: process.env.NEWEBPAY_MERCHANT_ID,
    NEWEBPAY_HASH_KEY: process.env.NEWEBPAY_HASH_KEY,
    NEWEBPAY_HASH_IV: process.env.NEWEBPAY_HASH_IV,
    public: {
      apiBase: '/api'
    }
  }
})
