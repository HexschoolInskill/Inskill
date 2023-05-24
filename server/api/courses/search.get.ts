import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const queryResult = getQuery(event)
    if (Object.keys(queryResult).length === 0) {
      // 若沒有帶 query，則各別回傳影音與直播課程資料 for 首頁
      const courses = await models.Course.find({})
      const liveCourses = await models.LiveCourse.find({})
      return {
        success: true,
        statusCode: 200,
        courses,
        liveCourses
      }
    } else {
      let serachCourses = []
      const { q, sortBy, category } = getQuery(event)
      const sortOption: { [key: string]: number } = {}

      if (sortBy === 'popular') {
        sortOption.averageRating = -1
      } else if (sortBy === 'praise') {
        sortOption.purchasedCount = -1
      } else if (sortBy === 'time') {
        sortOption.createdAt = -1
      }
      console.log(q, sortBy, category)
      if (category === 'normal') {
        serachCourses = await models.Course.aggregate([
          { $unwind: '$reviews' },
          {
            $lookup: {
              from: 'users',
              localField: 'teacherId',
              foreignField: '_id',
              as: 'teacher'
            }
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$title' },
              description: { $first: '$description' },
              price: { $first: '$price' },
              thumbnail: { $first: '$thumbnail' },
              teacherId: { $first: '$teacherId' },
              teacherUsername: { $first: '$teacher.username' },
              averageRating: { $avg: '$reviews.rating' },
              purchasedCount: { $sum: '$purchasedCount' }
            }
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              price: 1,
              thumbnail: 1,
              teacherId: 1,
              teacherName: { $arrayElemAt: ['$teacherUsername', 0] },
              averageRating: { $round: ['$averageRating', 1] },
              purchasedCount: 1
            }
          }
          // {
          //   $sort: sortOption,
          // },
        ])
      } else if (category === 'stream') {
        serachCourses = await models.LiveCourse.aggregate([
          { $unwind: '$reviews' },
          {
            $lookup: {
              from: 'users',
              localField: 'teacherId',
              foreignField: '_id',
              as: 'teacher'
            }
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$title' },
              description: { $first: '$description' },
              price: { $first: '$price' },
              thumbnail: { $first: '$thumbnail' },
              teacherId: { $first: '$teacherId' },
              teacherUsername: { $first: '$teacher.username' },
              averageRating: { $avg: '$reviews.rating' },
              purchasedCount: { $sum: '$purchasedCount' }
            }
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              price: 1,
              thumbnail: 1,
              teacherId: 1,
              teacherName: { $arrayElemAt: ['$teacherUsername', 0] },
              averageRating: { $round: ['$averageRating', 1] },
              purchasedCount: 1
            }
          }
          // {
          //   $sort: sortOption,
          // },
        ])
      }
      return {
        success: true,
        statusCode: 200,
        serachCourses
      }
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
