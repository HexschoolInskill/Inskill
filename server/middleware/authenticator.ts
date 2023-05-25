import { decoder } from '../services/jwt'
interface JwtPayload {
  uid: string
  exp: number
}
export default defineEventHandler(async (event) => {
  const { JWT_SECRET } = useRuntimeConfig()
  const request = event.node.req
  const { url, method } = request
  console.log(`Through authentication middleware : `, method, url)

  const accessToken = getCookie(event, 'access_token')

  const unProtectedRoutes = [/^\/api.*(?:\/(sign_up|sign_in|isEmailRegister|search))$/gi]

  if (url!.startsWith('/api') && !unProtectedRoutes.some((pattern) => url!.match(pattern))) {
    try {
      if (!accessToken) {
        return createError({
          statusCode: 401,
          message: 'Unauthorized : must have Authorization'
        })
      }

      const { uid, exp } = (await decoder(accessToken, JWT_SECRET)) as JwtPayload
      if (Date.now() >= exp * 1000)
        return createError({
          statusCode: 401,
          message: 'Unauthorized : token expired'
        })
      event.context.auth = { userID: uid }
    } catch (err) {
      console.log(`Through authentication middleware error : `, err)
      return createError({
        statusCode: 401,
        message: 'Unauthorized : token invalid'
      })
    }
  }
})
