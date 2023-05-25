import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const user = await models.User.findById(userID)
    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: '取得 user 資料成功',
        user
      }
    } else {
      return createError({
        statusCode: 404,
        message: '取得 user 資料失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
