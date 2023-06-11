import useUser from '~/stores/useUser'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const app = useNuxtApp()
    await app.$api.user.fetchProfile()
  }
  if (to.meta.auth) {
    const store = useUser()
    if (!store.userProfile._id) {
      const path = to.path
      const query = Object.entries(to.query)
        .map(([key, value]) => `${key}=${value as string}`)
        .join('&')
      return `/login?redirect=${path}&${query}`
    }
  }
  if (to.params.courseId) {
    useState('courseId', () => to.params.courseId)
  }
})
