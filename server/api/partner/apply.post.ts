import Joi from 'joi'
import models from '../../model/schema'
import mailService from '../../services/mailService'

export default defineEventHandler(async (event) => {
  const applySchema = Joi.object({
    realName: Joi.string().required(),
    username: Joi.string().required(),
    gender: Joi.string().required(),
    unit: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    postNumber: Joi.number().required().min(100).max(999),
    address: Joi.string().required(),
    facebookLink: Joi.string().allow('').uri(),
    youtubeLink: Joi.string().allow('').uri(),
    socialLink: Joi.string().allow('').uri(),
    githubLink: Joi.string().allow('').uri(),
    selfMedia: Joi.string().allow('').uri(),
    description: Joi.string().required(),
    longDescription: Joi.string().required()
  })
  const body = await readBody(event)
  try {
    const { error, value } = applySchema.validate(body, { abortEarly: true })
    if (error)
      throw new Error(
        error.details
          .map((e) => {
            return e.message
          })
          .join(', ')
      )

    const userID = event.context.auth.userID
    const user = await models.User.findOneAndUpdate(
      { _id: userID },
      { $set: { apply: value, isTeacher: true } },
      { new: true }
    )
    if (user) {
      const mailContent = `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;margin:0;padding:0;width:100%">
  <tbody>
    <tr>
      <td width="100%" cellpadding="0" cellspacing="0" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; background-color: rgb(255, 255, 255); border-bottom: 1px solid rgb(237, 239, 242); border-top: 1px solid rgb(237, 239, 242); margin: 0px; padding: 0px; width: 100%; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-bottom:#34393b; --darkreader-inline-border-top:#34393b;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-top="">
        <table align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; background-color: rgb(255, 255, 255); margin: 0px auto; padding: 0px; width: 570px; --darkreader-inline-bgcolor:#181a1b;" data-darkreader-inline-bgcolor="">
          <tbody>
            <tr>
              <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';box-sizing:border-box;padding:35px">
                <h1 style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 19px; font-weight: bold; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">親愛的 ${user.username}</h1>
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 16px; line-height: 1.5em; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">我們很高興地通知您，您的審核老師申請已經成功通過。</p>
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 16px; line-height: 1.5em; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">恭喜您成為 InSkill 的一員！您的專業知識和經驗將對學生的學習旅程產生深遠的影響。</p>
                <p style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; box-sizing: border-box; color: rgb(61, 72, 82); font-size: 16px; line-height: 1.5em; margin-top: 0px; text-align: left; --darkreader-inline-color:#bbb5ac;" data-darkreader-inline-color="">Regards,<br>InSkill © All Rights Reserved.</p>
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
        subject: 'Inskill: 恭喜您！審核夥伴申請成功！',
        text: '',
        html: mailContent,
        to: user.email
      })
      return {
        success: true,
        statusCode: 200,
        message: '已送出審核資料',
        user
      }
    } else {
      return createError({
        statusCode: 404,
        message: '送出審核資料失敗'
      })
    }
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode ? error.statusCode : 400,
      message: error.message
    })
  }
})
