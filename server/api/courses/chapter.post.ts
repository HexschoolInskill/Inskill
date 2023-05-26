// 新增影音課程章節

import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    sort: Joi.number().required()
  })
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
    const { teacherId } = course
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

    // add chapter
    const chapter = {
      title,
      description,
      sort,
      lessons: []
    }
    course.chapters.push(chapter)
    // sort chapters by sort
    course.chapters.sort((a, b) => a.sort - b.sort)
    await course.save()
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
