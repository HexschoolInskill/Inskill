// 刪除影音課程章節內 lesson

import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
    lessonId: Joi.string().required()
  })
  try {
    const pathParameters = getQuery(event)
    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, chapterId, lessonId } = value
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
        message: 'Permission deined, Only teacher can delete lesson'
      })
    }
    const result = await models.Course.findOneAndUpdate(
      { _id: courseId },
      { $pull: { 'chapters.$[chapter].lessons': { _id: lessonId } } },
      { new: true, arrayFilters: [{ 'chapter._id': chapterId }] }
    ).then((updatedCourse: any) => {
      const updatedChapter = updatedCourse.chapters.find(
        (chapter: any) => chapter._id.toString() === chapterId
      )
      if (updatedChapter) {
        updatedChapter.lessons.forEach((lesson: any, index: number) => {
          lesson.sort = index + 1
        })
      }
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
