import useUser from '~/stores/useUser'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const app = useNuxtApp()
    await app.$api.user.fetchProfile()
  }
  if (to.meta.auth) {
    const store = useUser()
    if (!store.userProfile.username) {
      return `/login?redirect=${to.fullPath}`
    }
  }
})
