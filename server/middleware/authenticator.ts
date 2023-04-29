import {sign, decoder} from '../services/jwt'
interface JwtPayload {
    uid: string;
    exp : number;
}
export default defineEventHandler(async (event) => {
    const {JWT_SECRET}  = useRuntimeConfig()
    const request = event.req
    const {url, method} = request
    console.log(`Through authentication middleware : `, method, url)
    const accessToken = getRequestHeader(event, 'Authorization')
    // const accessToken = await sign({uid:"exampleUid"}, JWT_SECRET, 60*60*24*30)
    // console.log(accessToken)
    try {
        if(!accessToken) return {
            success: false,
            statusCode : 401,
            message: 'Unauthorized : must have Authorization header'
        }
        const {uid, exp} = await decoder(accessToken, JWT_SECRET) as JwtPayload
        if(Date.now() >= exp*1000) return {
            success: false,
            statusCode : 401,
            message: 'Unauthorized : token expired'
        }
        console.log({uid})
    } catch(err) {
        console.log(`Through authentication middleware error : `, err)
        return {
            success: false,
            statusCode : 400,
            message: JSON.stringify(err)
        }
    }
    

})