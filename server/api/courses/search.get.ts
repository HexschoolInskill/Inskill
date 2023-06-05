// import Joi from 'joi'
// import models, { Course, User } from '../../model/schema'

// export default defineEventHandler(async (event) => {
//   const schema = Joi.object({
//     q: Joi.string().required(),
//     type: Joi.string().valid('normal', 'stream').default('normal'),
//     sort: Joi.string().valid('time', 'people', 'score').default('time')
//   })
//   try {
//     const pathParameters = getQuery(event)
//     const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
//     if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
//     // get course from db
//     const { q: keyword, type, sort } = value
//     let courses = []
//     // return {
//     //   success: true,
//     //   courses: await models.Course.find({})
//     // }
//     if (type === 'normal') {
// courses = (await models.Course.find({
//   $or: [
//     { title: { $regex: keyword, $options: 'i' } },
//     { description: { $regex: keyword, $options: 'i' } }
//   ]
//       })) as Course[]
//     } else {
//       courses = (await models.LiveCourse.find({
//         $or: [
//           { title: { $regex: keyword, $options: 'i' } },
//           { description: { $regex: keyword, $options: 'i' } }
//         ]
//       })) as Course[]
//     }

//     // get teacher from db
//     await Promise.all(
//       courses.map(async (course: Course) => {
//         const teacher = (await models.User.findById(course.teacherId)) as User // 添加類型斷言為 User
//         course.teacher = teacher?.username || course.teacherId // TODO : 目前課程資料老師不在user 我先這樣寫 後面再改
//       })
//     )
//     switch (sort) {
//       case 'time':
//         courses.sort((a: Course, b: Course) => {
//           return b.createdAt.getTime() - a.createdAt.getTime()
//         })
//         break
//       case 'people':
//         courses.sort((a: Course, b: Course) => {
//           return b.students.length - a.students.length
//         })
//         break
//       case 'score':
//         courses.sort((a: Course, b: Course) => {
//           return b.score - a.score
//         })
//         break
//     }
//     return {
//       success: true,
//       courses
//     }
//   } catch (error: any) {
//     return createError({
//       statusCode: error.statusCode ? error.statusCode : 400,
//       message: error.message
//     })
//   }
// })

// import Joi from 'joi'
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
      // const schema = Joi.object({
      //   q: Joi.string().required(),
      //   type: Joi.string().valid('normal', 'stream').default('normal'),
      //   sort: Joi.string().valid('popular', 'praise', 'time').default('popular')
      // })
      let serachCourses = []
      const { q: keyword, sortBy, category } = getQuery(event)
      let sortOption = ''

      if (sortBy === 'popular') {
        sortOption = 'purchasedCount'
      } else if (sortBy === 'praise') {
        sortOption = 'averageRating'
      } else if (sortBy === 'time') {
        sortOption = 'createdAt'
      }
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
              teacherName: { $first: '$teacher.username' },
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
              averageRating: { $round: ['$averageRating', 1] },
              purchasedCount: 1,
              createdAt: 1,
              chapter: {
                $cond: { if: { $isArray: '$chapters' }, then: { $size: '$chapters' }, else: 0 }
              }
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
              startTime: 1,
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
