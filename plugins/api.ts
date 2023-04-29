import { FetchOptions } from 'ofetch'
import UserModule from '~~/http/modules/user'

interface IApiInstance {
  user: UserModule
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase
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
