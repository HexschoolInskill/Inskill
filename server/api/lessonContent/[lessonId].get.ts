import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    lessonId: Joi.string().required()
  })
  try {
    const pathParameters = getRouterParams(event)
    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))

    const { lessonId } = value
    const findLessonContent: any = await models.Course.findOne(
      { 'chapters.lessons._id': lessonId },
      { 'chapters.lessons.$': 1 }
    )

    if (findLessonContent) {
      const lessonContent = findLessonContent.chapters[0].lessons.find(
        (content: any) => content._id.toString() === lessonId
      ).lessonContent

      return {
        success: true,
        lessonContent
      }
    } else {
      return createError({
        statusCode: 400,
        message: 'LessonContent not found'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
