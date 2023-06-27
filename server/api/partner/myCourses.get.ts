import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const partnerCourses = await models.Course.aggregate([
      { $match: { $expr: { $eq: ['$teacherId', { $toObjectId: userID }] } } },
      { $lookup: { from: 'users', localField: 'teacherId', foreignField: '_id', as: 'user' } },
      {
        $addFields: {
          teacherName: { $first: '$user.username' },
          teacherAvatar: { $first: '$user.avatar' }
        }
      },
      { $project: { user: 0, reviews: 0, chapters: 0 } }
    ])

    if (partnerCourses) {
      return {
        success: true,
        statusCode: 200,
        message: '取得 partner 影音課程資料成功',
        partnerCourses
      }
    } else {
      return createError({
        statusCode: 404,
        message: '取得 partner 影音課程資料失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
