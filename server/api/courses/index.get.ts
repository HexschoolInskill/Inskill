import models from '../../model/schema'

export default defineEventHandler(async () => {
  try {
    const lessonId = '647a1336fc747cba02b8a2b2'
    const findLessonContent: any = await models.Course.findOne(
      { 'chapters.lessons._id': lessonId },
      { 'chapters.lessons.$': 1 }
    )

    const result = findLessonContent.chapters[0].lessons.find(
      (content: any) => content._id.toString() === lessonId
    ).lessonContent

    return {
      success: true,
      result
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
