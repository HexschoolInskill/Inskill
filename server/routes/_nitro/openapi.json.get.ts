import * as openApiSpec from './openapi.json'

export default defineEventHandler(() => {
  try {
    return {
      ...openApiSpec
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
