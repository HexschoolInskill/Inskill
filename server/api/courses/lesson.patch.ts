// 修改 lesson 某個欄位
import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  // joi schema courseId,chapterId requried, title,description,contentType,duration,sort must one of them or multiple
  const schema = Joi.object({
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
    lessonId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    contentType: Joi.string().valid('video', 'liveStream', 'text', 'pdf'),
    // content : Joi.string().required(),
    duration: Joi.number(),
    sort: Joi.number(),
    field: Joi.string().valid('title', 'description', 'contentType', 'duration', 'sort').required()
  }).or('title', 'description', 'contentType', 'duration', 'sort')
  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, title, description, sort } = value
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

    // checkout user is teacher
    // const { isTeacher } = userInfo
    // if (!isTeacher) {
    //     return createError({
    //         statusCode: 400,
    //         message: 'Permission deined, Only teacher can add lesson'
    //     })
    // }

    // checkout chapter exist
    const chapters = course.chapters
    const chapter = chapters.find((chapter) => chapter._id.toString() === chapterId)
    if (!chapter) {
      return createError({
        statusCode: 400,
        message: 'Chapter not found'
      })
    }

    // checkout lesson exist
    const lessons = chapter.lessons
    const lesson = lessons.find((lesson) => lesson._id.toString() === lessonId)
    // TOOD : 需要 Lesson model
    if (!lesson) {
      return createError({
        statusCode: 400,
        message: 'Lesson not found'
      })
    }
    // update lesson where fields update from body
    if (title) lesson.title = title
    if (description) lesson.description = description
    if (sort) lesson.sort = sort
    // await lesson.save()
    return {
      success: true
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
