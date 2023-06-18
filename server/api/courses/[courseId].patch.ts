import { promisify } from 'util'
import Joi from 'joi'
import multer from 'multer'
import models, { Course } from '../../model/schema'
import firebaseAdmin from '../../plugin/firebaseInit'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式，且大小限制 5MB 以下。'))
    }
  }
})

export default defineEventHandler(async (event) => {
  const contenType = await getHeaders(event)['content-type']
  const pathParameters = getRouterParams(event)
  const { courseId } = pathParameters

  try {
    // get course from db
    const course = (await models.Course.findById(courseId)) as Course // 添加類型斷言為 Course
    if (!course) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    // check user is the teacher belong to course
    const { userInfo } = event.context.auth
    const teacherId = course.teacherId.toString()
    if (teacherId !== userInfo.id) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }
    if (contenType === 'application/json') {
      const schema = Joi.object({
        courseId: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        isPublic: Joi.boolean().required()
      })
      const body = await readBody(event)
      const mergedObject = { ...body, ...pathParameters }
      const { error, value } = await schema.validate(mergedObject, { abortEarly: true })
      if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))

      // update course
      const { title, description, price, isPublic } = value
      course.title = title
      course.description = description
      course.price = price
      course.isPublic = isPublic
      // save course
      const targetCourse = await course.save()
      return {
        success: true,
        course: targetCourse
      }
    } else if (contenType?.includes('multipart/form-data')) {
      // @ts-expect-error: Nuxt 3
      await callNodeListener(upload.single('image'), event.node.req, event.node.res)
      // @ts-expect-error: multer
      const file = event.node.req.file

      const bucket = firebaseAdmin.storage().bucket()
      const blob = bucket.file(`images/course/${courseId}.${file.originalname.split('.').pop()}`)
      const blobStream = blob.createWriteStream()

      const fileUrlPromise = new Promise((resolve, _reject) => {
        blobStream.on('finish', async () => {
          const getSignedUrl = promisify(blob.getSignedUrl).bind(blob)
          const fileUrl = await getSignedUrl({ action: 'read', expires: '12-31-2500' })
          resolve(fileUrl)
        })
      })
      blobStream.on('error', () => {
        return createError({
          statusCode: 500,
          message: '更新 course thumbnail 失敗'
        })
      })
      blobStream.end(file.buffer)

      const newThumbnail = (await fileUrlPromise) as string
      if (newThumbnail) course.thumbnail = newThumbnail
      const targetCourse = await course.save()
      return {
        success: true,
        course: targetCourse
      }
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
