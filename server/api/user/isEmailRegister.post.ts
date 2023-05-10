import Joi from 'joi'
import models from '../../model/schema'
import mailService from '../../services/mailService'
import { sign } from '../../services/jwt'

export default defineEventHandler(async (event) => {
  const isEmailSchema = Joi.object({
    email: Joi.string().email().required()
  }).required()
  const body = await readBody(event)
  try {
    const { error, value } = isEmailSchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const existingUser = await models.User.findOne({ email: value.email })
    if (existingUser) {
      const { JWT_SECRET } = useRuntimeConfig()
      const accessToken = await sign({ uid: existingUser._id }, JWT_SECRET, 600)
      const location =
        process.env.NODE_ENV === 'development'
          ? `http://localhost:3000/`
          : `https://inskill.demoto.me/`
      const mailContent = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;margin:0;padding:0;width:100%">
  <tbody>
    <tr>
      <td width="100%" cellpadding="0" cellspacing="0" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; background-color: rgb(255, 255, 255); border-bottom: 1px solid rgb(237, 239, 242); border-top: 1px solid rgb(237, 239, 242); margin: 0px; padding: 0px; width: 100%; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-bottom:#34393b; --darkreader-inline-border-top:#34393b;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-top="">
        <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; background-color: rgb(255, 255, 255); margin: 0px auto; padding: 0px; width: 570px; --darkreader-inline-bgcolor:#181a1b;" data-darkreader-inline-bgcolor="">
          <tbody>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;padding:35px">
                <h1 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 19px; font-weight: bold; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">Hello!</h1>
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 16px; line-height: 1.5em; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">您收到此電子郵件是因為我們收到了您帳戶的密碼重設要求</p>
                <table align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;margin:30px auto;padding:0;text-align:center;width:100%">
                  <tbody>
                    <tr>
                      <td align="left" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
                          <tbody>
                            <tr>
                              <td align="left" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
                                        <a href="${location}resetPassword?token=${accessToken}" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; border-radius: 3px; color: black; display: inline-block; text-decoration: none; background-color: rgb(105, 240, 174); border-width: 10px 18px; border-style: solid; border-color: rgb(105, 240, 174); --darkreader-inline-color:#d3cfc9; --darkreader-inline-bgcolor:#0e885b; --darkreader-inline-border-top:#0e8a4d; --darkreader-inline-border-right:#0e8a4d; --darkreader-inline-border-bottom:#0e8a4d; --darkreader-inline-border-left:#0e8a4d;" target="_blank" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="">重設密碼</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 16px; line-height: 1.5em; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">如果您沒有請求重設密碼，則無需進一步操作</p>
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 16px; line-height: 1.5em; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">Regards,<br>InSkill © All Rights Reserved.</p>

                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; border-top: 1px solid rgb(237, 239, 242); margin-top: 25px; padding-top: 25px; --darkreader-inline-border-top:#34393b;" data-darkreader-inline-border-top="">
                  <tbody>
                    <tr>
                      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
                        <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); line-height: 1.5em; margin-top: 0px; text-align: left; font-size: 12px; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">If you’re having trouble clicking the "重設密碼" button, copy and paste the URL below
                          into your web browser: 
                          <a href="${location}resetPassword?token=${accessToken}" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(56, 105, 212); --darkreader-inline-color:#4a8ed8;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${location}resetPassword?token=${accessToken}" data-darkreader-inline-color="">
                            ${location}resetPassword?token=${accessToken}
                          </a>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box">
        <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;margin:0 auto;padding:0;text-align:center;width:570px">
          <tbody>
            <tr>
              <td align="center" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;padding:35px">
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; line-height: 1.5em; margin-top: 0px; color: rgb(174, 174, 174); font-size: 12px; text-align: center; --darkreader-inline-color:#b5aea5;" data-darkreader-inline-color="">© 2023 InSkill © All Rights Reserved.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
`
      await mailService({
        title: 'Inskill 系統信箱',
        subject: 'Inskill: 重設密碼',
        text: '',
        html: mailContent,
        to: existingUser.email
      })
      return {
        success: true,
        statusCode: 200,
        message: '該 email 已註冊'
      }
    } else {
      return {
        success: false,
        statusCode: 404,
        message: '該 email 未註冊'
      }
    }
  } catch (error: any) {
    return {
      success: false,
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    }
  }
})
