// 創建直播課程
import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    title: Joi.string().required()
  })

  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const userID = event.context.auth.userID
    const { title } = value
    const liveCourse = await models.LiveCourse.create({
      title,
      teacherId: userID
    })
    return {
      success: true,
      liveCourse
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
