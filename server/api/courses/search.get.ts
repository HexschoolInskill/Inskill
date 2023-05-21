import models from '../../model/schema'

export default defineEventHandler(async () => {
  try {
    const courses = await models.Course.find({})
    const liveCourses = await models.LiveCourse.find({})
    // const { sort, type } = getQuery(event)
    // if (sort === 'time') {
    //   courses.sort((a, b) => b.createdAt - a.createdAt);
    // } else if (sort === 'people') {
    //   courses.sort((a, b) => b.enrollments.length - a.enrollments.length);
    // } else if (sort === 'score') {
    //   courses.sort((a, b) => b.rating - a.rating);
    // }
    return {
      success: true,
      statusCode: 200,
      courses,
      liveCourses
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
