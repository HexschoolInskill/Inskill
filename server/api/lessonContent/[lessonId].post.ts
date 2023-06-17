// 新增影音課程 "課堂" 課程
import { promisify } from 'util'
import { ObjectId } from 'mongodb'
import Joi from 'joi'
import multer from 'multer'
import models from '../../model/schema'
import firebaseAdmin from '../../plugin/firebaseInit'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('檔案格式錯誤，僅限上傳 video / pdf 格式，且大小限制 100MB 以下。'))
    }
  }
})

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    lessonId: Joi.string().required()
  })
  try {
    // @ts-expect-error: Nuxt 3
    await callNodeListener(upload.any(), event.node.req, event.node.res)
    // @ts-expect-error: multer
    const routerParams = event.node.req.originalUrl.split('/').pop()
    const pathParameters = { lessonId: routerParams }

    // @ts-expect-error: multer
    const contentBody = event.node.req.body.data.toString()
    const json = JSON.parse(contentBody)
    const { contentType } = json

    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { lessonId } = value
    const { userInfo } = event.context.auth
    const findCourse: any = await models.Course.findOne(
      { 'chapters.lessons._id': lessonId },
      { teacherId: 1, 'chapters.lessons.$': 1, 'chapters._id': 1 }
    )
    // checkout course exist
    if (!findCourse) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    // checkout user is the teacher belong to course
    const teacherId = findCourse.teacherId.toString()
    if (teacherId !== userInfo.id) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }

    const maxSort = findCourse.chapters[0].lessons.find(
      (content: any) => content._id.toString() === lessonId
    ).lessonContent
    const newLessonContentSort = maxSort.length + 1

    interface lessonContent {
      _id: ObjectId
      contentType: string
      content?: string
      sort: number
    }
    const uniqueId = new ObjectId()
    const lessonContent: lessonContent = {
      _id: uniqueId,
      contentType,
      sort: newLessonContentSort
    }

    if (contentType === 'text' || contentType === 'code') {
      const { content } = json
      lessonContent.content = content
    } else if (contentType === 'video') {
      // @ts-expect-error: multer
      const file = event.node.req.files[0]

      const bucket = firebaseAdmin.storage().bucket()
      const blob = bucket.file(`videos/${uniqueId}.${file.originalname.split('.').pop()}`)
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
          message: '新增 lesson video 失敗'
        })
      })
      blobStream.end(file.buffer)

      const newUrl = (await fileUrlPromise) as string
      lessonContent.content = newUrl
    } else if (contentType === 'pdf') {
      // @ts-expect-error: multer
      const file = event.node.req.files[0]

      const bucket = firebaseAdmin.storage().bucket()
      const blob = bucket.file(`pdf/${uniqueId}.${file.originalname.split('.').pop()}`)
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
          message: '新增 lesson pdf 失敗'
        })
      })
      blobStream.end(file.buffer)

      const newUrl = (await fileUrlPromise) as string
      lessonContent.content = newUrl
    } else {
      return createError({
        statusCode: 400,
        message: 'lesson contentType error'
      })
    }

    const courseId = findCourse._id
    const chapterId = findCourse.chapters[0]._id
    await models.Course.findOneAndUpdate(
      { _id: courseId, 'chapters._id': chapterId, 'chapters.lessons._id': lessonId },
      { $addToSet: { 'chapters.$.lessons.$[lessonId].lessonContent': lessonContent } },
      { arrayFilters: [{ 'lessonId._id': lessonId }], new: true }
    )

    const reFindLessonContent: any = await models.Course.findOne(
      { 'chapters.lessons._id': lessonId },
      { 'chapters.lessons.$': 1, 'chapters._id': 1 }
    )
    const updatedLessonContent = reFindLessonContent.chapters[0].lessons.find(
      (content: any) => content._id.toString() === lessonId
    ).lessonContent

    return {
      success: true,
      updatedLessonContent
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
