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
      return createError({
        statusCode: 404,
        message: '帳號或密碼錯誤'
      })
    }

    const auth = await compare(value.password, user.password)
    if (!auth) {
      return createError({
        statusCode: 404,
        message: '帳號或密碼錯誤'
      })
    } else {
      const { JWT_SECRET } = useRuntimeConfig()
      const maxAge = 60 * 60 * 24 * 30
      const accessToken = await sign({ uid: user._id }, JWT_SECRET, maxAge)

      setCookie(event, 'access_token', accessToken!, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge
      })

      return {
        success: true,
        statusCode: 200,
        message: '登入成功',
        username: user.username,
        avatar: user.avatar
      }
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
