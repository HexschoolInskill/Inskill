import { FetchOptions } from 'ofetch'
// import useUser from '~/stores/useUser'
import UserModule from '~~/http/modules/user'
import CoursesModule from '~~/http/modules/courses'
import tokenController from '~~/composables/token'

interface IApiInstance {
  user: UserModule
  course: CoursesModule
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase,
    onRequest: ({ request: _, options }) => {
      if (process.client) {
        const accessToken = tokenController.useToken()
        // console.log(accessToken)
        options.headers = { Authorization: `Bearer ${accessToken}` }
      }
    },
    onRequestError() {
      throw new Error('請求失敗，請檢查網路連線後重試')
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      } else {
        throw new Error(response._data.message)
      }
    }
  }

  const fetcher = $fetch.create(fetchOptions)

  const modules: IApiInstance = {
    user: new UserModule(fetcher),
    course: new CoursesModule(fetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
