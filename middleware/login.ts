export default defineNuxtRouteMiddleware((to, from) => {
  if (from.fullPath !== '/login') to.query.redirect = from.fullPath
})
