import { FetchOptions } from 'ofetch'
import useUser from '~/stores/useUser'
import UserModule from '~~/http/modules/user'
import CoursesModule from '~~/http/modules/courses'
import LiveCoursesModule from '~~/http/modules/liveCourse'
import PartnerModule from '~/http/modules/partner'
import LessonContentModule from '~/http/modules/lessonContent'

interface IApiInstance {
  user: UserModule
  course: CoursesModule
  liveCourse: LiveCoursesModule
  partner: PartnerModule
  lessonContent: LessonContentModule
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
        const path = route.path
        const query = route.query
        if (route.name !== 'login')
          navigateTo({ path: '/login', query: { redirect: path, ...query } })
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
    liveCourse: new LiveCoursesModule(fetcher),
    partner: new PartnerModule(fetcher),
    lessonContent: new LessonContentModule(fetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
