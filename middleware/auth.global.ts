import useUser from '~/stores/useUser'
import useCourses from '~/stores/useCourses'

export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp()
  const store = useUser()

  if (process.server) {
    await app.$api.user.fetchProfile()
  }
  // 有切換頁面的情況
  if (to.fullPath) {
    // 有登入的情況
    if (store.userProfile._id) {
      // 取購物車資料
      try {
        const data: any = await app.$api.course.getCart()
        console.log('cart :>>>', data.cart[0].courses)

        if (data.success) {
          const courseStore = useCourses()
          courseStore.setCart(data.cart[0].courses)
        }
      } catch (error: any) {
        console.log('error: >>>', error.message)
      }
    }
  }
  if (to.meta.auth) {
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
    const courseType = to.query.courseType
    const { $api } = useNuxtApp()

    let data: any

    try {
      if (courseType === 'normal') {
        // 取得一般課程資料
        data = await $api.course.getCourseContent(courseId)
      } else {
        // 取得直播課程資料
        data = await $api.liveCourse.getLiveCourse(courseId)
      }
      console.log(data)
    } catch (error: any) {
      console.log(error)
    }

    if (data.success) {
      const course = courseType === 'normal' ? data.course[0] : data.liveCourse[0]
      courseStore.setCurrentCourse(course)

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
  }
})
