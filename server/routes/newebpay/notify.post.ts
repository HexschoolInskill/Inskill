import { spgatewayNotify } from '../../services/newebpay'
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

    // TODO: 取得交易內容，並查詢本地端資料庫是否有相符的訂單
    // if (!orders[data?.Result?.MerchantOrderNo]) {
    //   console.log('找不到訂單');
    //   return {
    //     success : false,
    //   }
    // }

    // TODO: 交易完成，將訂單內容新增至 user.purchasedCourse、課程人數+1、訂單 isConfirm = true

    return {
      success: true,
      statusCode: 200,
      responseData
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
