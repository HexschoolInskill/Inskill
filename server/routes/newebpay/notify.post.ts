import { spgatewayNotify } from '../../services/newebpay'
import models from '../../model/schema'
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    // console.log(`body : `, body)
    // console.log(`check notify : `, await spgatewayNotify(body, true))
    const responseData = await spgatewayNotify(body, true)
    if (!responseData) {
      return {
        success: false,
        statusCode: 400,
        message: 'check notify error'
      }
    }

    // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
    const responsetOrderNo = responseData?.Result?.MerchantOrderNo
    // const responsetOrderNo = '1687861301345'
    const existingOrder = await models.Order.findOne({ orderNo: responsetOrderNo })
    if (!existingOrder) {
      return {
        success: false,
        statusCode: 400,
        message: 'check Order error'
      }
    }

    await models.User.findOneAndUpdate(
      { _id: existingOrder.userId },
      { $addToSet: { purchasedCourses: existingOrder.orderCourses } },
      { new: true }
    )

    await models.User.findOneAndUpdate(
      { _id: existingOrder.userId },
      { $set: { cartCourses: [] } },
      { new: true }
    )

    existingOrder.isConfirm = true
    await existingOrder.save()

    const { orderCourses } = existingOrder

    const courseIds = orderCourses
      .filter((course) => course.courseType === 'Course')
      .map((course) => course.courseId)
    if (courseIds.length > 0) {
      await models.Course.updateMany({ _id: { $in: courseIds } }, { $inc: { purchasedCount: 1 } })
    }

    const liveCourseIds = orderCourses
      .filter((course) => course.courseType === 'LiveCourse')
      .map((course) => course.courseId)
    if (liveCourseIds.length > 0) {
      await models.LiveCourse.updateMany(
        { _id: { $in: liveCourseIds } },
        { $inc: { purchasedCount: 1 } }
      )
    }

    return {
      success: true,
      statusCode: 200,
      message: `訂單 ${responsetOrderNo} 購買課程成功`
    }
  } catch (error: any) {
    console.log(`notify.post error : `, error)
    return {
      success: false,
      statusCode: 400,
      message: 'notify.post error'
    }
  }
})
