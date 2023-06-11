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
      return navigateTo({
        path: '/login',
        query: {
          redirect: path,
          ...to.query
        }
      })
    }
  }
  if (to.params.courseId) {
    useState('courseId', () => to.params.courseId)
  }
})
