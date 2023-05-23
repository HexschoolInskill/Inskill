import models from '../../model/schema'

export default defineEventHandler(async () => {
  try {
    const courses = await models.Course.find({})
    // const courses = await models.Course.aggregate([
    //   { $unwind: '$reviews' }, // 展開 reviews array
    //   {
    //     $group: {
    //       _id: '$_id',
    //       title: { $first: '$title' },
    //       description: { $first: '$description' },
    //       price: { $first: '$price' },
    //       thumbnail: { $first: '$thumbnail' },
    //       teacherId: { $first: '$teacherId' },
    //       averageRating: { $avg: '$reviews.rating' } // 計算平均評價分數
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       title: 1,
    //       description: 1,
    //       price: 1,
    //       thumbnail: 1,
    //       teacherId: 1,
    //       averageRating: 1 // 將 averageRating 上提一層
    //     }
    //   }
    // ])

    const liveCourses = await models.LiveCourse.find({})
    // const { sort, type } = getQuery(event)
    // if (sort === 'time') {
    //   courses.sort((a, b) => b.createdAt - a.createdAt);
    // } else if (sort === 'people') {
    //   courses.sort((a, b) => b.enrollments.length - a.enrollments.length);
    // } else if (sort === 'score') {
    //   courses.sort((a, b) => b.rating - a.rating);
    // }
    return {
      success: true,
      statusCode: 200,
      courses,
      liveCourses
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
