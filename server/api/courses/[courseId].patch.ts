import Joi from 'joi'
import models, { Course } from '../../model/schema'
// TODO : update setting field in course
export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    thumbnail: Joi.string(),
    isPublic: Joi.boolean(),
    field: Joi.string().valid('title', 'description', 'price', 'thumbnail', 'isPublic').required()
  }).or('title', 'description', 'price', 'thumbnail', 'isPublic')
  try {
    const pathParameters = getRouterParams(event)
    const body = await readBody(event)
    const mergedObject = { ...body, ...pathParameters }
    const { error, value } = await schema.validate(mergedObject, { abortEarly: true })
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
    // check user is the teacher belong to course
    const { userInfo } = event.context.auth
    const teacherId = course.teacherId.toString()
    if (teacherId !== userInfo.id) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }
    // update course
    const { title, description, price, thumbnail, isPublic } = value
    if (title) course.title = title
    if (description) course.description = description
    if (price) course.price = price
    if (thumbnail) course.thumbnail = thumbnail
    if (isPublic === true || isPublic === false) course.isPublic = isPublic
    // save course
    const targetCourse = await course.save()
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