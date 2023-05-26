// 創建課程
import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    thumbnail: Joi.string().required()
  })

  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const userID = event.context.auth.userID
    const { title, description, price, thumbnail } = value
    const course = await models.Course.create({
      title,
      description,
      price,
      thumbnail,
      teacherId: userID,
      lessons: []
    })
    return {
      success: true,
      course
    }
  } catch (error: any) {
    return {
      success: false,
      message: error
    }
  }
})
