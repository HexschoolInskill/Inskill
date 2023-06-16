// 新增影音課程 "課堂" 課程
import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    lessonId: Joi.string().required()
  })
  try {
    const pathParameters = getRouterParams(event)
    const body = await readMultipartFormData(event)

    const contentBuffer = body![0].data.toString()
    const json = JSON.parse(contentBuffer)

    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { lessonId } = value
    const { userInfo } = event.context.auth
    // checkout course exist
    const findTeacher: any = await models.Course.findOne(
      { 'chapters.lessons._id': lessonId },
      { teacherId: 1 }
    )
    if (!findTeacher) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    // checkout user is the teacher belong to course
    const teacherId = findTeacher.teacherId.toString()
    if (teacherId !== userInfo.id) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }

    const findLessonContent: any = await models.Course.findOne(
      { 'chapters.lessons._id': lessonId },
      { 'chapters.lessons.$': 1 }
    )

    const result = findLessonContent.chapters[0].lessons.find(
      (content: any) => content._id.toString() === lessonId
    ).lessonContent

    const newLessonContentSort = result.length + 1 // 獲取最大 sort 值，預設為 0

    // const lessonContent = {
    //   contentType: contentType,
    //   content: content,
    //   sort: newLessonContentSort,
    // }

    // const result: any = await models.Course.findOneAndUpdate(
    //   { _id: courseId, 'chapters._id': chapterId },
    //   { $push: { 'chapters.$.lessons': lesson } },
    //   { new: true }
    // )
    return {
      success: true,
      json,
      newLessonContentSort
      // updatedLessonContent: result.chapters
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
