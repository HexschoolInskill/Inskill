import Joi from 'joi'
import models from '../../model/schema'
// TODO : update setting field in course
export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    thumbnail: Joi.string(),
    videoUrl: Joi.string(),
    startTime: Joi.date().iso(),
    endTime: Joi.date().iso(),
    field: Joi.string()
      .valid('title', 'description', 'price', 'thumbnail', 'videoUrl', 'startTime', 'endTime')
      .required()
  }).or('title', 'description', 'price', 'thumbnail', 'videoUrl', 'startTime', 'endTime')
  try {
    const pathParameters = getRouterParams(event)
    const body = await readBody(event)
    const mergedObject = { ...body, ...pathParameters }
    const { error, value } = await schema.validate(mergedObject, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    // get course from db
    const { courseId } = value
    const liveCourse = await models.LiveCourse.findById(courseId)
    if (!liveCourse) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    // check user is the teacher belong to course
    const { userInfo } = event.context.auth
    const teacherId = liveCourse.teacherId.toString()
    if (teacherId !== userInfo.id) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }
    // update course
    const { title, description, price, thumbnail, videoUrl, startTime, endTime } = value
    if (title) liveCourse.title = title
    if (description) liveCourse.description = description
    if (price) liveCourse.price = price
    if (thumbnail) liveCourse.thumbnail = thumbnail
    if (videoUrl) liveCourse.videoUrl = videoUrl
    if (startTime) liveCourse.startTime = startTime
    if (endTime) liveCourse.endTime = endTime
    // save course
    const targetCourse = await liveCourse.save()
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
