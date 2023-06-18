import { createPayment } from '../../services/newebpay'
export default defineEventHandler(async (event) => {
  try {
    const { orderId } = getRouterParams(event)
    const { total } = getQuery(event)
    console.log(`gotopay orderId : `, orderId)
    console.log(`gotopay total : `, total)
    // TODO : 更改 下列參數 來自資料庫order
    const data = await createPayment(
      {
        id: orderId,
        total,
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
