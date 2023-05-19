import {spgatewayNotify} from '../../services/newebpay'
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log(`body : `,body)
    console.log(`check notify : `, await spgatewayNotify(body, true))
    return {
      success: true,
      statusCode: 200,
    }
  } catch (error: any) {
    console.log(`notify.post error : `, error)
    return {
      success: true,
      statusCode: 400,
    }
  }
})