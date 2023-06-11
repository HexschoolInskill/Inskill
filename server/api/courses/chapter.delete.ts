// 刪除影音課程章節

import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    chapterId: Joi.string().required()
  })
  try {
    const pathParameters = getQuery(event)
    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, chapterId } = value
    const { userInfo } = event.context.auth
    // checkout course exist
    const course = (await models.Course.findById(courseId)) as Course
    if (!course) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    // checkout user is the teacher belong to course
    const teacherId = course.teacherId.toString()
    if (teacherId !== userInfo.id) {
      return createError({
        statusCode: 400,
        message: 'Permission deined, Only teacher can add lesson'
      })
    }
    const result = await models.Course.findOneAndUpdate(
      { _id: courseId },
      { $pull: { chapters: { _id: chapterId } } },
      { new: true }
    ).then((updatedCourse: any) => {
      // 更新剩餘章節的 sort 欄位
      updatedCourse.chapters.forEach((chapter: any, index: number) => {
        chapter.sort = index + 1
      })
      return updatedCourse.save()
    })
    return {
      success: true,
      updatedChapter: result.chapters
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
