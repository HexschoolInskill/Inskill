export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = useCookie('access_token')
    if (token.value) {
      if (to.name === 'login' || to.name === 'register') {
        return '/'
      }
    } else if (to.meta.auth) {
      return '/login'
    }
  }
})
