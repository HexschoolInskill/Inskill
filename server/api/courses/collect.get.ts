// 讀取 收藏課程

import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const collectCourses = await models.User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: userID }] } } },
      { $unwind: '$collectCourses' },
      { $match: { 'collectCourses.courseType': 'Course' } },
      {
        $lookup: {
          from: 'courses',
          localField: 'collectCourses.courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      {
        $lookup: {
          from: 'users',
          localField: 'course.teacherId',
          foreignField: '_id',
          as: 'teacher'
        }
      },
      { $unwind: '$teacher' },
      {
        $group: {
          _id: '$collectCourses.courseType',
          courseType: { $first: '$collectCourses.courseType' },
          courses: {
            $push: {
              _id: '$collectCourses.courseId',
              title: '$course.title',
              description: '$course.description',
              teacherId: '$course.teacherId',
              teacherName: '$teacher.username'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          courseType: 1,
          courses: 1
        }
      }
    ])
    const collectLiveCourses = await models.User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: userID }] } } },
      { $unwind: '$collectCourses' },
      { $match: { 'collectCourses.courseType': 'LiveCourse' } },
      {
        $lookup: {
          from: 'livecourses',
          localField: 'collectCourses.courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      {
        $lookup: {
          from: 'users',
          localField: 'course.teacherId',
          foreignField: '_id',
          as: 'teacher'
        }
      },
      { $unwind: '$teacher' },
      {
        $group: {
          _id: '$collectCourses.courseType',
          courseType: { $first: '$collectCourses.courseType' },
          courses: {
            $push: {
              _id: '$collectCourses.courseId',
              title: '$course.title',
              description: '$course.description',
              teacherId: '$course.teacherId',
              teacherName: '$teacher.username'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          courseType: 1,
          courses: 1
        }
      }
    ])
    const collect = collectCourses.concat(collectLiveCourses)
    return {
      success: true,
      statusCode: 200,
      collect
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
