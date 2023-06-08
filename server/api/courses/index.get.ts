import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const { userInfo } = event.context.auth

    const { purchasedCourses } = userInfo
    const courses = []
    await Promise.all(
      purchasedCourses.map(async (courseID: string) => {
        console.log(`courseID : `, courseID)
        const course = await models.Course.findById(courseID)
        if (course) {
          courses.push(course)
        }
      })
    )
    return {
      success: true,
      courses
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
