import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const profileSchema = Joi.object({
    username: Joi.string().allow('').max(30),
    expertise: Joi.string().allow('').max(50),
    interests: Joi.string().allow('').max(50),
    about: Joi.string().allow('').max(300),
    facebookLink: Joi.string().allow('').uri(),
    youtubeLink: Joi.string().allow('').uri(),
    githubLink: Joi.string().allow('').uri(),
    socialLink: Joi.string().allow('').uri()
  })
  const body = await readBody(event)
  try {
    const { error, value } = profileSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const {
      username,
      expertise,
      interests,
      about,
      facebookLink,
      youtubeLink,
      githubLink,
      socialLink
    } = value

    interface UpdateObj {
      username?: string
      expertise?: string
      interests?: string
      about?: string
      facebookLink?: string
      youtubeLink?: string
      githubLink?: string
      socialLink?: string
    }

    const updateObj: UpdateObj = {}
    // Object.prototype.hasOwnProperty.call(body, 'username')

    if (Object.prototype.hasOwnProperty.call(body, 'username')) updateObj.username = username
    if (Object.prototype.hasOwnProperty.call(body, 'expertise')) updateObj.expertise = expertise
    if (Object.prototype.hasOwnProperty.call(body, 'interests')) updateObj.interests = interests
    if (Object.prototype.hasOwnProperty.call(body, 'about')) updateObj.about = about
    if (Object.prototype.hasOwnProperty.call(body, 'facebookLink'))
      updateObj.facebookLink = facebookLink
    if (Object.prototype.hasOwnProperty.call(body, 'youtubeLink'))
      updateObj.youtubeLink = youtubeLink
    if (Object.prototype.hasOwnProperty.call(body, 'githubLink')) updateObj.githubLink = githubLink
    if (Object.prototype.hasOwnProperty.call(body, 'socialLink')) updateObj.socialLink = socialLink

    const userID = event.context.auth.userID
    const user = await models.User.findOneAndUpdate(
      { _id: userID },
      { $set: updateObj },
      { new: true }
    )
    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: '更新 user 資料成功',
        user
      }
    } else {
      throw createError({
        statusCode: 404,
        message: '更新 user 資料失敗'
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
