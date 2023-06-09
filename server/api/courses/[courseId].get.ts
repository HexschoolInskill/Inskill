import Joi from 'joi'
import models, { Course, User } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required()
  })
  try {
    const pathParameters = getRouterParams(event)
    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    // get course from db
    const { courseId } = value
    const course = (await models.Course.findById(courseId)) as Course // 添加類型斷言為 Course
    if (!course) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    // get teacher from db
    const teacher = (await models.User.findById(course.teacherId)) as User // 添加類型斷言為 User
    // return limited course details
    const targetCourse = {
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnail: course.thumbnail,
      teacher: teacher?.username,
      lessons: course.lessons,
      chapters: course.chapters, // TODO : lack model
      reviews: course.reviews // TODO : lack model
    }
    return {
      success: true,
      course: targetCourse
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
