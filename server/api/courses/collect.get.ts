// 讀取 收藏課程

// import models, { Course, User, LiveCourse } from '../../model/schema'

export default defineEventHandler((event) => {
  try {
    const { userInfo } = event.context.auth
    return {
      success: true,
      collect: userInfo?.collect || []
    }
  } catch (error: any) {
    return {
      success: false,
      message: error
    }
  }
})
