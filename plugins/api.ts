import { FetchOptions } from 'ofetch'
// import useUser from '~/stores/useUser'
import UserModule from '~~/http/modules/user'

interface IApiInstance {
  user: UserModule
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const fetchOptions: FetchOptions = {
    baseURL: runtimeConfig.public.apiBase,
    // headers: {
    //   Authorization:
    //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDUzNGNlNjY0ODM2ZmYxYjRmMDA5ODgiLCJpYXQiOjE2ODMyMDg2NzAsImV4cCI6MTY4NTgwMDY3MH0.fAl1KbqQ6mibyEj-EruM5x0yLGiAJFmPLkGuH3s_PLA'
    // },
    onRequest: ({ request: _, options }) => {
      if (process.client) {
        const accessToken = localStorage.getItem('access_token')
        options.headers = { Authorization: `Bearer ${accessToken}` }
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
