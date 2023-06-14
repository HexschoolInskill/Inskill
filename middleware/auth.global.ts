import useUser from '~/stores/useUser'
import useCourses from '~/stores/useCourses'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const app = useNuxtApp()
    await app.$api.user.fetchProfile()
  }
  if (to.meta.auth) {
    const store = useUser()
    if (!store.userProfile._id) {
      const path = to.path
      const query = Object.entries(to.query)
        .map(([key, value]) => `${key}=${value as string}`)
        .join('&')
      return `/login?redirect=${path}&${query}`
    }
  }
  if (to.params.courseId) {
    console.log(to)
    const courseStore = useCourses()
    const userStore = useUser()
    const courseId = String(to.params.courseId)
    const { $api } = useNuxtApp()

    if (to.query.courseType === 'normal') {
      // 取得一般課程資料
      try {
        const data: any = await $api.course.getCourseContent(courseId)
        console.log(data)

        if (data.success && data.course.length) {
          // console.log(data.course[0])
          courseStore.setCurrentCourse(data.course[0])

          if (userStore.userProfile._id) {
            // console.log(userStore.userProfile)
            // 查看是否有購買/收藏該課程
            const coursePurchasedIndex = userStore.userProfile.purchasedCourses.findIndex(
              (purchased: any) => purchased?.courseId === courseId
            )
            const courseCollectedIndex = userStore.userProfile.collectCourses.findIndex(
              (collected: any) => collected?.courseId === courseId
            )

            courseStore.setPurchased(coursePurchasedIndex > -1)
            // courseStore.setPurchased(true)
            courseStore.setCollected(courseCollectedIndex > -1)
          }
        } else {
          // 無課程內容的情況先返回首頁
          navigateTo('/')
        }
      } catch (error: any) {
        console.log(error)
      }
    } else {
      // 取得直播課程資料
      try {
        console.log('liveStream')
      } catch (error) {}
    }
  }
})
