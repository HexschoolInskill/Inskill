import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const purchasedCourses = await models.User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: userID }] } } },
      { $unwind: '$purchasedCourses' },
      { $match: { 'purchasedCourses.courseType': 'LiveCourse' } },
      {
        $lookup: {
          from: 'livecourses',
          localField: 'purchasedCourses.courseId',
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
          _id: '$purchasedCourses.courseType',
          courseType: { $first: '$purchasedCourses.courseType' },
          courses: {
            $push: {
              _id: '$purchasedCourses.courseId',
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

    if (purchasedCourses) {
      return {
        success: true,
        statusCode: 200,
        message: '取得 user 購買課程資料成功',
        purchasedCourses
      }
    } else {
      return createError({
        statusCode: 404,
        message: '取得 user 購買課程資料失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
