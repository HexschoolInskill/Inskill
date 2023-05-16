import Joi from 'joi'
import { hash } from 'bcrypt'
import models from '../../model/schema'
import { sign } from '../../services/jwt'

export default defineEventHandler(async (event) => {
  const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^\w{8,30}$/)
      .required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    username: Joi.string().required()
  }).required()
  const body = await readBody(event)
  try {
    const { error, value } = signUpSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )
    // 檢查 email 是否已經存在
    const existingUser = await models.User.findOne({ email: value.email })
    if (existingUser) {
      return createError({
        statusCode: 409,
        message: 'Email already exists'
      })
    }

    // 使用 bcrypt 加密密碼
    const hashedPassword = await hash(value.password, 12)

    // 創建新的 User 資料表紀錄
    const newUser = await models.User.create({
      email: value.email,
      password: hashedPassword,
      username: value.username
    })

    const { JWT_SECRET } = useRuntimeConfig()
    const maxAge = 60 * 60 * 24 * 30
    const accessToken = await sign({ uid: newUser._id }, JWT_SECRET, 60 * 60 * 24 * 30)

    setCookie(event, 'access_token', accessToken!, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge
    })

    return {
      success: true,
      statusCode: 200,
      message: '帳號建立成功',
      username: newUser.username
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
