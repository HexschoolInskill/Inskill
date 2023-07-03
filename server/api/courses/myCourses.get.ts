import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const purchasedCourses = await models.User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: userID }] } } },
      // 過濾出 purchasedCourses 中的 Course 課程
      { $unwind: '$purchasedCourses' },
      { $match: { 'purchasedCourses.courseType': 'Course' } },
      // 使用課程 ID 聯結 courses 資料表，取出需要的資料
      {
        $lookup: {
          from: 'courses',
          localField: 'purchasedCourses.courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      // 使用教師 ID 聯結 users 資料表，取出教師的使用者名稱
      {
        $lookup: {
          from: 'users',
          localField: 'course.teacherId',
          foreignField: '_id',
          as: 'teacher'
        }
      },
      { $unwind: '$teacher' },
      // 整理資料格式
      {
        $group: {
          _id: '$purchasedCourses.courseType',
          courseType: { $first: '$purchasedCourses.courseType' },
          courses: {
            $push: {
              _id: '$purchasedCourses.courseId',
              title: '$course.title',
              description: '$course.description',
              thumbnail: '$course.thumbnail',
              teacherId: '$course.teacherId',
              teacherName: '$teacher.username',
              teacherAvatar: '$teacher.avatar'
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
        message: '取得 user 購買影音課程資料成功',
        purchasedCourses
      }
    } else {
      return createError({
        statusCode: 404,
        message: '取得 user 購買影音課程資料失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
