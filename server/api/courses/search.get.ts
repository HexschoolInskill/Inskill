/* eslint-disable */
// import Joi from 'joi'
// import models, { Course, User, LiveStream } from '../../model/schema'

// export default defineEventHandler(async (event) => {
//   const schema = Joi.object({
//     q: Joi.string().required(),
//     type : Joi.string().valid('normal', 'stream').default('normal'),
//     sort : Joi.string().valid('time', 'people', 'score').default('time')
//   })
//   try {
//     const pathParameters = getQuery(event)
//     const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
//     if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
//     // get course from db
//     const { q : keyword, type, sort } = value
//     let courses = []
//     return {
//         success: true,
//         courses : await models.Course.find({})
//     }
//     if(type === 'normal') {
//       courses = await models.Course.find({
//           $or: [
//               { title: { $regex: keyword, $options: 'i' } },
//               { description: { $regex: keyword, $options: 'i' } }
//           ]
//       }) as Course[]
//     } else {
//       courses = await models.LiveStream.find({
//           $or: [
//               { title: { $regex: keyword, $options: 'i' } },
//               { description: { $regex: keyword, $options: 'i' } }
//           ]
//       }) as Course[]
//     }

//     // get teacher from db
//     await Promise.all(
//         courses.map(async (course: Course) => {

//             const teacher = await models.User.findById(course.teacherId) as User // 添加類型斷言為 User
//             course.teacher = teacher?.username || course.teacherId // TODO : 目前課程資料老師不在user 我先這樣寫 後面再改
//         })
//     )
//     switch(sort) {
//         case 'time':
//             courses.sort((a: Course, b: Course) => {
//                 return b.createdAt.getTime() - a.createdAt.getTime()
//             })
//             break
//         case 'people':
//             courses.sort((a: Course, b: Course) => { 
//                 return b.students.length - a.students.length
//             })
//             break
//         case 'score':
//             courses.sort((a: Course, b: Course) => {
//                 return b.score - a.score
//             })
//             break
//     }
//     return {
//         success: true,
//         courses 
//     }
    
//   } catch (error: any) {
//     return createError({
//       statusCode: error.statusCode ? error.statusCode : 400,
//       message: error.message
//     })
//   }
// })