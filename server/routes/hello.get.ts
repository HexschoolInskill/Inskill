/**
 * Usage of h3 server
   
    getRouterParams(event)
    getQuery(event)
    readBody(event)
    getHeaders(event) -> event.req.headers all
    getRequestHeader(event, key) -> event.req.headers[key]
 */

// import Joi from 'joi'
// import {getWebRTCAppList, updateWebRTCAppEndPointList} from '../services/mediaServer'
import { createLive } from '../services/youtubeApi'
// import { createLive, startLive, endLive } from '../services/youtubeApi'
export default defineEventHandler(async (_) => {
  // const parametersSchema = Joi.object({
  //   symbol: Joi.string(),
  //   limit: Joi.number().max(1000).default(500)
  // })
  // const query = getQuery(event)
  try {
    // const { error, value } = parametersSchema.validate(query, { abortEarly: true })
    // if (error)
    //   throw new Error(
    //     error.details
    //       .map((e) => {
    //         return e.message
    //       })
    //       .join(', ')
    //   )
    // const response = await $fetch(`/exchangeInfo`, {
    //   method: 'GET',
    //   baseURL: `https://fapi.binance.com/fapi/v1`
    // })
    // return {
    //   success: true,
    //   statusCode: 200,
    //   message: '測試 [GET] /hello with Joi',
    //   value,
    //   response
    // }
    // const response = await updateWebRTCAppEndPointList("9K6nIH339mtV168412138054", "rtmp://a.rtmp.youtube.com/live2/zbkg-3m3y-wvx6-p3kw-f6fv-test")
    const response = await createLive()
    // const response = await startLive("7y0MA5WSVyg")
    // const response = await endLive("7y0MA5WSVyg")
    return {
      success: true,
      statusCode: 200,
      data: response
    }
  } catch (error: any) {
    return {
      success: false,
      statusCode: 400,
      message: error.message
    }
  }
})
