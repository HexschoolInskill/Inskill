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
    // get course from db
    const { courseId } = value
    const course = await models.Course.aggregate([
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
          teacherName: { $ifNull: [{ $first: '$user.username' }, 'anonymous'] }
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
        $lookup: {
          from: 'users',
          localField: 'chapters.lessons.question.userId',
          foreignField: '_id',
          as: 'questionUser'
        }
      },
      {
        $addFields: {
          'chapters.lessons.question.username': {
            $ifNull: [{ $first: '$questionUser.username' }, 'anonymous']
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'chapters.lessons.question.replies.userId',
          foreignField: '_id',
          as: 'replyUser'
        }
      },
      {
        $addFields: {
          'chapters.lessons.question.replies.username': {
            $ifNull: [{ $first: '$replyUser.username' }, 'anonymous']
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          price: { $first: '$price' },
          isPublic: { $first: '$isPublic' },
          purchasedCount: { $first: '$purchasedCount' },
          thumbnail: { $first: '$thumbnail' },
          teacherId: { $first: '$teacherId' },
          teacherName: { $first: '$teacherName' },
          chapters: { $first: '$chapters' },
          reviews: { $push: '$reviews' }
        }
      },
      {
        $project: {
          user: 0,
          reviewsUser: 0,
          questionUser: 0,
          replyUser: 0
        }
      }
    ])
    return {
      success: true,
      course
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
