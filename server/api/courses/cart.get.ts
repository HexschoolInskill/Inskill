import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const cartCourses = await models.User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: userID }] } } },
      { $unwind: '$cartCourses' },
      { $match: { 'cartCourses.courseType': 'Course' } },
      {
        $lookup: {
          from: 'courses',
          localField: 'cartCourses.courseId',
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
          _id: '$cartCourses.courseType',
          courseType: { $first: '$cartCourses.courseType' },
          courses: {
            $push: {
              _id: '$cartCourses.courseId',
              title: '$course.title',
              description: '$course.description',
              price: '$course.price',
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
    const cartLiveCourses = await models.User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: userID }] } } },
      { $unwind: '$cartCourses' },
      { $match: { 'cartCourses.courseType': 'LiveCourse' } },
      {
        $lookup: {
          from: 'livecourses',
          localField: 'cartCourses.courseId',
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
          _id: '$cartCourses.courseType',
          courseType: { $first: '$cartCourses.courseType' },
          courses: {
            $push: {
              _id: '$cartCourses.courseId',
              title: '$course.title',
              description: '$course.description',
              price: '$course.price',
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
    const cart = cartCourses.concat(cartLiveCourses)
    return {
      success: true,
      cart
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
