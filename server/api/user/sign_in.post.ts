import Joi from 'joi'
import { compare } from 'bcrypt'
import models from '../../model/schema'
import { sign } from '../../services/jwt'

export default defineEventHandler(async (event) => {
  const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^\w{8,30}$/)
      .required()
  }).required()
  const body = await readBody(event)
  try {
    const { error, value } = signInSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
            // return (`欄位 ${e.path[0]} 驗證失敗：${e.message}，輸入值為：${e.context!.value}`)
          })
          .join(', ')
      )

    const user = await models.User.findOne({ email: value.email }).select('+password')
    if (!user) {
      return {
        success: false,
        statusCode: 400,
        message: '帳號或密碼錯誤'
      }
    }

    const auth = await compare(value.password, user.password)
    if (!auth) {
      return {
        success: false,
        statusCode: 400,
        message: '帳號或密碼錯誤'
      }
    } else {
      const { JWT_SECRET } = useRuntimeConfig()
      const accessToken = await sign({ uid: user._id }, JWT_SECRET, 60 * 60 * 24 * 30)
      return {
        success: true,
        statusCode: 200,
        message: '登入成功',
        username: user.username,
        accessToken
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
