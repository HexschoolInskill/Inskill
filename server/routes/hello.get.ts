/**
 * Usage of h3 server
   
    getRouterParams(event)
    getQuery(event)
    readBody(event)
    getHeaders(event) -> event.req.headers all
    getRequestHeader(event, key) -> event.req.headers[key]
 */

import Joi from 'joi'
import {createPayment} from '../services/newebpay'
export default defineEventHandler(async (event) => {
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
    const response = await createPayment({
      id: '1234',
      total: 199,
      description: 'test',
      email: "senxsen@gmail.com",
    }, true)
    
    return {
      success: true,
      statusCode: 200,
      message: '測試 [GET] /hello with Joi',
      // value,
      response
    }
  } catch (error: any) {
    console.log(`[hello.get] error : `, error)
    return {
      success: false,
      statusCode: 400,
      message: error.message
    }
  }
})
