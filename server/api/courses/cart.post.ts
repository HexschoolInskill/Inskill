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
    const userID = event.context.auth.userID
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, courseType, isCart } = value

    const isPurchased = await models.User.findOne({
      _id: userID,
      'purchasedCourses.courseId': courseId
    })
    if (isPurchased) {
      return createError({
        statusCode: 409,
        message: '該課程已購買，不可加入購物車！'
      })
    }

    let course: object | null = null
    if (courseType === 'Course') {
      course = await models.Course.findById(courseId)
    } else if (courseType === 'LiveCourse') {
      course = await models.LiveCourse.findById(courseId)
    }
    if (!course) throw new Error('course not found')

    const cartIndex = userInfo.cartCourses.findIndex(
      (item: { courseId: string }) => item.courseId.toString() === courseId
    )
    if (isCart && cartIndex === -1) {
      userInfo.cartCourses.push({ courseId, courseType })
    }
    // checkout courseId whether exist in userInfo's cartCourses
    if (!isCart && cartIndex !== -1) {
      userInfo.cartCourses.splice(cartIndex, 1)
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
