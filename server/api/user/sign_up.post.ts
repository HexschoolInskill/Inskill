import Joi from 'joi'
import bcrypt from 'bcrypt'
import models from '../../model/schema'
import { sign } from '../../services/jwt'

export default defineEventHandler(async (event) => {
  const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string()
  })
  const body = await readBody(event)
  try {
    const { error, value } = signUpSchema.validate(body, { abortEarly: true })
    console.log(body)
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )
    // 檢查 email 是否已經存在
    const existingUser = await models.User.findOne({ email: value.email });
    if (existingUser) {
      return {
        success: false,
        statusCode: 409,
        message: 'Email already exists'
      }
    }

    // 使用 bcrypt 加密密碼
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // 創建新的 User 資料表紀錄
    const newUser = await models.User.create({
      email: value.email,
      password: hashedPassword,
      username: value.username
    });

    const { JWT_SECRET } = useRuntimeConfig()
    const accessToken = await sign({uid: newUser._id}, JWT_SECRET, 60 * 60 * 24 * 30)

    return {
      success: true,
      statusCode: 200,
      message: '[POST] api/user/sign_up with Joi',
      newUser,
      accessToken
    }
  } catch (error: any) {
    return {
      success: false,
      statusCode: 400,
      message: error.message
    }
  }
})
    