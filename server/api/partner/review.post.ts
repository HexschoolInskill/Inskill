import models from '../../model/schema'

export default defineEventHandler(async (event) => {
  try {
    const userID = event.context.auth.userID
    const user = await models.User.findOneAndUpdate(
      { _id: userID },
      { $set: { isTeacher: true } },
      { new: true }
    )
    if (user) {
      return {
        success: true,
        statusCode: 200,
        message: `user ${user.username} 審核成功`,
        user
      }
    } else {
      return createError({
        statusCode: 404,
        message: '找不到該 user，審核失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
