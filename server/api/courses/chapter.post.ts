// 新增影音課程章節

import Joi from 'joi'
import models, { Course } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    title: Joi.string().required()
  })
  try {
    const body = await readBody(event)
    const { error, value } = await schema.validate(body, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId, title } = value
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
      { $group: { _id: null, maxSort: { $max: '$chapters.sort' } } },
      { $project: { _id: 0, maxSort: 1 } }
    ])
    const maxSort = maxSortResult[0]?.maxSort || 0 // 獲取最大 sort 值，預設為 0
    const newChapterSort = maxSort + 1

    // add chapter
    const chapter = {
      title,
      sort: newChapterSort,
      lessons: []
    }
    await models.Course.updateOne(
      { _id: courseId }, // 指定要更新的文件條件
      { $push: { chapters: chapter } } // 使用 $push 運算子新增新的 chapter 到陣列
    )
    // course.chapters.push(chapter) // 此寫法 ts 會報錯，暫時先用 updateOne 處理
    // // sort chapters by sort
    // course.chapters.sort((a, b) => a.sort - b.sort)
    // await course.save()
    return {
      success: true,
      chapter
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
