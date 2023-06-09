// 新增影音課程章節課程
import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
    title: Joi.string().required()
  })
  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, chapterId, title } = value
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
    const maxSortResult = await models.Course.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: courseId }] } } },
      { $unwind: '$chapters' },
      { $match: { $expr: { $eq: ['$chapters._id', { $toObjectId: chapterId }] } } },
      { $unwind: '$chapters.lessons' },
      { $group: { _id: null, maxSort: { $max: '$chapters.lessons.sort' } } },
      { $project: { _id: 0, maxSort: 1 } }
    ])
    const maxSort = maxSortResult[0]?.maxSort || 0 // 獲取最大 sort 值，預設為 0
    const newLessonSort = maxSort + 1

    const lesson = {
      title,
      sort: newLessonSort,
      lessonContent: [],
      question: []
    }

    const result: any = await models.Course.findOneAndUpdate(
      { _id: courseId, 'chapters._id': chapterId },
      { $push: { 'chapters.$.lessons': lesson } },
      { new: true }
    )
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

// const find: any = await models.Course.find({ 'chapters._id': chapterId }).exec()
// const find: any = await models.Course.find({ 'chapters._id': chapterId, 'chapters.lessons._id': '64829ace5dac7ea13bd4153c' })
// const find: any = await models.Course.find({
//   'chapters.lessons.lessonContent._id': '647a1336fc747cba02b8a2a8'
// }).select('chapters.lessons.lessonContent')

// const findResult = await models.Course.aggregate([
//   { $match: { $expr: { $eq: ['$_id', { $toObjectId: courseId }] } } },
//   { $unwind: '$chapters' },
//   { $unwind: '$chapters.lessons' },
//   { $unwind: '$chapters.lessons.lessonContent' },
//   { $project: { _id: 0, lessonContent: '$chapters.lessons.lessonContent' } }
// ])
