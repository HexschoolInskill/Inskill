// 修改 lesson 某個欄位
import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
    lessonId: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    freePreview: Joi.boolean(),
    isPublish: Joi.boolean(),
    sort: Joi.number(),
    field: Joi.string().valid('title', 'description', 'freePreview', 'isPublish', 'sort').required()
  }).or('title', 'description', 'freePreview', 'isPublish', 'sort')
  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, chapterId, lessonId, title, description, freePreview, isPublish, sort } =
      value
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
        message: 'Permission deined, Only teacher can modify lesson'
      })
    }
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
    if (!lesson) {
      return createError({
        statusCode: 400,
        message: 'Lesson not found'
      })
    }
    // update lesson where fields update from body
    if (title) lesson.title = title
    if (description) lesson.description = description
    if (freePreview === true || freePreview === false) lesson.freePreview = freePreview
    if (isPublish === true || isPublish === false) lesson.isPublish = isPublish
    if (sort) {
      const currentIndex = lesson.sort - 1
      const newSort = parseInt(sort)
      chapter.lessons.forEach((lesson: any, index: number) => {
        if (index === currentIndex) {
          lesson.sort = newSort
        } else if (index > currentIndex && lesson.sort <= newSort) {
          lesson.sort -= 1
        } else if (index < currentIndex && lesson.sort >= newSort) {
          lesson.sort += 1
        }
      })
      chapter.lessons.sort((a, b) => a.sort - b.sort)
    }
    await course.save()
    return {
      success: true,
      updatedChapter: course.chapters
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
