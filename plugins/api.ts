import { FetchOptions } from 'ofetch'
import useUser from '~/stores/useUser'
import UserModule from '~~/http/modules/user'
import CoursesModule from '~~/http/modules/courses'
import PartnerModule from '~/http/modules/partner'

interface IApiInstance {
  user: UserModule
  course: CoursesModule
  partner: PartnerModule
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
        const route = useRoute()
        const userStore = useUser()
        userStore.resetUserProfile()
        navigateTo(`/login?redirect=${route.fullPath}`)
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
    course: new CoursesModule(fetcher),
    partner: new PartnerModule(fetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
