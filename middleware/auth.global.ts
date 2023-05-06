export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('access_token')
    if (token) {
      if (to.name === 'login' || to.name === 'register') {
        return '/'
      }
    } else if (to.meta.auth) {
      return '/login'
    }
  }
})
