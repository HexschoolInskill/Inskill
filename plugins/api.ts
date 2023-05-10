import { FetchOptions } from 'ofetch'
// import useUser from '~/stores/useUser'
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
    onRequest: ({ request: _, options }) => {
      if (process.client) {
        const accessToken = localStorage.getItem('access_token')
        options.headers = { Authorization: `Bearer ${accessToken}` }
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
