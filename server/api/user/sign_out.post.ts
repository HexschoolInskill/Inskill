export default defineEventHandler((event) => {
  deleteCookie(event, 'access_token', {
    maxAge: 0,
    httpOnly: true,
    sameSite: 'strict'
  })
  return {
    success: true,
    statusCode: 200,
    message: '登出成功'
  }
})
