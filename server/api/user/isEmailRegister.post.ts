import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const isEmailSchema = Joi.object({
    email: Joi.string().email().required()
  }).required()
  const body = await readBody(event)
  try {
    const { error, value } = isEmailSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const existingUser = await models.User.findOne({ email: value.email })
    if (existingUser) {
      return {
        success: true,
        statusCode: 200,
        message: '該 email 已註冊'
      }
    } else {
      return {
        success: false,
        statusCode: 404,
        message: '該 email 未註冊'
      }
    }
  } catch (error: any) {
    return {
      success: false,
      statusCode: 400,
      message: error.message
    }
  }
})
