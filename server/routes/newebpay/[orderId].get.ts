import { createPayment } from '../../services/newebpay'
import models from '../../model/schema'
export default defineEventHandler(async (event) => {
  try {
    const { orderId } = getRouterParams(event)
    const { total } = getQuery(event)
    const { userInfo } = event.context.auth
    // console.log(`gotopay orderId : `, orderId)
    // console.log(`gotopay total : `, total)
    const data = await createPayment(
      {
        id: orderId,
        total,
        description: `感謝 ${userInfo.username} 您的購買！`,
        email: userInfo.email
      },
      true
    )
    const cartCourses = JSON.parse(JSON.stringify(userInfo.cartCourses))
    cartCourses.forEach((course: { _id: any }) => {
      delete course._id
    })
    // 寫入 user 當下購物車資料至訂單內
    await models.Order.create({
      userId: userInfo._id,
      orderNo: orderId,
      orderCourses: cartCourses,
      price: total
    })
    return {
      success: true,
      statusCode: 200,
      data
    }
  } catch (error: any) {
    console.log(`notify.post error : `, error)
    return {
      success: true,
      statusCode: 400
    }
  }
})
