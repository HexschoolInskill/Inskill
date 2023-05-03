module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'import/no-named-as-default-member': 'off'
  },
  overrides: [
    {
      files: [
        '**/pages/**/*.{js,ts,vue,.jsx,.tsx}',
        '**/layouts/**/*.{js,ts,vue,.jsx,.tsx}',
        '**/app.{js,ts,vue,.jsx,.tsx}',
        '**/error.{js,ts,vue,.jsx,.tsx}'
      ],
      rules: {
        'vue/multi-word-component-names': 0,
        'vue/no-multiple-template-root': 0
      }
    }
  ]
}
