import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const applySchema = Joi.object({
    realName: Joi.string().required(),
    username: Joi.string().required(),
    gender: Joi.string().required(),
    unit: Joi.string().required(),
    phone: Joi.number().required(),
    postNumber: Joi.number().required().min(100).max(999),
    address: Joi.string().required(),
    facebookLink: Joi.string().uri(),
    youtubeLink: Joi.string().uri(),
    socialLink: Joi.string().uri(),
    githubLink: Joi.string().uri(),
    selfMedia: Joi.string().uri(),
    description: Joi.string().required(),
    longDescription: Joi.string().required()
  })
  const body = await readBody(event)
  try {
    const { error, value } = applySchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const userID = event.context.auth.userID
    const user = await models.User.findOneAndUpdate(
      { _id: userID },
      { $set: { apply: value } },
      { new: true }
    )
    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: '已送出審核資料',
        user
      }
    } else {
      return createError({
        statusCode: 404,
        message: '送出審核資料失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
