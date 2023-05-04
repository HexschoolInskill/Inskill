import { FetchOptions } from 'ofetch'
import UserModule from '~~/http/modules/user'

interface IApiInstance {
  user: UserModule
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest: ({ request, options }) => {
      // console.log("request :>>>", request)
      const route = String(request)

      // 登入和忘記和重設密碼不用檢查 token
      if (
        !route.includes('login') ||
        !route.includes('forgetPassword') ||
        !route.includes('resetPassword')
      ) {
        // 檢查客戶端是否有 token
        const accessToken = localStorage.getItem('access_token')

        if (accessToken === undefined) {
          const router = useRouter()
          // console.log('router :>>>', router)

          router.push('/login')
        } else {
          options.headers = { Authorization: `Berear ${accessToken}` }
        }
      }
    }
  }

  const fetcher = $fetch.create(fetchOptions)

  const modules: IApiInstance = {
    user: new UserModule(fetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
