import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    courseType: Joi.string().required(),
    isCart: Joi.boolean().required()
  })
  try {
    const { userInfo } = event.context.auth

    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, courseType, isCart } = value
    let course: object | null = null
    if (courseType === 'Course') {
      course = await models.Course.findById(courseId)
    } else if (courseType === 'LiveCourse') {
      course = await models.LiveCourse.findById(courseId)
    }
    if (!course) throw new Error('course not found')
    const collectIndex = userInfo.cartCourses.findIndex(
      (item: { courseId: string }) => item.courseId.toString() === courseId
    )
    if (isCart && collectIndex === -1) {
      userInfo.cartCourses.push({ courseId, courseType })
    }
    // checkout courseId whether exist in userInfo's cartCourses
    if (!isCart && collectIndex !== -1) {
      userInfo.cartCourses.splice(collectIndex, 1)
    }
    await userInfo.save()
    return {
      success: true,
      cart: userInfo.cartCourses
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
