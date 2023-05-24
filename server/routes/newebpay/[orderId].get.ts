import { createPayment } from '../../services/newebpay'
export default defineEventHandler(async (event) => {
  try {
    const { orderId } = getRouterParams(event)
    console.log(`gotopay orderId : `, orderId)
    // TODO : 更改 下列參數 來自資料庫order
    const data = await createPayment(
      {
        id: orderId,
        total: 199,
        description: 'test',
        email: 'hexschoolinskill@gmail.com'
      },
      true
    )
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
