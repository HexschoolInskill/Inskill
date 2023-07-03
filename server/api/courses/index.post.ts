// 創建影音課程
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
    const course = await models.Course.create({
      title,
      teacherId: userID
    })
    return {
      success: true,
      course
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
