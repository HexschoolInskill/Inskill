export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const tokenController = useToken()
    const token = tokenController.useToken()
    console.log(to)

    if (token?.length) {
      // 假設登入後關閉網頁再開啟
      if (to.name === 'index') {
        const app = useNuxtApp()
        app.$api.user.fetchProfile()
      }

      if (to.name === 'login' || to.name === 'register') {
        return '/'
      }
    } else if (to.meta.auth) {
      return '/login'
    }
  }
})
