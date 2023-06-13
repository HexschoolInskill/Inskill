// 收藏課程

import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    courseType: Joi.string().required(),
    isCollect: Joi.boolean().required()
  })
  try {
    const { userInfo } = event.context.auth

    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, courseType, isCollect } = value
    let course: object | null = null
    if (courseType === 'Course') {
      course = await models.Course.findById(courseId)
    } else if (courseType === 'LiveCourse') {
      course = await models.LiveCourse.findById(courseId)
    }
    if (!course) throw new Error('course not found')
    const collectIndex = userInfo.collectCourses.findIndex(
      (item: { courseId: string }) => item.courseId.toString() === courseId
    )

    console.log('isCollect :>>>', isCollect)
    console.log('collectIndex :>>>', collectIndex)
    if (isCollect && collectIndex === -1) {
      userInfo.collectCourses.push({ courseId, courseType })
      console.log('userInfo :>>>', userInfo)
    }
    // checkout courseId whether exist in userInfo's collectCourses
    if (!isCollect && collectIndex !== -1) {
      userInfo.collectCourses.splice(collectIndex, 1)
    }
    await userInfo.save()
    return {
      success: true,
      collect: userInfo.collectCourses
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
