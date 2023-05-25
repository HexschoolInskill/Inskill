import Joi from 'joi'
import { hash } from 'bcrypt'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const resetSchema = Joi.object({
    password: Joi.string()
      .pattern(/^\w{8,30}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  }).required()
  const body = await readBody(event)
  try {
    const { error, value } = resetSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const userID = event.context.auth.userID
    const newPassword = await hash(value.password, 12)

    const user = await models.User.findByIdAndUpdate(userID, {
      password: newPassword
    })

    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: '密碼重置成功'
      }
    } else {
      return createError({
        statusCode: 404,
        message: '密碼重置失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
