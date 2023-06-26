import Joi from 'joi'
import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  const schema = Joi.object({
    courseId: Joi.string().required()
  })
  try {
    const pathParameters = getRouterParams(event)
    const { error, value } = await schema.validate(pathParameters, { abortEarly: true })
    if (error) throw new Error(error.details.map((e: any) => e.message).join(', '))
    const { courseId } = value
    const liveCourse = await models.LiveCourse.aggregate([
      {
        $match: { $expr: { $eq: ['$_id', { $toObjectId: courseId }] } }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'teacherId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          teacherName: { $ifNull: [{ $first: '$user.username' }, 'anonymous'] },
          teacherAvatar: '$user.avatar'
        }
      },
      {
        $unwind: '$reviews'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'reviews.userId',
          foreignField: '_id',
          as: 'reviewsUser'
        }
      },
      {
        $addFields: {
          'reviews.username': { $ifNull: [{ $first: '$reviewsUser.username' }, 'anonymous'] }
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          price: { $first: '$price' },
          purchasedCount: { $first: '$purchasedCount' },
          thumbnail: { $first: '$thumbnail' },
          teacherId: { $first: '$teacherId' },
          teacherName: { $first: '$teacherName' },
          teacherAvatar: { $first: '$teacherAvatar' },
          videoUrl: { $first: '$videoUrl' },
          startTime: { $first: '$startTime' },
          endTime: { $first: '$endTime' },
          reviews: { $push: '$reviews' }
        }
      },
      {
        $project: {
          user: 0,
          reviewsUser: 0
        }
      }
    ])

    if (!liveCourse) {
      return createError({
        statusCode: 400,
        message: 'Course not found'
      })
    }
    return {
      success: true,
      liveCourse
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
