import Joi from 'joi'
import models from '../../model/schema'
// import path from 'path'
// import multer from 'multer'
// import { callNodeListener } from 'h3'
// import { v4 } from 'uuid'
// import firebaseAdmin from '../../plugin/firebaseInit'

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   },
//   fileFilter(req, file, cb) {
//     const ext = path.extname(file.originalname).toLowerCase()
//     console.log(ext)
//     if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
//       cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'))
//     }
//     cb(null, true)
//   }
// })

export default defineEventHandler(async (event) => {
  const profileSchema = Joi.object({
    username: Joi.string().allow('').max(30),
    expertise: Joi.string().allow('').max(50),
    interests: Joi.string().allow('').max(50),
    about: Joi.string().allow('').max(300),
    avatar: Joi.string().allow('').uri(),
    facebookLink: Joi.string().allow('').uri(),
    youtubeLink: Joi.string().allow('').uri(),
    githubLink: Joi.string().allow('').uri(),
    socialLink: Joi.string().allow('').uri()
  })
  const body = await readBody(event)
  const contenType = await getHeaders(event)['content-type']
  try {
    if (contenType === 'application/json') {
      const { error } = profileSchema.validate(body, { abortEarly: true })
      if (error)
        throw new Error(
          error.details
            .map((e) => {
              return e.message
            })
            .join(', ')
        )
    } else if (contenType?.includes('multipart/form-data')) {
      const file = readMultipartFormData(event)
      console.log(file)
      // try {
      //   await callNodeListener(upload.single('file'), event.node.req, event.node.res)
      //   return { success: true }
      // } catch (e) {
      //   throw createError({
      //     statusCode: 422,
      //     message: 'Unprocessable Entity'
      //   })
      // }

      // const bucket = firebaseAdmin.storage().bucket()
      // const blob = bucket.file(`images/${v4()}.${file.originalname.split('.').pop()}`)
      // const blobStream = blob.createWriteStream()

      // blobStream.on('finish', () => {
      //   const config = {
      //     action: 'read',
      //     expires: '12-31-2500'
      //   }
      //   // 取得檔案的網址
      //   blob.getSignedUrl(config, (err, fileUrl) => { console.log(fileUrl) })
      // })
    }

    const {
      username,
      expertise,
      interests,
      about,
      avatar,
      facebookLink,
      youtubeLink,
      githubLink,
      socialLink
    } = body

    interface UpdateObj {
      username?: string
      expertise?: string
      interests?: string
      about?: string
      avatar?: string
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
    if (Object.prototype.hasOwnProperty.call(body, 'avatar')) updateObj.avatar = avatar
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
