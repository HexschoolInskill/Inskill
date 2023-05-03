// eslint-disable-next-line import/default
import jwt from 'jsonwebtoken'

export async function sign(payload: Object, secret: string, expiresIn: number) {
  try {
    const token = await jwt.sign(payload, secret, {
      expiresIn // expires in 24 hours
    })
    // console.log(`JWT signed : `, token)
    return token
  } catch (err) {
    console.log(`JWT signed error : `, err)
    return null
  }
}
export async function decoder(token: string, secret: string) {
  try {
    const decoded = await jwt.verify(token, secret)
    // console.log(`JWT decoded : `, decoded)
    return decoded
  } catch (err) {
    console.log(`JWT decoded error : `, err)
    return null
  }
}
