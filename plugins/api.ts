import { FetchOptions } from 'ofetch'
import UserModule from '~~/http/modules/user'
import CoursesModule from '~~/http/modules/courses'

interface IApiInstance {
  user: UserModule
  course: CoursesModule
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase,
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

  if (process.server) {
    fetchOptions.headers = useRequestHeaders()
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
