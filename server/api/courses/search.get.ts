import Joi from 'joi'
import models from '../../model/schema'
export default defineEventHandler(async (event) => {
  try {
    const queryResult = getQuery(event)
    if (Object.keys(queryResult).length === 0) {
      // 若沒有帶 query，則各別回傳影音與直播課程資料 for 首頁
      const courseData = await models.Course.aggregate([
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
            teacherName: { $first: '$teacher.username' },
            scoreCount: { $sum: 1 },
            averageRating: { $avg: '$reviews.rating' },
            purchasedCount: { $first: '$purchasedCount' },
            chapters: { $first: '$chapters' },
            createdAt: { $first: '$createdAt' }
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
            teacherName: { $arrayElemAt: ['$teacherName', 0] },
            scoreCount: 1,
            averageRating: { $round: ['$averageRating', 1] },
            purchasedCount: 1,
            chapter: {
              $cond: { if: { $isArray: '$chapters' }, then: { $size: '$chapters' }, else: 0 }
            },
            course: {
              $sum: {
                $map: {
                  input: '$chapters',
                  as: 'chapter',
                  in: { $size: '$$chapter.lessons' }
                }
              }
            },
            createdAt: 1
          }
        }
      ])
      const streamCourse = await models.LiveCourse.aggregate([
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
          $addFields: {
            startTimeDate: { $toDate: '$startTime' }
          }
        },
        {
          $match: {
            startTimeDate: { $gte: new Date() }
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
            teacherName: { $first: '$teacher.username' },
            startTime: { $first: '$startTime' },
            endTime: { $first: '$endTime' },
            averageRating: { $avg: '$reviews.rating' },
            purchasedCount: { $first: '$purchasedCount' }
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
            teacherName: { $arrayElemAt: ['$teacherName', 0] },
            startTime: {
              $concat: [
                { $dateToString: { date: { $toDate: '$startTime' }, format: '%m月%d號' } },
                '（',
                {
                  $switch: {
                    branches: [
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 1] }, then: '日' },
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 2] }, then: '一' },
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 3] }, then: '二' },
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 4] }, then: '三' },
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 5] }, then: '四' },
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 6] }, then: '五' },
                      { case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 7] }, then: '六' }
                    ],
                    default: ''
                  }
                },
                '）',
                { $dateToString: { date: { $toDate: '$startTime' }, format: '%H:%M' } }
              ]
            },
            endTime: 1,
            averageRating: { $round: ['$averageRating', 1] },
            purchasedCount: 1
          }
        },
        {
          $sort: {
            startTime: 1
          }
        },
        {
          $limit: 3
        }
      ])
      const newCourses = courseData.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)
      const popularCourses = courseData
        .sort((a, b) => b.purchasedCount - a.purchasedCount)
        .slice(0, 4)
      const praiseCourses = courseData.sort((a, b) => b.averageRating - a.averageRating).slice(0, 4)
      return {
        success: true,
        statusCode: 200,
        newCourses,
        streamCourse,
        popularCourses,
        praiseCourses
      }
    } else {
      const schema = Joi.object({
        q: Joi.string().allow('').required(),
        category: Joi.string().valid('normal', 'stream').default('normal'),
        sortBy: Joi.string().valid('popular', 'praise', 'time').default('popular')
      })
      const pathParameters = getQuery(event)
      const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
      if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))

      const { q: keyword, category, sortBy } = value
      let sortOption = ''
      if (sortBy === 'popular') {
        sortOption = 'purchasedCount'
      } else if (sortBy === 'praise') {
        sortOption = 'averageRating'
      } else if (sortBy === 'time') {
        sortOption = category === 'normal' ? 'createdAt' : 'startTime'
      }

      let searchCourses = []
      // TODO: 用 API 新增的課程沒有 reviews 內容，會抓不出資料
      if (category === 'normal') {
        searchCourses = await models.Course.aggregate([
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
              teacherName: { $first: '$teacher.username' },
              scoreCount: { $sum: 1 },
              averageRating: { $avg: '$reviews.rating' },
              purchasedCount: { $first: '$purchasedCount' },
              chapters: { $first: '$chapters' },
              createdAt: { $first: '$createdAt' }
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
              teacherName: { $arrayElemAt: ['$teacherName', 0] },
              scoreCount: 1,
              averageRating: { $round: ['$averageRating', 1] },
              purchasedCount: 1,
              chapter: {
                $cond: { if: { $isArray: '$chapters' }, then: { $size: '$chapters' }, else: 0 }
              },
              course: {
                $sum: {
                  $map: {
                    input: '$chapters',
                    as: 'chapter',
                    in: { $size: '$$chapter.lessons' }
                  }
                }
              },
              createdAt: 1
            }
          },
          {
            $match: {
              $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { teacherName: { $regex: keyword, $options: 'i' } }
              ]
            }
          },
          {
            $sort: { [sortOption]: -1 }
          }
        ])
      } else if (category === 'stream') {
        searchCourses = await models.LiveCourse.aggregate([
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
              teacherName: { $first: '$teacher.username' },
              startTime: { $first: '$startTime' },
              endTime: { $first: '$endTime' },
              averageRating: { $avg: '$reviews.rating' },
              purchasedCount: { $first: '$purchasedCount' }
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
              teacherName: { $arrayElemAt: ['$teacherName', 0] },
              startTime: {
                $concat: [
                  { $dateToString: { date: { $toDate: '$startTime' }, format: '%m月%d號' } },
                  '（',
                  {
                    $switch: {
                      branches: [
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 1] },
                          then: '日'
                        },
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 2] },
                          then: '一'
                        },
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 3] },
                          then: '二'
                        },
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 4] },
                          then: '三'
                        },
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 5] },
                          then: '四'
                        },
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 6] },
                          then: '五'
                        },
                        {
                          case: { $eq: [{ $dayOfWeek: { $toDate: '$startTime' } }, 7] },
                          then: '六'
                        }
                      ],
                      default: ''
                    }
                  },
                  '）',
                  { $dateToString: { date: { $toDate: '$startTime' }, format: '%H:%M' } }
                ]
              },
              endTime: 1,
              averageRating: { $round: ['$averageRating', 1] },
              purchasedCount: 1
            }
          },
          {
            $match: {
              $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { teacherName: { $regex: keyword, $options: 'i' } }
              ]
            }
          },
          {
            $sort: { [sortOption]: -1 }
          }
        ])
      }
      return {
        success: true,
        statusCode: 200,
        searchCourses
      }
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
