import Joi from 'joi'
import models, { Course, User } from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    q: Joi.string().required(),
    type: Joi.string().valid('normal', 'stream').default('normal'),
    sort: Joi.string().valid('time', 'people', 'score').default('time')
  })
  try {
    const pathParameters = getQuery(event)
    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    // get course from db
    const { q: keyword, type, sort } = value
    let courses = []
    // return {
    //   success: true,
    //   courses: await models.Course.find({})
    // }
    if (type === 'normal') {
      courses = (await models.Course.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      })) as Course[]
    } else {
      courses = (await models.LiveCourse.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      })) as Course[]
    }

    // get teacher from db
    await Promise.all(
      courses.map(async (course: Course) => {
        const teacher = (await models.User.findById(course.teacherId)) as User // 添加類型斷言為 User
        course.teacher = teacher?.username || course.teacherId // TODO : 目前課程資料老師不在user 我先這樣寫 後面再改
      })
    )
    switch (sort) {
      case 'time':
        courses.sort((a: Course, b: Course) => {
          return b.createdAt.getTime() - a.createdAt.getTime()
        })
        break
      case 'people':
        courses.sort((a: Course, b: Course) => {
          return b.students.length - a.students.length
        })
        break
      case 'score':
        courses.sort((a: Course, b: Course) => {
          return b.score - a.score
        })
        break
    }
    return {
      success: true,
      courses
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})

// import models from '../../model/schema'
// export default defineEventHandler(async (event) => {
//   try {
//     const queryResult = getQuery(event)
//     if (Object.keys(queryResult).length === 0) {
//       // 若沒有帶 query，則各別回傳影音與直播課程資料 for 首頁
//       const courses = await models.Course.find({})
//       const liveCourses = await models.LiveCourse.find({})
//       return {
//         success: true,
//         statusCode: 200,
//         courses,
//         liveCourses
//       }
//     } else {
//       let serachCourses = []
//       const { q, sortBy, category } = getQuery(event)
//       const sortOption: { [key: string]: number } = {}

//       if (sortBy === 'popular') {
//         sortOption.averageRating = -1
//       } else if (sortBy === 'praise') {
//         sortOption.purchasedCount = -1
//       } else if (sortBy === 'time') {
//         sortOption.createdAt = -1
//       }
//       console.log(q, sortBy, category)
//       if (category === 'normal') {
//         serachCourses = await models.Course.aggregate([
//           { $unwind: '$reviews' },
//           {
//             $lookup: {
//               from: 'users',
//               localField: 'teacherId',
//               foreignField: '_id',
//               as: 'teacher'
//             }
//           },
//           {
//             $group: {
//               _id: '$_id',
//               title: { $first: '$title' },
//               description: { $first: '$description' },
//               price: { $first: '$price' },
//               thumbnail: { $first: '$thumbnail' },
//               teacherId: { $first: '$teacherId' },
//               teacherUsername: { $first: '$teacher.username' },
//               averageRating: { $avg: '$reviews.rating' },
//               purchasedCount: { $sum: '$purchasedCount' }
//             }
//           },
//           {
//             $project: {
//               _id: 1,
//               title: 1,
//               description: 1,
//               price: 1,
//               thumbnail: 1,
//               teacherId: 1,
//               teacherName: { $arrayElemAt: ['$teacherUsername', 0] },
//               averageRating: { $round: ['$averageRating', 1] },
//               purchasedCount: 1
//             }
//           }
//           // {
//           //   $sort: sortOption,
//           // },
//         ])
//       } else if (category === 'stream') {
//         serachCourses = await models.LiveCourse.aggregate([
//           { $unwind: '$reviews' },
//           {
//             $lookup: {
//               from: 'users',
//               localField: 'teacherId',
//               foreignField: '_id',
//               as: 'teacher'
//             }
//           },
//           {
//             $group: {
//               _id: '$_id',
//               title: { $first: '$title' },
//               description: { $first: '$description' },
//               price: { $first: '$price' },
//               thumbnail: { $first: '$thumbnail' },
//               teacherId: { $first: '$teacherId' },
//               teacherUsername: { $first: '$teacher.username' },
//               averageRating: { $avg: '$reviews.rating' },
//               purchasedCount: { $sum: '$purchasedCount' }
//             }
//           },
//           {
//             $project: {
//               _id: 1,
//               title: 1,
//               description: 1,
//               price: 1,
//               thumbnail: 1,
//               teacherId: 1,
//               teacherName: { $arrayElemAt: ['$teacherUsername', 0] },
//               averageRating: { $round: ['$averageRating', 1] },
//               purchasedCount: 1
//             }
//           }
//           // {
//           //   $sort: sortOption,
//           // },
//         ])
//       }
//       return {
//         success: true,
//         statusCode: 200,
//         serachCourses
//       }
//     }
//   } catch (error: any) {
//     return createError({
//       statusCode: error.statusCode ? error.statusCode : 400,
//       message: error.message
//     })
//   }
// })
