// 刪除影音課程章節內 lessonContent

import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    lessonId: Joi.string().required(),
    lessonContentId: Joi.string().required()
  })
  try {
    const queryParameters = getQuery(event)
    const routerParameters = getRouterParams(event)
    const mergedObject = { ...queryParameters, ...routerParameters }
    const { error, value } = await schema.validate(mergedObject, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { lessonId, lessonContentId } = value
    const { userInfo } = event.context.auth
    // checkout course exist
    const findCourse: any = await models.Course.findOne(
      { 'chapters.lessons.lessonContent._id': lessonContentId },
      { teacherId: 1, 'chapters.lessons.$': 1, 'chapters._id': 1 }
    )
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
        message: 'Permission deined, Only teacher can delete lesson'
      })
    }

    let updatedLessonContent: never[] = []
    const courseId = findCourse._id
    const chapterId = findCourse.chapters[0]._id
    await models.Course.findOneAndUpdate(
      { _id: courseId },
      {
        $pull: { 'chapters.$[chapter].lessons.$[lesson].lessonContent': { _id: lessonContentId } }
      },
      { new: true, arrayFilters: [{ 'chapter._id': chapterId }, { 'lesson._id': lessonId }] }
    ).then((updatedCourse: any) => {
      const updatedChapter = updatedCourse.chapters.find(
        (chapter: any) => chapter._id.toString() === chapterId.toString()
      )
      if (updatedChapter) {
        const updatedLesson = updatedChapter.lessons.find(
          (lesson: any) => lesson._id.toString() === lessonId.toString()
        )
        if (updatedLesson) {
          updatedLesson.lessonContent.forEach((content: any, index: number) => {
            content.sort = index + 1
          })
          updatedLessonContent = updatedLesson.lessonContent
        }
      }
      return updatedCourse.save()
    })

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
